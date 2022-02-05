module.exports = {
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