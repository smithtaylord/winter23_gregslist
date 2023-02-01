import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawHouses() {
  let template = ''
  appState.houses.forEach(h => template += h.HouseCardTemplate)
  setHTML('listings', template)

}

function _drawHouse() {
  setText('listingModalLabel', `${appState.house.bedrooms} - Bedrooms ${appState.house.bathrooms} - Bathrooms`)
  setHTML('listing-modal-body', appState.house.HouseDetailsTemplate)
  console.log('_drawHouse');
}

export class HousesController {


  constructor() {
    appState.on('houses', _drawHouses)
    appState.on('house', _drawHouse)
  }

  show() {
    setText('add-listing-button', 'Want to Sell Your 🏠?')
    setText('listingFormLabel', 'Sell your house here!')

    setHTML('the-actual-form', House.HouseForm())
    _drawHouses()
  }

  setActiveHouse(houseId) {
    try {
      housesService.setActiveHouse(houseId)
    } catch (error) {
      Pop.error(error)
    }
  }

  handleFormSubmit() {
    try {
      // @ts-ignore
      event.preventDefault()
      // @ts-ignore
      const form = event.target
      const formData = getFormData(form)
      housesService.CreateHouse(formData)
      console.log(formData);
      // @ts-ignore
      form.reset()
    } catch (error) {
      Pop.error(error)
    }
  }

  async deleteHouse(houseId) {
    try {
      const yes = await Pop.confirm('Are you sure you want to delete the house listing?')
      if (!yes) { return }

      housesService.deleteHouse(houseId)
    } catch (error) {
      Pop.error(error)
    }

  }

}
