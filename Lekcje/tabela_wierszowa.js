function createElement(element, type) {
    const el = document.createElement(element, type);
    el.CreatedInJs = true;
    return el;
}

class TableNote extends HTMLDivElement {
    constructor() {
        super();
        this.Tabela = createElement("table","edit-table");
        this.DodajNaglowek = createElement("button", "dodaj-naglowek");
        this.DodajWiersz = createElement("button", "dodaj-wiersz");
        this.Input = document.createElement("input");
        this.ControlPanel = document.createElement("div");
        this.Title = document.createElement("h2");
        const title = document.getElementById("nazwa_notatki").value;
        this.Title.innerText = title;
        this.Title.contentEditable = true;
    }
    connectedCallback() {
        this.setAttribute("is", "table-note");
        this.appendChild(this.Title);
        this.className = "notatka";
        this.appendChild(this.Tabela);  
        this.appendChild(this.ControlPanel);
        this.ControlPanel.appendChild(this.Input); 
        this.ControlPanel.appendChild(this.DodajNaglowek);
        this.ControlPanel.appendChild(this.DodajWiersz); 
    }

    getData() {
        return {
            'Table': {
                'Table': this.Tabela.getData(),
                'Title': this.Title.innerHTML
            }
        };
    }

}

class EditTable extends HTMLTableElement {
    constructor() {
        super();
        this.Head = createElement("thead","table-head");
        this.Body = createElement("tbody","table-body");
    }
    connectedCallback() {
        this.setAttribute("is", "edit-table");
        this.appendChild(this.Head);
        this.appendChild(this.Body);
    }

    getData() {
        return {
            'Head': this.Head.getData(),
            'Body': this.Body.getData()
        };
    }
}
class TableHead extends HTMLTableSectionElement {
    constructor() {
        super();
        this.Wiersz = createElement("tr");
    }
    connectedCallback() {
        this.setAttribute("is", "table-head");
        this.appendChild(this.Wiersz);
    }

    getData() {
        let data = Array();
        let tds = this.Wiersz.querySelectorAll("td");
        tds.forEach(element => {
            data.push(element.innerHTML);
        });
        return {
            'Headers': data,
            'Headers_count' : data.length
        }
    }
}

class TableBody extends HTMLTableSectionElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute("is", "table-body");
    }
    
    getData() {
        let RowsData = Array();
        let Rows = this.querySelectorAll("tr");
        Rows.forEach(Row => {
            let CellsData = Array();
            let Cells = Row.querySelectorAll("td");
            Cells.forEach(Cell => {
                CellsData.push(Cell.getValue());
            });
            RowsData.push(CellsData);
        });
        return  {
            'Rows': RowsData,
            'Rows_count': RowsData.length
        }
    }
}

class AkceptujTabele extends HTMLButtonElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.setAttribute("is", "akceptuj-tabele");
        this.innerHTML = "Akceptuj Tabelę";
    }

}
class DodajWiersz extends HTMLButtonElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.setAttribute("is", "dodaj-wiersz");
        this.innerHTML = "Dodaj Wiersz";
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
        this.setAttribute("is", "dodaj-naglowek");
        this.Table = this.closest('div[is="table-note"]');
        this.Input = this.Table.Input;
        this.Headers = this.Table.Tabela.Head.Wiersz;
        this.innerText = "Dodaj nagłówek";
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
        this.Child = document.createElement("textarea");
    }
    connectedCallback() {
        this.appendChild(this.Child);
        this.Child.addEventListener("focusout", () => this.finish(this.Child));
        this.addEventListener("click", () => this.edit());
    }

    getValue() {
        switch(this.className) {
            case 'edit':
                return this.querySelector("textarea").value;
            case 'value':
                return this.querySelector("p").innerHTML;
            default:
                return '';
        }
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
