const Database = require('./config')

const initdb = {
  async init() {
    const db = await Database() // abrindo conexão com database
    
    // criando tabelas
    
    await db.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      hours_per_day INT,
      days_per_week INT,
      vacation_per_year INT,
      value_hour INT
    )`);
    
    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
    )`);
    
    // inserindo valores
    await db.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      hours_per_day,
      days_per_week,
      vacation_per_year,
      value_hour
    ) VALUES (
      "Guga Macedo",
      "https://github.com/gugamacedo.png",
      3500,
      6,
      5,
      4,
      75
    )`);
    
    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Freela Um",
      2,
      60,
      1644095414478
    )`);
    
    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Freela Dois",
      3,
      47,
      1644095414478
    )`);
    
    
    await db.close()
    
  }
}

initdb.init()