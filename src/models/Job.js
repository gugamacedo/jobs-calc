let data = [
  {
    id: 1,
    name: 'Teste Um',
    'daily-hours': 2,
    'total-hours': 60,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: 'Teste Dois',
    'daily-hours': 2,
    'total-hours': 47,
    created_at: Date.now(),
  },
]

module.exports = {
  get: () => data,

  update: (newData) => data = newData,

  delete: (jobId) => data = data.filter(job => Number(job['id']) !== Number(jobId)),

  save: (newData) => data.push(newData)
}