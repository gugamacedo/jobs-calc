let data = {
  name: 'Guga Macedo',
  avatar: 'https://github.com/gugamacedo.png',
  'monthly-budget': 3500,
  'hours-per-day': 6,
  'days-per-week': 5,
  'vacation-per-year': 4,
  'value-hour': 75
}

module.exports = {
  get: () => data,
  
  update: (newData) => data = newData
}