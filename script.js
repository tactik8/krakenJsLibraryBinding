


import { KrThing } from 'https://tactik8.github.io/kraken_thing_js/kraken_thing/kraken_thing.js'
import { kraken_bootstrap } from 'https://tactik8.github.io/krakenJsBootstrap/kraken_bootstrap/kraken_bootstrap.js'

import { KrBinding, krakenBinding } from './kraken_binding/kraken_binding.js'


let thing = new KrThing('Thing');


thing.setProperty('name', 'bob')
thing.setProperty('url', 'https')

let card1 = thing.html_cardVertical()

card1.innerHTML = card1.innerHTML.replace('heading1', 'name')
card1.innerHTML = card1.innerHTML.replace('heading2', 'url')
let div3 = document.getElementById('test3')
let binding1 = new KrBinding(card1, thing)

console.log(binding1.getPropertyElements())

for(let p of binding1.getPropertyElements()){

    p.setAttribute('contenteditable', 'true')
    
}

div3.appendChild(card1)


let card2 = thing.html_cardVertical()
card2.innerHTML = card1.innerHTML.replace('heading1', 'name')
card2.innerHTML = card1.innerHTML.replace('heading2', 'url')
let div4 = document.getElementById('test4')
let binding2 = new KrBinding(card2, thing)

div4.appendChild(card2)





function card_vertical(image_url='', heading1='', text='', other=''){

    let part_element = document.createElement('div');

    let content =  `
        <div class="card krThing" style="width: 18rem;">
          <img src="${image_url}" class="card-img-top krProperty" alt="" data-propertyID="image">
          <div class="card-body">
            <h5 class="card-title krProperty" data-propertyID="heading1">${String(heading1)}</h5>
            <p class="card-text krProperty" data-propertyID="heading2">${String(text)}</p>
            <span class="card-other krProperty" data-propertyID="description">${String(other)}</span>
          </div>
        </div>`;


    part_element.innerHTML = content;

    return part_element;

}



