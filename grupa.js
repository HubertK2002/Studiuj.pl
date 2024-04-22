
function createElement(element) {
    const el = document.createElement(element);
    el.CreatedInJs = true;
    return el;
}

function createElement(element, type) {
    const el = document.createElement(element, type);
    el.CreatedInJs = true;
    return el;
}

class Grupa extends HTMLElement
{
    Type = "Grupa";
    constructor() {
        super();
    }
    connectedCallback() {
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {
        const sel = createElement("select","select-moj");
        this.appendChild(sel);
        const title = document.getElementById("nazwa_notatki").value;
        this.Title = document.createElement("h2");
        this.Title.innerText = title;
        this.Title.contentEditable = true;
        this.appendChild(this.Title);
        const rect = createElement("rect-select");
        rect.Init123(sel);
        this.appendChild(rect);
        this.className = "select";
    }
    connect() {
        this.Sel = this.querySelector("select[is='select-moj']");
        this.Rect = this.querySelector("rect-select");
        this.Rect.Init123(this.Sel);
        this.Title = this.querySelector("h2");
    }
    getData() {
        return {
            'Grupa': {
                'Title': this.Title.innerText,
                'Children': this.getChildrenData()
            }
        };
    }
    getChildrenData() {
        let Children = this.children;
        let ChildrenData = Array();
        for(let child of Children) {
            if(!child.hasOwnProperty("Type") || child.Type == "Select" || child.Type == "Rect") {
                continue;
            }
            ChildrenData.push(child.getData());
        }
        return ChildrenData;
    }
}
class Select extends HTMLSelectElement
{
    Type = "Select";
    constructor() {
        super();
    }
    connectedCallback() {
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {
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
    connect() {

    }
}
class Rect extends HTMLElement
{
    Select;
    Type="Rect";
    constructor() {
        super();
        this.addEventListener("click", () => this.click());
    }
    connectedCallback() {
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {
        const div = document.createElement("div");
        this.className = "AddElement";
        const p = document.createElement("p");
        p.innerHTML = "Dodaj nowy obiekt";
        div.appendChild(p);
        this.appendChild(div);
    }
    connect() {
        //this.Select = this.closest("select");
    }
    click()
    {
        switch(this.Select.value) {
            case 'image':
                const image = createElement("group-image");
                this.parentElement.appendChild(image);
                break;
            case 'grupa':
                const grupa = createElement("grupa-select");
                this.parentElement.appendChild(grupa);
                break;
            default:
        }
       
    }

    Init123 = function (Sel) {
        this.Select = Sel;
    }
}

class ImageProperties extends HTMLElement {
    Image;
    constructor() {
        super();
        this.Nazwa = document.createElement("input");
        this.Nazwa.type = "text";
        this.Nazwa.placeholder = "Podaj nazwę";
    }
    connectedCallback() {
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {      
        this.appendChild(this.Nazwa);
        this.style.display = "none";
        const button = document.createElement("button");
        button.innerText = "Zamknij";
        button.name = "zamknij";
        button.addEventListener("click", (event) => {
            event.preventDefault(); 
            this.style.display = "none";
        })
        this.appendChild(button);
    }
    connect() {
        this.Zamknij = this.querySelector("button[name='zamknij']");
        this.Zamknij.addEventListener("click", (event) => {
            event.preventDefault(); 
            this.style.display = "none";
        })
    }
    setTitle(title) {
        
    }
}

class Image extends HTMLElement
{
    Properties;
    Type = "Image";
    constructor() {
        super();
        this.Label = createElement("label","file-label");
        this.Properties = createElement("image-properties");
       
    }
    connectedCallback() {
        this.className = "AddElement";
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {  
        this.appendChild(this.Label);
        this.appendChild(this.Properties);
    }
    connect() {
        this.Label = this.querySelector("label");
        this.Label.addEventListener('dragenter', (event) => this.dragstart(this.Label));
        this.Label.addEventListener('dragleave', (event) => this.dragleave(this.Label));
        this.Label.addEventListener('drop', (event) => this.drop(event, this.Label), false);
        this.Label.addEventListener('dragover', (event) => {event.preventDefault();}, false);
        this.Label.addEventListener('click', (event) => this.click(event));
        this.Input = this.querySelector("input");
        this.Input.addEventListener('change', (event) => this.fileChange(event,this.Label));
        this.Properties = this.querySelector("image-properties");
    }

    getData() {
        return {
            'Image': {
                'Image': this.getImage(),
                'Title': 'Testowy tytuł'
            }
        };
    }

    getImage() {
        const img = /"(.*?)"/
        if(this.Label.style != "undefined") {
            return this.Label.style.backgroundImage != '' ?
            this.Label.style.backgroundImage.match(img)[1] : '';
        }
        return '';
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


class FileLabel extends HTMLLabelElement {
    constructor() {
        super();

        this.addEventListener('dragenter', (event) => this.dragstart(label));
        this.addEventListener('dragleave', (event) => this.dragleave(label));
        this.addEventListener('drop', (event) => this.drop(event, label), false);
        this.addEventListener('dragover', (event) => {event.preventDefault();}, false);
        this.addEventListener('click', (event) => this.click(event));
        this.className = "custom-file-upload";
        this.Input = createElement("input","file-input");
        this.Note = document.createElement("p");
        this.Note.innerText = "Wybierz plik";
    }

    connectedCallback() {
        this.appendChild(this.Input);
        this.appendChild(this.Note);
    }

    click(event) {
        this.parentElement.Properties.style.display = "flex";
        event.preventDefault();
    }
    dragstart() {
        this.classList.add("dragging");
    }
    dragleave() {
        this.classList.remove("dragging");
    }
    drop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dragleave();
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
}

class FileInput extends HTMLInputElement {
    constructor() {
        super();
        this.type="file";
    }

    connectedCallback() {

    }
}


customElements.define("select-moj", Select,{
    extends: 'select'
  });
customElements.define("rect-select", Rect);
customElements.define("group-image", Image);
customElements.define("image-properties", ImageProperties);
customElements.define("grupa-select", Grupa);
customElements.define("file-label", FileLabel, {
    extends: 'label'
});
customElements.define("file-input", FileInput, {
    extends: 'input'
})
