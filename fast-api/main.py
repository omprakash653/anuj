from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

# Setup FastAPI app
app = FastAPI()

# CORS configuration for local/frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # In production, specify allowed domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "campaigns.db"

# Utility function: get db connection
def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# API endpoint: /campaigns
@app.get("/campaigns")
def get_campaigns(status: str = Query(None, description="Filter by status")):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Filter by status if provided
    if status:
        cursor.execute("SELECT * FROM campaigns WHERE status = ?", (status,))
    else:
        cursor.execute("SELECT * FROM campaigns")
    campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return campaigns

