import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawJobs() {
  let template = ''
  appState.jobs.forEach(j => template += j.JobCardTemplate)
  setHTML('listings', template)
}


export class JobsController {

  constructor() {
    appState.on('jobs', _drawJobs)

  }


  show() {

    setText('add-listing-button', '🪦 Dead end Job?')
    setText('listingFormLabel', '🪦 Dig up a new Job')

    setHTML('the-actual-form', Job.JobForm())
    _drawJobs()
  }
}
