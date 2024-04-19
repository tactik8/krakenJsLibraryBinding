

//import { KrThing } from 'https://cdn.jsdelivr.net/gh/tactik8/kraken_thing_js@main/kraken_thing/kraken_thing.js';

import { KrThing } from 'https://9b151f20-abe6-46a1-a11b-440cbf46d2fd-00-3oaccd0kszaii.riker.replit.dev/kraken_thing/kraken_thing.js'


import { KrBinding, krakenBinding } from './kraken_binding/kraken_binding.js'


let thing = new KrThing();
let element = document.getElementById('test')

let binding = new KrBinding(element, thing)


console.log(binding)

thing.addProperty('name', 'bob')
