# Jobify - Job Scraping and Management System

A comprehensive job scraping and management system built with React frontend, Flask backend API, and automated job scraping functionality.

## 🚀 Project Overview

Jobify is a full-stack application that automatically scrapes job listings from Indeed Pakistan and provides a modern web interface for job management. The system consists of three main components:

- **Frontend**: React-based web application with modern UI
- **Backend**: Flask API server with PostgreSQL database
- **Scraper**: Automated job scraping system that runs every 10 minutes

## 🎯 Live Demo

Experience Jobify in action! Check out our live demo to see the job scraping and management system in real-time.

**🌐 Demo Link**: [Jobify Demo 1](https://www.loom.com/share/63931487f6644d1e97977dcec2a7f972?sid=e8e59701-7b9b-4f08-83f7-4d3eb72b4175)
[Jobify Demo 2](https://www.loom.com/share/2e9265682e5b48a9a3dffa02d35e437b)
[Jobify Demo 3](https://www.loom.com/share/78d1efd262d4471f9dd6b9b028e2e9a5)
[Jobify Demo 4](https://www.loom.com/share/115dde9e790941f8baaf0ea05fb87ab7)

**✨ What you'll see:**
- Modern, responsive UI with search and filter capabilities
- Automated job scraping functionality
- Full CRUD operations for job management

*Note: The demo showcases the frontend interface. For the complete system with automated scraping, follow the setup instructions below.*

## 📁 Project Structure

```
Scrape_X/
├── jobifiy/                 # React Frontend
│   ├── src/
│   ├── package.json
│   └── ...
├── Server/                  # Flask Backend API
│   ├── app/
│   ├── requirements.txt
│   └── ...
├── Scraper/                 # Job Scraping System
│   ├── job_scraper.py
│   ├── requirements.txt
│   └── ...
└── README.md
```

## 🛠️ Technology Stack

### Frontend (jobifiy/)
- **React 19** with Vite
- **Ant Design** for UI components
- **Tailwind CSS** for styling
- **FontAwesome** for icons

### Backend (Server/)
- **Flask 3.1.0** web framework
- **Flask-SQLAlchemy** for database ORM
- **Supabase PostgreSQL** database
- **Flask-CORS** for cross-origin requests

### Scraper (Scraper/)
- **SeleniumBase** for web scraping
- **BeautifulSoup** for HTML parsing
- **Pandas** for data manipulation
- **Schedule** for automated execution

## 🚀 Quick Start

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend and scraper)
- Supabase PostgreSQL database (configured via .env)

### 1. Frontend Setup (jobifiy/)

```bash
cd jobifiy

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Backend Setup (Server/)

```bash
cd Server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python run.py
```

The API server will be available at `http://localhost:5000`

### 3. Scraper Setup (Scraper/)

```bash
cd Scraper

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the scraper
python bot.py
```

## 🔧 Configuration

### Database Setup
This project uses **Supabase PostgreSQL** for the database. The database credentials are configured in the `.env` file.

### Environment Variables
Create `.env` files in both Server and Scraper directories with necessary configuration:

**Server/.env:**
```
DATABASE_URL=your_supabase_postgresql_connection_string
user=your_username
password= your_password
host=your_host_name
port=your_port_name
dbname=your_db_name
```

**Note**: Replace `your_supabase_postgresql_connection_string` with your actual Supabase PostgreSQL connection string from your Supabase dashboard.

## 🔄 How It Works

### Automated Job Scraping
- The scraper runs automatically every 10 minutes
- Scrapes job listings from Indeed Pakistan
- Searches for "software engineer" positions in Gujranwala
- Saves data to CSV and sends to Flask API

### API Endpoints
- `GET /jobs/` - Get all jobs
- `POST /jobs/` - Add a new job
- `GET /jobs/<id>` - Get job by ID
- `PUT /jobs/<id>` - Update job
- `DELETE /jobs/<id>` - Delete job
- `GET /jobs/title/<title>` - Filter jobs by title
- `POST /jobs/bulk` - Add multiple jobs

### Frontend Features
- Modern, responsive UI with Ant Design
- Real-time job search and filtering
- Add, edit, and delete job listings
- View job details and external links

## 📊 Data Flow

1. **Scraper** → Scrapes job data from Indeed
2. **Scraper** → Sends data to Flask API via HTTP requests
3. **Flask API** → Stores data in Supabase PostgreSQL database
4. **React Frontend** → Fetches and displays data from API
5. **User** → Interacts with jobs through the web interface

## 🎯 Key Features

- **Automated Job Scraping**: Runs every 10 minutes without manual intervention
- **Real-time Updates**: Fresh job data automatically added to database
- **Modern UI**: Clean, responsive interface built with React and Ant Design
- **Search & Filter**: Find jobs by title, company, or location
- **CRUD Operations**: Full create, read, update, delete functionality
- **RESTful API**: Well-structured Flask API with proper error handling

## 🐛 Troubleshooting

### Common Issues

1. **Virtual Environment Issues**
   - Ensure you're in the correct directory
   - Use the correct activation command for your OS

2. **Database Connection**
   - Verify Supabase PostgreSQL is accessible
   - Check database credentials in .env file

3. **Port Conflicts**
   - Frontend: Change port in `vite.config.js`
   - Backend: Change port in `run.py`

4. **Scraper Issues**
   - Ensure Chrome/Chromium is installed
   - Check internet connection
   - Verify API server is running

## 📝 Development

### Adding New Features
1. **Frontend**: Add components in `jobifiy/src/`
2. **Backend**: Add routes in `Server/app/jobs/routes.py`
3. **Scraper**: Modify `Scraper/job_scraper.py`

### Testing
- Frontend: `npm run test` (if configured)
- Backend: Use Postman or curl for API testing
- Scraper: Run manually to test scraping functionality



---

**Note**: Make sure all three components (Frontend, Backend, Scraper) are running simultaneously for the complete system to work properly.
