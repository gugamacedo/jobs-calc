const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {
  data: {
    name: 'Guga Macedo',
    avatar: 'https://github.com/gugamacedo.png',
    'monthly-budget': 3000,
    'hours-per-day': 5,
    'days-per-week': 5,
    'vacation-per-year': 4,
    'value-hour': 75
  },

  controllers: {
    index(req, res) {
      return res.render(views + 'profile', {profile: Profile.data})
    },

    update(req, res) {
      const weeksPerMonth = (52 - req.body['vacation-per-year']) / 12
      const hoursPerWeek = req.body['hours-per-day'] * req.body['days-per-week']

      const valueHour = req.body['monthly-budget'] / (weeksPerMonth * hoursPerWeek)

      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hour': valueHour
      }

      return res.redirect('/profile')
    }
  }
}

// this pro primeiro escopo anterior, mais que isso tem que dar a volta

const Job = {
  data: [
    {
      id: 1,
      name: 'Teste Um',
      'daily-hours': 2,
      'total-hours': 60,
      'created_at': Date.now()
    },
    {
      id: 2,
      name: 'Teste Dois',
      'daily-hours': 3,
      'total-hours': 47,
      created_at: Date.now()
    }
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        // ajustes no job
        const remaning = Job.services.remaningDays(job)
        const status = remaning <= 0 ? 'done' : 'progress'
    
        return {
          ...job,
          remaning,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      })
      
      return res.render(views + 'index', { jobs: updatedJobs})
    },

    create(req, res) {
      return res.render(views + 'job')
    },

    save(req, res) {
      Job.data.push({
        id: Job.data.length + 1,
        name: req.body['name'],
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        'created_at': Date.now() // adicionando a data de criação
      })
      return res.redirect('/')
    },

    show(req, res) {
      const jobId = req.params['id']

      const job = Job.data.find(job => job['id'] === Number(jobId)) // O job que vem pelo 'params' é string

      if(!job) {
        return res.send('Job não encontrado')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

      return res.render(views + 'job-edit', { job })
    },

    update(req, res) {
      const jobId = req.params['id']

      const job = Job.data.find(job => job['id'] === Number(jobId)) // O job que vem pelo 'params' é string

      if(!job) {
        return res.send('Job não encontrado')
      }

      const updatedJob = {
        ...job,
        name: req.body['name'],
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Job.data = Job.data.map(job => Number(job['id']) === Number(jobId) ? job = updatedJob : job)

      res.redirect('/job/' + jobId)
    },

    delete(req, res) {
      const jobId = req.params['id']

      Job.data = Job.data.filter(job => Number(job['id']) !== Number(jobId))

      return res.redirect('/')
    }
  },

  services: {
    remaningDays(job) {
      // calculo de tempo restante
      const remaningDays = Math.ceil(job['total-hours'] / job['daily-hours'])
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + remaningDays
      const timeDiffMs = createdDate.setDate(dueDay) - Date.now()
      const daysDiff = Math.ceil(timeDiffMs / (1000*60*60*24))
      
      return daysDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes