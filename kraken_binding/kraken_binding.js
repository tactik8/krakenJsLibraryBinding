/**
 * 
 * 
 */

let bindingsDB = [];



export const krakenBinding = {
    getBinding: getBinding
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


export class KrBinding {

    constructor(element, thing) {

        this.id = String(crypto.randomUUID())
        this.element = element
        this.thing = thing
        this.element.id = this.id
        this.initializeObserver()
        this.initEventListener()
        this.initializeChangeListener()
        bindingsDB.push(this)
    }

    // ----------------------------------------------------------
    // ---------------- Element manipulations-- -----------------
    // ----------------------------------------------------------


    getPropertyElements() {
        let propertyElements = this.element.querySelectorAll(`.krProperty`)
        return propertyElements
        
    }

    
    getPropertyElement(propertyID) {

        let propertyElement = this.element.querySelector(`.krProperty[data-propertyID="${propertyID}"]`)[0]
        return propertyElement
    }

    getPropertyValue(propertyID) {
        let propertyElement = this.getPropertyElement(propertyID)
        let value = propertyElement.textContent
        return value
    }

    setPropertyValue(propertyID, value) {

        if (!propertyID) { return null }

        let propertyElement = this.getPropertyElement(propertyID)

        if (propertyElement.value) {
            propertyElement.value = value
        } else {
            propertyElement.textContent = value
        }
    }


    // ----------------------------------------------------------
    // -------------- Element to thing bindings -----------------
    // ----------------------------------------------------------

    initializeObserver() {

        // When an editable div is changed, updated corresponding thing

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

                if (mutation.type == "characterData") {
                    let binding = getBinding(mutation.target.parentElement)
                    console.log(binding)
                    let propertyElement = mutation.target.parentElement.closest('.krProperty')
                    binding.thing.setProperty(propertyElement.getAttribute('data-propertyid'), mutation.target.textContent)

                }
            });
        });
        var config = { attributes: true, childList: true, characterData: true, subtree: true };

        for (let t of this.element.getElementsByClassName('krProperty')) {
            observer.observe(t, config);
        }
    }


    initializeChangeListener(){

        let elements = this.element.getElementsByClassName('krProperty')
        for(let d of elements){
            let propertyID = d.getAttribute('data-propertyid')
            d.addEventListener("change", (event) => {     
                this.thing.setProperty(propertyID, event.target.value)
            });
        }
    }

    // ----------------------------------------------------------
    // -------------- Thing to element bindings -----------------
    // ----------------------------------------------------------

    initEventListener() {
        let element = this
        this.thing.addEventListener('all', (event) => {
            element.setPropertyValue(event.data.propertyID, event.data.newValue);
        });
    }
}











