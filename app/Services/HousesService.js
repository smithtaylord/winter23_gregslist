import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { saveState } from "../Utils/Store.js"

class HousesService {
    deleteHouse(houseId) {
        // FINSIH WRITING THIS FOR TONIGHT
    }
    CreateHouse(formData) {
        let house = new House(formData)
        appState.houses.push(house)
        appState.emit('houses')
        saveState('houses', appState.houses)

    }
    setActiveHouse(houseId) {
        let house = appState.houses.find(h => h.id == houseId)
        if (!house) {
            throw new Error('There is no House with that ID')
        }
        appState.house = house
    }
}

// singleton pattern more on this later
export const housesService = new HousesService()