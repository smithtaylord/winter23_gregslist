import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { saveState } from "../Utils/Store.js"


class JobsService {
    deleteJob(jobId) {
        let jobIndex = appState.jobs.findIndex(j => j.id == jobId)

        if (jobIndex == -1) {
            throw new Error('Bad Id')
        }

        appState.jobs.splice(jobIndex, 1)
        saveState('jobs', appState.jobs)
        appState.emit('jobs')
    }
    setActiveJob(jobId) {
        const job = appState.jobs.find(j => j.id == jobId)
        if (!job) {
            throw new Error('there is no job with that ID')
        }
        appState.job = job
    }

    createJob(formData) {
        let job = new Job(formData)

        appState.jobs.push(job)
        appState.emit('jobs')
        saveState('jobs', appState.jobs)


    }


}
export const jobsService = new JobsService()