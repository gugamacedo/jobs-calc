const Profile = require('../models/Profile')

module.exports = {
  async index(req, res) {
    const profile = await Profile.get()

    return res.render('profile', {profile})
  },

  async update(req, res) {
    const profile = await Profile.get()

    const weeksPerMonth = (52 - req.body['vacation-per-year']) / 12
    const hoursPerWeek = req.body['hours-per-day'] * req.body['days-per-week']

    const valueHour = req.body['monthly-budget'] / (weeksPerMonth * hoursPerWeek)

    await Profile.update({
      ...profile,
      ...req.body,
      'value-hour': valueHour
    })
    return res.redirect('/profile')
  }
}