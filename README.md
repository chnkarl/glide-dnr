GlideDNR(drag-and-resize)
---

An extremely smooth drag-and-resize JavaScript plugin for creators. GlideDNR is written with [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), which is natively supports any framework (vue, react……), especially original html and js.

![cover](./cover_v1.2.png)

### Demo
The [Demo](https://chnkarl.github.io/glide-dnr/storyboard.html) show how the plugin works.

### Install
```
npm i glide-dnr
```

### Usage

#### Step 1
import Glide DNR
```
import GlideDNR from "./GlideDNR.js"
import GlideDNRItem from "./GlideDNRItem.js"
```

#### Step 2
```
<glide-dnr id="glide-dnr" toolbar measure toolbar-placement="float">
  # image element
  # you can set type attribute as image, to resize image element smoothly without stuck occasionally.
  <glide-dnr-item 
    type="image" 
    id="id-001" 
    width="120" 
    left="240" 
    top="100"
  >
    <img src="./assets/images/v1/illustrations/Hamster.png" />
  </glide-dnr-item>

  # other element
  <glide-dnr-item 
    id="id-004" 
    left="250" 
    top="280" 
    style="
    font-size: 70px; 
    font-weight: 700;
    background: linear-gradient(90deg, red, orange); 
    -webkit-background-clip: text; 
    background-clip: text; 
    -webkit-text-fill-color: transparent;color: red;"
  >
  Glide DNR
  </glide-dnr-item>
</glide-dnr>
```

### Methods

#### onSelect
```
const GlideDNR = document.querySelector("#glide-dnr")

GlideDNR.addEventListener("onSelect", (e) => {
  console.log("e.detail: ", e.detail)
})
```

#### onChange
```
const GlideDNR = document.querySelector("#glide-dnr")

GlideDNR.addEventListener("onChange", (e) => {
  console.log("e.detail: ", e.detail)
})
```

### Advanced Usage

#### update content of Glide-dnr-item

##### update general item
```
const elSetContent = document.getElementById("set_content")

if (elSetContent !== null) {
  elSetContent.addEventListener("input", (e) => {
    const elSelected = document.querySelector(`#${selectedId}`)

    if (elSelected !== null) {

      # update
      elSelected.innerText = e.target.value

      # this is a inner method of GlideDNR which need to be used after the element content is updated.
      elButterBoard.renderItem(elSelected)
    }
  })
}
```

##### update image item
```
#form-image-01 is a button，which is used to update image src attribute.
const elSetUpload01 = document.getElementById("form-image-01")

if (elSetUpload01 !== null) {

  elSetUpload01.addEventListener("click", (e) => {

    if (selectedId !== "") {

      const elSelected = document.querySelector(`#${selectedId}`)

      if (elSelected !== null) {
        const htmlString = `
          <img src="./assets/images/v1/illustrations/Diagram.png" />
        `

        # update
        elSelected.innerHTML = htmlString

        # this is a inner method of GlideDNR which need to be used after the element content is updated.
        elButterBoard.renderImageItem(elSelected)
      }
    }
  })
}
```