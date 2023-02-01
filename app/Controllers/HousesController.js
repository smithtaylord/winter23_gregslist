import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawHouses() {
  let template = ''
  appState.houses.forEach(h => template += h.HouseCardTemplate)
  setHTML('listings', template)
}

function _drawHouse() {
  console.log('DrawHouse');
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

}
