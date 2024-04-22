class Definicja extends HTMLDivElement {
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
        const title = document.getElementById("nazwa_notatki").value;
        this.Title = document.createElement("h2");
        this.Title.innerText = title;
        this.Title.contentEditable = true;
        this.appendChild(this.Title);
        this.TextArea = document.createElement("pre");
        this.TextArea.contentEditable = true;
        this.TextArea.classList += "editable";
        this.TextArea.addEventListener("keydown", (event) => this.DefinicjaKeyDown(event));
        this.TextArea.addEventListener("input", () => this.DefinicjaOnInput());
        this.appendChild(this.TextArea);
        
    }

    connect() {
        this.TextArea = this.querySelector("pre");
        this.TextArea.addEventListener("keydown", (event) => this.DefinicjaKeyDown(event));
        this.TextArea.addEventListener("input", () => this.DefinicjaOnInput());
        this.Title = this.querySelector("h2");
    }

    getData() {
        return {
            'Definition': {
            'Title': this.Title.innerText,
            'Definition': this.TextArea.innerText
            }
        };
    }

    DefinicjaClick(name)
    {
        textarea.id = name;
        textarea.value = definicja.innerHTML;
        textarea.addEventListener("focusout", (event) => DefinicjaFocusOut(name));
        const style = definicja.style
        textarea.style['width'] = style['width'];
        textarea.style['height'] = style['height'];
        textarea.addEventListener("keydown", (e) => DefinicjaKeyDown(name, e));
        textarea.addEventListener("oninput", (event) => DefinicjaOnInput(textarea));
        definicja.replaceWith(textarea);
        textarea.focus();
    }

    DefinicjaKeyDown(e)
    {
        if (e.key === 'Tab') {
            e.preventDefault();

            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            var offset = range.startOffset;

            let node = document.createTextNode("\t");
            range.insertNode(node);
            range.setStart(node, 1);
            //var cursorPosition = getCaretPosition();
            //insertTextAtCursor("    "); // Wstawia cztery spacje (lub inny odpowiednią ilość)
            //setCaretPosition(cursorPosition + 4, element);
        }
    }

    getCaretPosition() {
        var sel = window.getSelection();
        if (sel.rangeCount) {
        var range = sel.getRangeAt(0);
        return range.startOffset;
        }
        return 0;
    }

    setCaretPosition(position, node) {
        var range = document.createRange();
        var sel = window.getSelection();
        //var node = document.getElementById("editableDiv");
        if (node.childNodes.length > 0) {
        range.setStart(node.childNodes[0], Math.min(position, node.childNodes[0].length));
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        }
    }

    insertTextAtCursor(text) {
        var sel, range, node;
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        node = document.createTextNode(text);
        range.insertNode(node);
        }
    }

    DefinicjaOnInput()
    {
        let height = this.TextArea.style.height;
        height += this.TextArea.scrollHeight;
        this.TextArea.style.height = "5px";
        this.TextArea.style.height = (this.TextArea.scrollHeight + 5) + "px";
    }
}

customElements.define("definicja-editable", Definicja, {extends: 'div'});