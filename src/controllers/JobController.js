const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {
  create(req, res) {
    return res.render('job')
  },

  save(req, res) {
    Job.save({
      id: Job.get().length + 1,
      name: req.body['name'],
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      'created_at': Date.now() // adicionando a data de criação
    })
    
    return res.redirect('/')
  },

  show(req, res) {
    const jobId = req.params['id']

    const job = Job.get().find(job => job['id'] === Number(jobId)) // O job que vem pelo 'params' é string

    if(!job) {
      return res.send('Job não encontrado')
    }

    job.budget = JobUtils.calculateBudget(job, Profile.get()['value-hour'])

    return res.render('job-edit', { job })
  },

  update(req, res) {
    const jobId = req.params['id']

    const job = Job.get().find(job => job['id'] === Number(jobId)) // O job que vem pelo 'params' é string

    if(!job) {
      return res.send('Job não encontrado')
    }

    const updatedJob = {
      ...job,
      name: req.body['name'],
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    const newData = Job.get().map(job => Number(job['id']) === Number(jobId) ? job = updatedJob : job) // kct

    Job.update(newData)

    res.redirect('/job/' + jobId)
  },

  delete(req, res) {
    const jobId = req.params['id']
    
    Job.delete(jobId)

    return res.redirect('/')
  }
}