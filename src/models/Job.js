const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const data = await db.all(`SELECT * FROM jobs`) // tipo o get mas pega vários registros

    await db.close()

    return data.map((item) => ({
      id: item['id'],
      name: item['name'],
      'daily-hours': item['daily_hours'],
      'total-hours': item['total_hours'],
      created_at: item['created_at'],
    }))
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    db.run(`UPDATE jobs SET 
    name = "${updatedJob['name']}",
    daily_hours = ${updatedJob['daily-hours']},
    total_hours = ${updatedJob['total-hours']}
    WHERE id = ${jobId}
    `)

    await db.close()

  },

  async delete(jobId) {
    const db = await Database()

    await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)

    await db.close()
  },

  async save(newJob) {
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob['name']}",
      ${newJob['daily-hours']},
      ${newJob['total-hours']},
      ${newJob['created_at']}
    )`)

    await db.close()
  },
}
