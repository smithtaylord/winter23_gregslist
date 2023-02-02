import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawJobs() {
  let template = ''
  appState.jobs.forEach(j => template += j.JobCardTemplate)
  setHTML('listings', template)
}

function _drawJob() {
  setText('listingModalLabel', `${appState.job.title}- $${appState.job.salary}`)
  setHTML('listing-modal-body', appState.job.JobDetailsTemplate)

}


export class JobsController {

  constructor() {
    appState.on('jobs', _drawJobs)
    appState.on('job', _drawJob)

  }


  show() {

    setText('add-listing-button', '🪦 Dead end Job?')
    setText('listingFormLabel', '🪦 Dig up a new Job')

    setHTML('the-actual-form', Job.JobForm())
    _drawJobs()
  }

  setActiveJob(jobId) {
    try {
      jobsService.setActiveJob(jobId)
    } catch (error) {
      Pop.error(error)
    }
  }

  handleFormSubmit(form) {
    try {
      // @ts-ignore
      event.preventDefault()
      // @ts-ignore
      const form = event.target
      const formData = getFormData(form)

      jobsService.createJob(formData)

      console.log(formData);

      // @ts-ignore
      form.reset()
    } catch (error) {
      Pop.error(error)
    }

  }

  async deleteJob(jobId) {
    try {
      const yes = await Pop.confirm('Are you sure you want to delete??')
      if (!yes) { return }

      jobsService.deleteJob(jobId)
    } catch (error) {
      Pop.error(error)
    }
  }
}
