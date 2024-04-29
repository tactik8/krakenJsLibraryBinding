

export class KrBindingProperty {

    constructor(element) {

        this.id = String(crypto.randomUUID())
        this._element = element

    }


    // -----------------------------------------------------
    //  Comment 
    // -----------------------------------------------------

    init() {

        this.setKeys()
        this.initEventListeners()
    }


    setKeys(){
        if(this.propertyID=="heading1"){
            this.propertyID="name"
        }
        if(this.propertyID=="heading2"){
            this.propertyID="url"
        }
    }


    
    // ----------------------------------------------------------
    // Event listeners
    // ----------------------------------------------------------

    initEventListeners() {
        let t = this
        this._element.addEventListener("change", (event) => {
            t._thing.setProperty(propertyID, event.target.value)
        });
    }


    // ----------------------------------------------------------
    // ---------------- Element manipulations-- -----------------
    // ----------------------------------------------------------


    setEditable(){
        this._element.setAttribute('contenteditable', 'true')
    }

    
    get propertyID() {
        return this._element.getAttribute('data-propertyid')
    }

    set propertyID(value) {
        return this._element.setAttribute('data-propertyid', value)
    }

    get value() {
        if (this._element.value) {
            return this._element.value
        } else {
            return this._element.textContent
        }
    }

    set value(value) {
        if(this._element.tagName == 'IMG'){
            return this.setValueImage(value)
        } else {
            this.setValueText(value)
        }
        
    }



    setValueText(value){
        if (this._element.value) {
            this._element.value = value
        } else {
            this._element.textContent = value
        }
        
    }
    
    setValueImage(value){
        this._element.setAttribute('src', value)
    }

    
}


