# kraken_bindings
Library to bind html element with kraken_thing objects (2 way).

When a value is updated in thing, element gets updated and vice-versa.

## How to use


```
import { KrBinding, krakenBinding } from 'https://cdn.jsdelivr.net/gh/tactik8/krakenJsLibraryBinding@main/kraken_binding/kraken_binding.js'

```


Set classname #krThing to any block representing a thing object.

Set data-propertyID to designate the property being showned. 

```
<div class="krThing">

    <div class="krProperty" data-propertyID="name">
        Peter
    </div>

</div>

import { KrThing } from 'https://9b151f20-abe6-46a1-a11b-440cbf46d2fd-00-3oaccd0kszaii.riker.replit.dev/kraken_thing/kraken_thing.js'


let thing = new KrThing();
let element = document.getElementById('test')

let binding = new KrBinding(element, thing)

thing.addProperty('name', 'bob')


```