console['log']('Glide\x20DNR\x20'+'Item\x20v1.0');const properties=['toolbar','measure','toolbar-pl'+'acement','actions'];class GlideDNRItem extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'els',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['init']=this['init']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x2cd766,_0x65a4a2,_0x3dec62){if(_0x65a4a2===_0x3dec62)return;}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<sl'+'ot></slot>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20:host\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20display:'+'\x20inline-bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-block;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fl'+'ex-shrink:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20user-s'+'elect:\x20non'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20auto;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x200p'+'x\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20';}['init'](){const _0x2e6ca6=document['createElem'+'ent']('template');_0x2e6ca6['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x2e6ca6['content']),this['onceBindin'+'gs']();}['onceBindin'+'gs'](){const _0x2d92be=this['shadowRoot'];if(_0x2d92be===null)return;const _0x364478=_0x2d92be['querySelec'+'tor']('.glide-dnr'+'_item');_0x364478!==undefined&&(this['els']['container']=_0x364478);}}customElements['define']('glide-dnr-'+'item',GlideDNRItem);export{GlideDNRItem as default};