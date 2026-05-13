const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Request logging for API routes
app.use('/api', (req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Database setup
const db = new sqlite3.Database('./nandi_transporters.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run('PRAGMA foreign_keys = ON');
        console.log('Connected to SQLite database.');
        createTables();
    }
});

// Create database tables
function createTables() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            make TEXT NOT NULL,
            model TEXT NOT NULL,
            plate TEXT UNIQUE NOT NULL,
            seats INTEGER NOT NULL,
            status TEXT DEFAULT 'available'
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS drivers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            license TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER,
            vehicle_id INTEGER,
            driver_id INTEGER,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            status TEXT DEFAULT 'active',
            FOREIGN KEY (customer_id) REFERENCES customers (id),
            FOREIGN KEY (vehicle_id) REFERENCES vehicles (id),
            FOREIGN KEY (driver_id) REFERENCES drivers (id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS tracking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehicle_id INTEGER,
            latitude REAL,
            longitude REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
        )`);
    });
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// API Routes
app.get('/api/dashboard', (req, res) => {
    const queries = {
        vehicles: 'SELECT COUNT(*) as count FROM vehicles',
        customers: 'SELECT COUNT(*) as count FROM customers',
        drivers: 'SELECT COUNT(*) as count FROM drivers',
        bookings: 'SELECT COUNT(*) as count FROM bookings',
        tracking: 'SELECT COUNT(*) as count FROM tracking'
    };

    const results = {};

    let completed = 0;
    const total = Object.keys(queries).length;

    Object.keys(queries).forEach(key => {
        db.get(queries[key], (err, row) => {
            if (err) {
                console.error(err);
                results[key] = 0;
            } else {
                results[key] = row.count;
            }
            completed++;
            if (completed === total) {
                res.json(results);
            }
        });
    });
});

// Vehicles
app.get('/api/vehicles', (req, res) => {
    db.all('SELECT * FROM vehicles ORDER BY id DESC', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/vehicles', (req, res) => {
    const { make, model, plate, seats } = req.body;
    db.run('INSERT INTO vehicles (make, model, plate, seats) VALUES (?, ?, ?, ?)',
        [make, model, plate, seats], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID });
    });
});

app.put('/api/vehicles/:id', (req, res) => {
    const { make, model, plate, seats } = req.body;
    const id = req.params.id;
    db.run('UPDATE vehicles SET make = ?, model = ?, plate = ?, seats = ? WHERE id = ?',
        [make, model, plate, seats, id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ changes: this.changes });
    });
});

app.delete('/api/vehicles/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM vehicles WHERE id = ?', [id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ deleted: this.changes });
    });
});

// Customers
app.get('/api/customers', (req, res) => {
    db.all('SELECT * FROM customers ORDER BY id DESC', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/customers', (req, res) => {
    const { name, phone, email } = req.body;
    db.run('INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)',
        [name, phone, email], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID });
    });
});

app.put('/api/customers/:id', (req, res) => {
    const { name, phone, email } = req.body;
    const id = req.params.id;
    db.run('UPDATE customers SET name = ?, phone = ?, email = ? WHERE id = ?',
        [name, phone, email, id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ changes: this.changes });
    });
});

app.delete('/api/customers/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM customers WHERE id = ?', [id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ deleted: this.changes });
    });
});

// Drivers
app.get('/api/drivers', (req, res) => {
    db.all('SELECT * FROM drivers ORDER BY id DESC', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/drivers', (req, res) => {
    const { name, phone, license } = req.body;
    db.run('INSERT INTO drivers (name, phone, license) VALUES (?, ?, ?)',
        [name, phone, license], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID });
    });
});

app.put('/api/drivers/:id', (req, res) => {
    const { name, phone, license } = req.body;
    const id = req.params.id;
    db.run('UPDATE drivers SET name = ?, phone = ?, license = ? WHERE id = ?',
        [name, phone, license, id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ changes: this.changes });
    });
});

app.delete('/api/drivers/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM drivers WHERE id = ?', [id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ deleted: this.changes });
    });
});

// Bookings
app.get('/api/bookings', (req, res) => {
    const query = `
        SELECT b.*, v.make, v.model, v.plate, c.name as customer_name, d.name as driver_name
        FROM bookings b
        LEFT JOIN vehicles v ON b.vehicle_id = v.id
        LEFT JOIN customers c ON b.customer_id = c.id
        LEFT JOIN drivers d ON b.driver_id = d.id
        ORDER BY b.id DESC
    `;
    db.all(query, (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/bookings', (req, res) => {
    const { customer_id, vehicle_id, driver_id, start_date, end_date } = req.body;
    db.run('INSERT INTO bookings (customer_id, vehicle_id, driver_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
        [customer_id, vehicle_id, driver_id, start_date, end_date], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Update vehicle status to booked
            db.run('UPDATE vehicles SET status = ? WHERE id = ?', ['booked', vehicle_id]);
            res.json({ id: this.lastID });
        }
    });
});

app.put('/api/bookings/:id', (req, res) => {
    const { customer_id, vehicle_id, driver_id, start_date, end_date, status } = req.body;
    const id = req.params.id;
    db.run('UPDATE bookings SET customer_id = ?, vehicle_id = ?, driver_id = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?',
        [customer_id, vehicle_id, driver_id, start_date, end_date, status || 'active', id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ changes: this.changes });
    });
});

app.delete('/api/bookings/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT vehicle_id FROM bookings WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        db.run('DELETE FROM bookings WHERE id = ?', [id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (row && row.vehicle_id) {
                db.run('UPDATE vehicles SET status = ? WHERE id = ?', ['available', row.vehicle_id]);
            }
            res.json({ deleted: this.changes });
        });
    });
});

// Tracking
app.get('/api/tracking', (req, res) => {
    const query = `
        SELECT t.*, v.make, v.model, v.plate
        FROM tracking t
        LEFT JOIN vehicles v ON t.vehicle_id = v.id
        ORDER BY t.timestamp DESC
    `;
    db.all(query, (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/tracking', (req, res) => {
    const { vehicle_id, latitude, longitude } = req.body;
    db.run('INSERT INTO tracking (vehicle_id, latitude, longitude) VALUES (?, ?, ?)',
        [vehicle_id, latitude, longitude], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Update vehicle status to in transit
            db.run('UPDATE vehicles SET status = ? WHERE id = ?', ['in transit', vehicle_id]);
            res.json({ id: this.lastID });
        }
    });
});

app.delete('/api/tracking/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM tracking WHERE id = ?', [id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ deleted: this.changes });
    });
});

// Serve static files AFTER API routes
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler for API requests
app.use('/api', (req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// Catch-all for other 404s
app.use((req, res) => {
    res.status(404).render('index');
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    const interfaces = os.networkInterfaces();
    let localAddress = 'localhost';

    Object.values(interfaces).forEach(ifaceArray => {
        ifaceArray.forEach(iface => {
            if (iface.family === 'IPv4' && !iface.internal) {
                localAddress = iface.address;
            }
        });
    });

    console.log(`NANDI TRANSPORTERS Web App running on http://localhost:${PORT}`);
    console.log(`Accessible from other devices at http://${localAddress}:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});