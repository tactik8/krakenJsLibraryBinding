/**
 * 
 * 
 */

import { KrBinding } from './src/class_KrBinding.js'


let bindingsDB = [];



export const kraken_binding = {
    getBinding: getBinding,
    KrBinding: KrBinding
}



function getBindings(thing) {
    //let thingElement = element.closest('.krThing')

    let results = []
    for (let t of bindingsDB) {
        if (t.thing.record_id == thing.record_id) {
            results.push(t)
        }
    }
    return results
}


function getBinding(element) {
    // Returns the binding for a given element
    let thingElement = element.closest('.krThing')

    for (let t of bindingsDB) {
        if (t.id == thingElement.id) {
            return t
        }
    }
    return null
}

