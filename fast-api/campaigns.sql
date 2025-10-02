CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT CHECK (status IN ('Active','Paused')) NOT NULL,
    clicks INTEGER NOT NULL,
    cost REAL NOT NULL,
    impressions INTEGER NOT NULL
);

INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
('Summer Sale', 'Active', 150, 45.99, 1000),
('Black Friday', 'Paused', 320, 89.50, 2500),
('Winter Blast', 'Active', 210, 60.00, 1800),
('Spring Launch', 'Paused', 115, 23.20, 800),
('New Arrivals', 'Active', 185, 52.30, 1200),
('Cyber Monday', 'Paused', 275, 75.40, 2000),
('Year End', 'Active', 193, 55.00, 1400),
('Festival Frenzy', 'Paused', 133, 41.60, 900),
('Flash Deals', 'Active', 220, 68.99, 1700),
('Back to School', 'Paused', 99, 18.80, 600);
