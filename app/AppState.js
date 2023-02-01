import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])
  /** @type {import('./Models/Car').Car[]} */
  cars = loadState('cars', [Car])
  /** @type {import('./Models/Car').Car} */
  // @ts-ignore
  car = null

  /** @type {import('./Models/House').House[]} */
  houses = [
    new House({
      year: 1940,
      name: 'Red House',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2500,
      price: 300000,
      description: 'Old Red House on a Farm',
      imgUrl: 'https://images.unsplash.com/photo-1501635238895-63f29cfc06b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
    })
  ]

  /** @type {import('./Models/House').House} */
  // @ts-ignore
  house = null
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
