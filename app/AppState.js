import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { Job } from "./Models/Job.js"
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
  houses = loadState('houses', [House])
  /** @type {import('./Models/House').House} */
  // @ts-ignore
  house = null
  /** @type {import('./Models/Job').Job[]} */
  jobs = loadState('jobs', [Job])
  /** @type {import('./Models/Job').Job} */
  // @ts-ignore
  job = null



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
