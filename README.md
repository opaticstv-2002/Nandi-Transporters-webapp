# NANDI TRANSPORTERS - Car Hiring Management Web App

A responsive web application for managing car hiring operations, built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

- **Vehicle Management**: Add, view, and track vehicles
- **Customer Registration**: Register and manage customers
- **Driver Management**: Register and manage drivers
- **Booking System**: Create and manage vehicle bookings
- **Real-time Tracking**: Update and monitor vehicle locations
- **Dashboard**: Overview of all operations
- **Responsive Design**: Works on laptops, tablets, and phones

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Template Engine**: EJS
- **Styling**: Responsive CSS with Flexbox/Grid

## Prerequisites

Before running this application, you need to install **Node.js** (which includes npm).

### Install Node.js

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version for Windows
3. Run the installer and follow the setup wizard
4. Restart your command prompt/terminal if needed

### Verify Installation

Open Command Prompt or PowerShell and run:
```bash
node --version
npm --version
```

You should see version numbers for both.

## Quick Start (Windows)

1. **Install Node.js** as described in Prerequisites
2. **Double-click** `start.bat` in the project folder
3. **Open your browser** to `http://localhost:3000`

The batch file will automatically install dependencies and start the server.

## Manual Installation

1. **Clone or download** the project files to your computer

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## Database Schema

The app automatically creates the following tables:

- **vehicles**: Vehicle information (make, model, plate, seats, status)
- **customers**: Customer details (name, phone, email)
- **drivers**: Driver information (name, phone, license)
- **bookings**: Rental bookings (customer, vehicle, driver, dates)
- **tracking**: GPS tracking data (vehicle location updates)

## Usage

### Dashboard
- View summary statistics of vehicles, customers, drivers, bookings, and tracking updates

### Vehicle Management
- Add new vehicles with make, model, plate number, and seating capacity
- View all vehicles with their current status

### Customer Registration
- Register new customers with contact information
- View customer database

### Driver Management
- Register drivers with license information
- View driver database

### Booking System
- Create bookings by selecting customer, vehicle, and driver IDs
- Set rental start and end dates
- Vehicle status automatically updates to "booked"

### Vehicle Tracking
- Update vehicle locations with latitude/longitude coordinates
- View tracking history
- Vehicle status updates to "in transit" when location is updated

## API Endpoints

- `GET /api/dashboard` - Get dashboard statistics
- `GET/POST /api/vehicles` - Vehicle CRUD operations
- `GET/POST /api/customers` - Customer CRUD operations
- `GET/POST /api/drivers` - Driver CRUD operations
- `GET/POST /api/bookings` - Booking CRUD operations
- `GET/POST /api/tracking` - Tracking CRUD operations

## Responsive Design

The app is fully responsive and works on:
- **Desktop computers** (1024px+)
- **Tablets** (768px - 1023px)
- **Mobile phones** (up to 767px)

## Development

To modify the app:

1. **Backend changes**: Edit `server.js`
2. **Frontend changes**: Edit files in `views/` and `public/`
3. **Styling**: Modify `public/css/styles.css`
4. **JavaScript**: Modify `public/js/app.js`

## License

This project is created for NANDI TRANSPORTERS car hiring company.

## Support

For technical support or feature requests, please contact the development team.