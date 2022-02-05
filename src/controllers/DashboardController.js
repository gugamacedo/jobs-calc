const Profile = require('../models/Profile')
const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  index(req, res) {

    let statusCount = {
      progress: 0,
      done: 0,
      total: Job.get().length,
      freeHours: 0
    }

    let jobTotalHours = 0 // total de horas de cada job em progresso

    const updatedJobs = Job.get().map((job) => {
      // ajustes no job
      const remaning = JobUtils.remaningDays(job)
      const status = remaning <= 0 ? 'done' : 'progress'

      statusCount[status] += 1 // pegando o done ou progress e passando como propriedade ºOº

      jobTotalHours += status === 'progress' ? job['daily-hours'] : 0

      return {
        ...job,
        remaning,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get()['value-hour']),
      }
    })

    statusCount['freeHours'] = Profile.get()['hours-per-day'] - jobTotalHours

    return res.render('index', { jobs: updatedJobs, profile: Profile.get(), statusCount })
  },
}
