
class Grupa extends HTMLElement
{
    constructor() {
        super();
        
        //this.className="Group";
        //this.appendChild(AddElementRect());
    }
    connectedCallback() {
        const sel = document.createElement("select","select-moj");
        this.appendChild(sel);
        const rect = document.createElement("rect-select");
        rect.Init123(sel);
        this.appendChild(rect);
        this.className = "select";
    }

}
class Select extends HTMLSelectElement
{
    constructor() {
        super();
    }
    connectedCallback() {
        //this.Select = document.createElement("select");
        const opt1 = document.createElement("option");
        opt1.value = "grupa";
        opt1.innerText = "Grupa";
        const opt2 = document.createElement("option");
        opt2.value = "image";
        opt2.innerText = "Image";
        this.options.add(opt1);
        this.options.add(opt2);
        this.className = "select";
        this.setAttribute("is", "select-moj");
    }
}
class Rect extends HTMLElement
{
    Select;
    constructor() {
        super();
        this.addEventListener("click", () => this.click());
    }
    connectedCallback() {
        const div = document.createElement("div");
        this.className = "AddElement";
        const p = document.createElement("p");
        p.innerHTML = "Dodaj nowy obiekt";
        div.appendChild(p);
        this.appendChild(div);
    }
    click()
    {
        console.log("Hello");
        console.log(this.Select);

        switch(this.Select.value) {
            case 'image':
                const image = document.createElement("group-image");
                this.parentElement.appendChild(image);
                break;
            case 'grupa':
                const grupa = document.createElement("grupa-select");
                this.parentElement.appendChild(grupa);
            default:
                console.log(this.Select.Select.value);
        }
       
    }

    Init123 = function (Sel) {
        this.Select = Sel;
        console.log(Sel);
    }
}

class ImageProperties extends HTMLElement {
    Image;
    constructor() {
        super();
        console.log("Prop");
    }
    connectedCallback() {
        console.log("Prop");
        const nazwa = document.createElement("input");
        nazwa.type = "text";
        nazwa.placeholder = "Podaj nazwę";
        this.appendChild(nazwa);
        this.style.display = "none";
        const button = document.createElement("button");
        button.innerText = "Zamknij";
        button.addEventListener("click", (event) => {
            event.preventDefault(); 
            this.style.display = "none";
        })
        this.appendChild(button);
    }
}

class Image extends HTMLElement
{
    Properties;
    constructor() {
        super();
    }
    connectedCallback() {
        const label = document.createElement("label");
        label.className = "custom-file-upload";
        const input = document.createElement("input");
        input.type="file";
        input.addEventListener('change', (event) => this.fileChange(event,label));
        label.addEventListener('dragenter', (event) => this.dragstart(label));
        label.addEventListener('dragleave', (event) => this.dragleave(label));
        label.addEventListener('drop', (event) => this.drop(event, label), false);
        label.addEventListener('dragover', (event) => {event.preventDefault();}, false);
        label.addEventListener('click', (event) => this.click(event));
        this.className = "AddElement";
        label.appendChild(input);
        const p = document.createElement("p");
        p.innerText = "Wybierz plik"
        label.appendChild(p);
        //label.textContent = "Wybierz plik";
        this.appendChild(label);
        this.Properties = document.createElement("image-properties");
        this.appendChild(this.Properties);
    }

    click(event) {
        this.Properties.style.display = "flex";
        event.preventDefault();
    }

    dragstart(label) {
        console.log("drag");
        label.classList.add("dragging");
    }
    dragleave(label) {
        console.log("leave");
        label.classList.remove("dragging");
    }
    drop(e, label) {
        console.log("drop");
        e.preventDefault();
        e.stopPropagation();
        this.dragleave(label);
        let dt = e.dataTransfer;
        let file = dt.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                label.style.backgroundImage = `url('${e.target.result}')`;
            };
    
            reader.readAsDataURL(file);
          } else {
            alert('Please select a valid image file.');
            //fileInput.value = ''; // Clear the input to allow selecting the same file again
          }
        
    }

    fileChange(event, destination) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                destination.style.backgroundImage = `url('${e.target.result}')`;
            };
    
            reader.readAsDataURL(file);
          } else {
            alert('Please select a valid image file.');
            fileInput.value = ''; // Clear the input to allow selecting the same file again
          }
    }
    
}


customElements.define("select-moj", Select,{
    extends: 'select'
  });
customElements.define("rect-select", Rect);
customElements.define("group-image", Image);
customElements.define("image-properties", ImageProperties);
customElements.define("grupa-select", Grupa);
