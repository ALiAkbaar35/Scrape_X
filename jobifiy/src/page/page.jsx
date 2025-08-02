import { use, useState, useEffect } from 'react';
import './page.css';
import logo from '../assets/logo.png';
import details from '../assets/job-description.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Input } from 'antd';
import { useMyContext } from '../context/context';
import { message } from 'antd';

function App() {
  const [search, setSearch] = useState("");
  const { jobs, deleteJob, addJob, fetchsearchJobs, updateJob } = useMyContext();
  const [filterQuery, setFilterQuery] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [filterType, setFilterTypes] = useState("");
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    url: "",
    salary: "",
    created_at: ""
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      company: "",
      location: "",
      url: "",
      salary: "",
      created_at: ""
    });
  };

  const handleOk = async () => {
    const status = await addJob(form);
    if (status === 200) {
      resetForm();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditModal = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.url,
      salary: job.salary,
      created_at: job.created_at
    });
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingJob(null);
    resetForm();
  };

  const handleEditOk = async () => {
    if (editingJob) {
      const status = await updateJob(editingJob.id, form);
      if (status === 200) {
        resetForm();
        setEditingJob(null);
      }
    }
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
  };

  const handlesearch = async () => {
    if (search === "") {
      message.error("Please enter a search query.");
      return;
    }
    else {
      await fetchsearchJobs(search);
    }

  };

  useEffect(() => {
    if (filterType === "All" || filterQuery.trim() === "") {
      setFilterData([]);
    } else if (filterType === "location") {
      setFilterData(
        jobs.filter((job) =>
          job.location.toLowerCase().includes(filterQuery.toLowerCase())
        )
      );
    } else if (filterType === "title") {
      setFilterData(
        jobs.filter((job) =>
          job.title.toLowerCase().includes(filterQuery.toLowerCase())
        )
      );
    } else if (filterType === "company") {
      setFilterData(
        jobs.filter((job) =>
          job.company.toLowerCase().includes(filterQuery.toLowerCase())
        )
      );
    }
  }, [filterQuery, filterType, jobs]);

  const displayedJobs =
    filterData.length > 0 || filterQuery.trim() !== "" ? filterData : jobs;

  return (
    <div>
      <div className="body-wrapper">
        <div className="header">
          <div className="left">
            <div className="icon">
              <img src={logo} alt="Jobify Logo" className="logo-img" />
            </div>
            <div className="title-container">
              <div className="title">Jobify</div>
              <div className="slogan">Find Your Dream Job</div>
            </div>
          </div>
          <div className="right">
            <div className="post" onClick={showModal}>
              Post Job
            </div>
          </div>
        </div>
        <div className="body">
          <div className="card">
            <div className="heading">
              <div className="main-heading">Find your Handpicked Jobify Jobs</div>
              <div className="main-heading">That Match Your Expertise</div>
            </div>
            <div className="subheading">
              With 300+ open roles and 50 new jobs posted weekly, your dream job is just a click away.
            </div>
            <div className="search">
              <input
                type="text"
                name="search"
                value={search}
                placeholder="Search By Title"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-btn" onClick={handlesearch}>Search</button>
            </div>
          </div>
          <div className="containers">
            <div className="left">
              {/* <select
                className="filterType"
                onChange={(e) => setFilterTypes(e.target.value)}
              >
                <option value="All">All</option>
                <option value="title">Title</option>
                <option value="company">Company</option>
                <option value="location">location</option>
              </select>
              <input
                type="text"
                placeholder="Enter Value"
                className="filterValue"
                onChange={(e) => setFilterQuery(e.target.value)}
              /> */}
              {/* <button className="filter-btn" onClick={handleFilterClick}>Filter</button> */}
            </div>
            <div className="mid">
              <div className="fi  ">
                <select
                  className="filterType"
                  onChange={(e) => setFilterTypes(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="title">Title</option>
                  <option value="company">Company</option>
                  <option value="location">location</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="filterValue"
                  onChange={(e) => setFilterQuery(e.target.value)}
                />

              </div>
              <div className="right">

                {displayedJobs?.map((job) => (
                  <div className="detailCard" key={job.id}>
                    <div className="img">
                      <img src={details} alt="Job Details" className="detail-img" />
                    </div>
                    <div className="content">
                      <div className="title">{job?.title}</div>
                      <div className="company">{job?.company}</div>
                      <div className="country">
                        {job?.salary && <span className="name">{job.salary}</span>}
                        {job?.location?.split(", ").map((loc, index) => (
                          <span key={index} className="name">{loc}</span>
                        ))}
                      </div>
                    </div>
                    <div className="actions">
                      <div className="date">
                        {new Date(job?.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </div>
                      <div className="boxi">
                        <button className="edit" onClick={() => handleEditModal(job)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="del" onClick={() => handleDelete(job.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <a
                          href={job?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkbtn"
                        >
                          <FontAwesomeIcon icon={faLink} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal title="Post a Job" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
          placeholder="Title"
          name="title"
          value={form.title}
          type="text"
          onChange={handleChange}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Company Name"
          name="company"
          value={form.company}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Date"
          name="created_at"
          value={form.created_at}
          onChange={handleChange}
          type="date"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Job URL"
          name="url"
          type="text"
          value={form.url}
          onChange={handleChange}
        />
      </Modal>
      <Modal title="Edit Job" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
        <Input
          placeholder="Title"
          name="title"
          value={form.title}
          type="text"
          onChange={handleChange}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Company Name"
          name="company"
          value={form.company}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Date"
          name="created_at"
          value={form.created_at}
          onChange={handleChange}
          type="date"
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Job URL"
          name="url"
          type="text"
          value={form.url}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
}

export default App;
