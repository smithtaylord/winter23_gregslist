import { generateId } from "../Utils/generateId.js"


export class Job {

    constructor(data) {
        this.id = data.id || generateId()
        this.title = data.title
        this.company = data.company
        this.salary = data.salary
        this.location = data.location
        this.imgUrl = data.imgUrl
        this.description = data.description
    }

    get JobCardTemplate() {
        return /*html*/ `
        <div class="col-md-4 my-3">
    <div class="card elevation-2 car" onclick="app.jobsController.setActiveJob('${this.id}')" data-bs-toggle="modal" data-bs-target="#listingModal">
        <img
        src="${this.imgUrl}"
        alt="${this.title}" class="rounded">
        <p><b>${this.title} at ${this.company} - $${this.salary} Salary</b></p>
    </div>
    </div>
        `
    }

    static JobForm() {
        return /*html*/`
        <form onsubmit="app.jobsController.handleFormSubmit()">
    
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="title" required minlength="3" maxlength="20">
                <label for="title">Title</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="company" required>
                <label for="company">Company</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="number" class="form-control" name="salary" required >
                <label for="salary">Salary</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="location" required min="0">
                <label for="location">Location</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="url" class="form-control" name="imgUrl">
                <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
            </div>
    
            <div class="form-floating">
                <textarea class="form-control" placeholder="Describe your Listing" name="description"></textarea>
                <label for="description">Description</label>
            </div>
    
            <div class="d-flex my-4 gap-5 align-items-center">
                <button class="btn" type="reset">Cancel</button>
                <button class="btn btn-primary" type="submit" data-bs-dismiss="offcanvas">Submit</button>
            </div>
    
            </form>
        `

    }

}
