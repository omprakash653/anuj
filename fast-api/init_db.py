import sqlite3

# Read SQL schema and data
with open("campaigns.sql", "r") as f:
    sql = f.read()

conn = sqlite3.connect("campaigns.db")
cursor = conn.cursor()
cursor.executescript(sql)
conn.commit()
conn.close()

print("Database initialized!")
