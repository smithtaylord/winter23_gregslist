import { generateId } from "../Utils/generateId.js";


export class House {

    constructor(data) {
        this.id = data.id || generateId()
        this.year = data.year
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.sqft = data.sqft
        this.price = data.price
        this.description = data.description
        this.imgUrl = data.imgUrl;
    }

    get HouseCardTemplate() {
        return /*html*/`
    <div class="col-md-4 my-3">
    <div class="card elevation-2 car" onclick="app.housesController.setActiveHouse('${this.id}')" data-bs-toggle="modal" data-bs-target="#listingModal">
        <img
        src="${this.imgUrl}"
        alt="" class="rounded">
        <p><b>${this.bedrooms}-Bedrooms ${this.bathrooms}-Bathrooms - $${this.price}</b></p>
    </div>
    </div>
    `
    }
    get HouseDetailsTemplate() {
        return /*html*/`
          <div>
            <button class="btn btn-danger" data-bs-dismiss="modal" onclick="app.housesController.deleteHouse('${this.id}')">DELETE THE HOUSE!</button>
          </div>
        `

    }
    static HouseForm() {
        return /*html*/`
        <form onsubmit="app.housesController.handleFormSubmit()">
    
            <div class="form-floating mb-3">
                <input type="number" class="form-control" name="year" required>
                <label for="year">Year</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="number" class="form-control" name="bedrooms" required min="1">
                <label for="bedrooms">Bedrooms</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="number" class="form-control" name="bathrooms"  required min="1">
                <label for="bathrooms">Bathrooms</label>
            </div>

            <div class="form-floating mb-3">
                <input type="number" class="form-control" name="sqft" required>
                <label for="sqft">Square Footage</label>
            </div>
    
            <div class="form-floating mb-3">
                <input type="number" class="form-control" name="price" required min="0">
                <label for="price">Price</label>
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
