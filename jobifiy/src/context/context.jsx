import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const url = "http://localhost:5000/jobs/";

    const fetchJobs = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                message.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobs(data);
            message.success("Data fetched Successfully");
            return data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return null;
        }
    };

    const deleteJob = async (id) => {
        try {
            const response = await fetch(`${url}${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete job with id ${id}`);
            }
            setJobs(jobs.filter(job => job.id !== id));
            message.success("Job deleted successfully");
            return response.status;
        } catch (error) {
            console.error("Error deleting job:", error);
            message.error("Failed to delete job");
            return null;
        }
    };

    const addJob = async (jobData) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData),
            });
            if (!response.ok) {
                throw new Error("Failed to add job");
            }
            fetchJobs();
            message.success("Job added successfully");
            return response.status;
        } catch (error) {
            console.error("Error adding job:", error);
            message.error("Failed to add job");
            return null;
        }
    };

    const fetchsearchJobs = async (search) => {
        try {
            const response = await fetch(`${url}title/${search}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("data", data);
            setJobs(data);
            message.success("Data fetched successfully");
            return data;
        } catch (error) {
            message.error(`Failed to fetch data: ${error.message}`);
            console.error('Failed to fetch data:', error);
            return jobs;
        }
    };

    const updateJob = async (id, jobData) => {
        try {
            const response = await fetch(`${url}${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData),
            });
            if (!response.ok) {
                throw new Error("Failed to update job");
            }
            fetchJobs();
            message.success("Job updated successfully");
            return response.status;
        } catch (error) {
            console.error("Error updating job:", error);
            message.error("Failed to update job");
            return null;
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const contextData = {
        jobs,
        fetchJobs,
        deleteJob,
        addJob,
        fetchsearchJobs,
        updateJob
    };

    return (
        <MyContext.Provider value={contextData}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook to use MyContext
export const useMyContext = () => useContext(MyContext);

export { MyContextProvider, MyContext };
