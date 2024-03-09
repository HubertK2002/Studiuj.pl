function createElement(element, type) {
    const el = document.createElement(element, type);
    el.CreatedInJs = true;
    return el;
}

class TableNote extends HTMLDivElement {
    AkceptujTabele;
    DodajWiersz;
    DodajNaglowek;
    Tabela;
    Title;
    Input;
    constructor() {
        super();
    }
    connectedCallback() {
        console.log("TableNote");
       if(this.CreatedInJs) this.create();
       else window.addEventListener('DOMContentLoaded', () => {
        this.connect();
    });
    }

    create() {
        this.setAttribute("is", "table-note");
        this.Tabela = createElement("table","edit-table");
        this.DodajNaglowek = createElement("button", "dodaj-naglowek");
        this.DodajWiersz = createElement("button", "dodaj-wiersz");
        this.Input = document.createElement("input");
        this.ControlPanel = document.createElement("div");

        this.className = "notatka";
        this.appendChild(this.Tabela);  
        this.appendChild(this.ControlPanel);
        this.ControlPanel.appendChild(this.Input); 
        this.ControlPanel.appendChild(this.DodajNaglowek);
        this.ControlPanel.appendChild(this.DodajWiersz);     
    }

    connect() {
        this.Tabela = this.querySelector('table');
        this.DodajNaglowek = this.querySelector('button[is="dodaj-naglowek"]');
        this.DodajWiersz = this.querySelector('button[is="dodaj-wiersz"]');
        this.Input = this.querySelector('input');
    }

}

class EditTable extends HTMLTableElement {
    Head;
    Body;
    constructor() {
        super();

    }
    connectedCallback() {
        console.log("tabela");
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {
        this.Head = createElement("thead","table-head");
        this.Body = createElement("tbody","table-body");

        this.setAttribute("is", "edit-table");
        this.appendChild(this.Head);
        this.appendChild(this.Body);
    }
    connect() {
        console.log("Hello");
        this.Head = this.querySelector("thead");
        this.Body = this.querySelector("tbody");
    }
}
class TableHead extends HTMLTableSectionElement {
    Wiersz;
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
        this.Wiersz = createElement("tr");

        this.setAttribute("is", "table-head");
        this.appendChild(this.Wiersz);
    }
    connect() {
        this.Wiersz = this.querySelector("tr");
    }
}

class TableBody extends HTMLTableSectionElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.setAttribute("is", "table-body");
    }
}

class AkceptujTabele extends HTMLButtonElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if(this.CreatedInJs) this.create();
        
    }
    create() {
        this.setAttribute("is", "akceptuj-tabele");
        this.innerHTML = "Akceptuj Tabelę";
    }

}
class DodajWiersz extends HTMLButtonElement {
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
        this.setAttribute("is", "dodaj-wiersz");
        this.innerHTML = "Dodaj Wiersz";
        this.Table = this.closest('div[is="table-note"]').Tabela;
        console.log(this.Table);
        this.Wiersze = this.Table.Body;
        this.Headers = this.Table.Head.Wiersz;
        this.addEventListener("click", (event) => this.dodaj_wiersz(event));
    }

    connect() {
        this.Table = this.closest('div[is="table-note"]').Tabela;
        this.Wiersze = this.Table.Body;
        this.Headers = this.Table.Head.Wiersz;
        this.addEventListener("click", (event) => this.dodaj_wiersz(event));
    }

    dodaj_wiersz(event)
    {
        event.preventDefault();
        const tr = document.createElement("tr");
        for (const naglowek of this.Headers.children) {
            const td = createElement("td", "edit-cell");
            tr.appendChild(td);
        }
        this.Wiersze.appendChild(tr);
        
    }
}

class DodajNaglowek extends HTMLButtonElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log("Nagłówek");
        if(this.CreatedInJs) this.create();
        else window.addEventListener('DOMContentLoaded', () => {
            this.connect();
        });
    }
    create() {
        this.setAttribute("is", "dodaj-naglowek");
        this.Table = this.closest('div[is="table-note"]');
        this.Input = this.Table.Input;
        this.Headers = this.Table.Tabela.Head.Wiersz;
        this.innerText = "Dodaj nagłówek";
        this.addEventListener("click", (event) => this.dodaj_naglowek(event));
    }
    connect() {
        this.Table = this.closest('div[is="table-note"]');
        this.Input = this.Table.Input;
        console.log(this.Table);
        this.Headers = this.Table.Tabela.Head.Wiersz;
        this.addEventListener("click", (event) => this.dodaj_naglowek(event));
    }
    dodaj_naglowek(event)
    {
        event.preventDefault();  
        const td = document.createElement("td");
        const Title = document.createTextNode(this.Table.Input.value);
        this.Input.value = "";
        td.appendChild(Title);
        this.Headers.appendChild(td);
    }
}

class EditCell extends HTMLTableCellElement {
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
        this.Child = document.createElement("textarea");
        this.appendChild(this.Child);
        this.Child.addEventListener("focusout", () => this.finish(this.Child));
        this.addEventListener("click", () => this.edit());
    }
    connect() {
        const Child = this.children[0];
        if(Child.tagName == 'P')  this.addEventListener("click", () => this.edit());
        else Child.addEventListener("focusout", () => this.finish(Child));
    }
    edit()
    {
        if(this.children[0].nodeName == "TEXTAREA") return;
        let value = this.children[0].innerHTML;
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.addEventListener("focusout", () => this.finish(textarea));
        this.removeChild(this.firstChild);
        this.appendChild(textarea);
        this.className="edit";
        textarea.focus();
    }
    finish(textarea)
    {
        const p = document.createElement("p");
        p.innerHTML = textarea.value;
        this.removeChild(this.firstChild);
        this.appendChild(p);
        this.className="value";
    }
}

customElements.define("edit-cell", EditCell, {extends: 'td'});
customElements.define("dodaj-naglowek", DodajNaglowek, {extends: 'button'});
customElements.define("dodaj-wiersz", DodajWiersz, {extends: 'button'});
customElements.define("table-head", TableHead, {extends: 'thead'});
customElements.define("table-body", TableBody, {extends: 'tbody'});
customElements.define("edit-table", EditTable, {extends: 'table'});
customElements.define("table-note", TableNote, {extends: 'div'});
