const Profile = require('../models/Profile')

module.exports = {
  index(req, res) {
    return res.render('profile', {profile: Profile.get()})
  },

  update(req, res) {
    const weeksPerMonth = (52 - req.body['vacation-per-year']) / 12
    const hoursPerWeek = req.body['hours-per-day'] * req.body['days-per-week']

    const valueHour = req.body['monthly-budget'] / (weeksPerMonth * hoursPerWeek)

    Profile.update({
      ...Profile.get(),
      ...req.body,
      'value-hour': valueHour
    })
    return res.redirect('/profile')
  }
}