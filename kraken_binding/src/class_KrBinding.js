
import { KrBindingProperty } from './class_KrBindingProperty.js'

let bindingsDB = [];


export class KrBinding {

    constructor(element, thing) {

        this.id = String(crypto.randomUUID())
        this.properties = []
        this.element = element
        this.thing = thing
        this.element.id = this.id
       
        bindingsDB.push(this)
        this.init()
    }



    // ----------------------------------------------------------
    // Init
    // ----------------------------------------------------------

    init(){
    
        this.loadPropertyElements()
        this.initializeObserver()
        this.initEventListener()
    }
    
    // ----------------------------------------------------------
    // ---------------- Element manipulations-- -----------------
    // ----------------------------------------------------------

    loadPropertyElements() {
        let propertyElements = this.element.querySelectorAll(`.krProperty:not(.krThing) `)
        
        for(let p of propertyElements){
            this.properties.push(new KrBindingProperty(p))
        }
    }

    getPropertyElement(propertyID) {
        for(let p of this.properties){
            if(p.propertyID == propertyID){
                return p
            }
        }
        return null
    }

    // -----------------------------------------------------
    //  Comment 
    // -----------------------------------------------------

    setEditable(){
        for(let p of this.properties){
            p.setEditable()
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


    // ----------------------------------------------------------
    // -------------- Thing to element bindings -----------------
    // ----------------------------------------------------------

    initEventListener() {
        let t = this
        this.thing.addEventListener('all', (event) => {
            const property = t.getPropertyElement(event.data.propertyID)
                property.value = event.data.newValue
        });
    }

    // -----------------------------------------------------
    //  refresh 
    // -----------------------------------------------------

    refresh(){
        let properties = this.properties
        for(let p of properties){
            p.value = this.thing.getProperty(p.propertyID)?.value
        }
    }
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
