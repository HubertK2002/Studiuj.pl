
function DodajNotatke()
{
    const name = document.getElementById("nazwa_notatki").value;
    const rodzaj = document.getElementById("rodzaj_notatki").value;
    const notatki = document.getElementById("notatki");
    const pojemnik = document.createElement("div");
    const msg = document.getElementById("msg");
    const inputs = document.getElementById("inputs");
    const new_input = document.createElement("input");
    new_input.type = "hidden";
    new_input.name = "notatki[]";
    new_input.id = name;
    const elementsWithName = document.querySelectorAll('[name="notatki[]"][id="' + name  +'"]');
    console.log(elementsWithName);
    if(elementsWithName.length != 0) {
        msg.innerText = "Błąd. Już istnieje element o takiej nazwie";
        return;
    }
    pojemnik.className = "notatka";
    //inputs.appendChild(new_input);
    console.log(inputs);
    const title = document.createElement("h2");
    title.innerHTML = name;
    pojemnik.appendChild(title); 
    console.log(pojemnik);
    switch(rodzaj)
    {
        case 'tabela wierszowa':
            const TableNote = document.createElement("div", "table-note");
            TableNote.CreatedInJs = true;
            notatki.appendChild(TableNote);
            /*const input = document.createElement("input");
            input.type = "text";
            input.id = name;
            input.setAttribute("name","naglowek");
            pojemnik.appendChild(input);

            //PRZYCISKI
            const naglowek = document.createElement("button");
            naglowek.innerHTML =
            naglowek.onclick = (event) => dodaj_naglowek(name, event);
            pojemnik.appendChild(naglowek);
            const wiersz = document.createElement("button");
            wiersz.innerHTML ="Dodaj wiersz";
            wiersz.onclick = (event) => dodaj_wiersz(name, event);
            pojemnik.appendChild(wiersz);


            //TABELA
            const table = document.createElement("table");
            table.name="tabela";
            table.style="margin-top:5px;";
            const thead = document.createElement("thead");
            const tr = document.createElement("tr");
            tr.setAttribute("name","headers");
            tr.id=name;
            thead.appendChild(tr);
            table.appendChild(thead);
            const tbody = document.createElement("tbody");
            tbody.setAttribute("name","wiersze");
            tbody.id=name;
            table.appendChild(tbody);
            pojemnik.appendChild(table);

            const akceptuj = document.createElement("button");
            akceptuj.innerHTML ="Akceptuj tabelę";
            akceptuj.onclick = (event) => akceptuj_tabele(name, pojemnik, event);
            pojemnik.appendChild(akceptuj);*/

            break;
        case 'definicja':
            const textarea = document.createElement("pre");
            textarea.id = name;
            textarea.contentEditable = true;
            textarea.classList += "editable";
            //textarea.addEventListener("focusout", (event) => DefinicjaFocusOut(name));
            textarea.addEventListener("keydown", (event) => DefinicjaKeyDown(textarea, event));
            textarea.addEventListener("focusout", () => ZapiszNotatke(pojemnik, name));
            //textarea.addEventListener("input", (event) => DefinicjaOnInput(textarea));
            pojemnik.appendChild(textarea);
            break;
          case 'grupa':
            console.log("grupa");
            const grupa = document.createElement("grupa-select");
            pojemnik.appendChild(grupa);
    }
    //notatki.appendChild(pojemnik);
    new_input.value = pojemnik.innerHTML;
    window.scrollTo(0, document.body.scrollHeight);
    
}

function ZapiszNotatke(pojemnik, name) {
    const elements = document.querySelectorAll('[name="notatki[]"][id="' + name  +'"]');
    elements[0].value = pojemnik.innerHTML;
}

function DefinicjaFocusOut(name)
{
    /*const definicja = document.getElementById(name);
    const p = document.createElement("pre");
    p.id = name;
    p.innerHTML = definicja.value;
    p.onclick = () => DefinicjaClick(name);
    const style = definicja.style
    p.style['width'] = style['width'];
    p.style['height'] = style['height'];
    definicja.replaceWith(p)*/

}
function DefinicjaClick(name)
{
    const definicja = document.getElementById(name);
    const textarea = document.createElement("textarea");
    textarea.id = name;
    textarea.value = definicja.innerHTML;
    textarea.addEventListener("focusout", (event) => DefinicjaFocusOut(name));
    const style = definicja.style
    textarea.style['width'] = style['width'];
    textarea.style['height'] = style['height'];
    console.log("test1");
    textarea.addEventListener("keydown", (e) => DefinicjaKeyDown(name, e));
    console.log("test1");
    textarea.addEventListener("oninput", (event) => DefinicjaOnInput(textarea));
    definicja.replaceWith(textarea);
    textarea.focus();
}

function DefinicjaKeyDown(element, e)
{
    const definicja = document.getElementById(name);
    if (e.key === 'Tab') {
        e.preventDefault();

        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var offset = range.startOffset;

        node = document.createTextNode("\t");
        range.insertNode(node);
        range.setStart(node, 1);
        //var cursorPosition = getCaretPosition();
        //insertTextAtCursor("    "); // Wstawia cztery spacje (lub inny odpowiednią ilość)
        //setCaretPosition(cursorPosition + 4, element);
    }
}

function getCaretPosition() {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0);
      return range.startOffset;
    }
    return 0;
  }

  function setCaretPosition(position, node) {
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

  function insertTextAtCursor(text) {
    var sel, range, node;
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      node = document.createTextNode(text);
      range.insertNode(node);
    }
  }

function DefinicjaOnInput(element)
{
    console.log("test");
    console.log(element.scrollHeight);
    let height = element.style.height;
    height += element.scrollHeight;
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 5) + "px";
}

function Zapisz() {
  const notatki = document.getElementById("notatki");
  const inputs = document.getElementById("inputs");
  const new_input = document.createElement("input");
    new_input.type = "hidden";
    new_input.name = "notatki";
    new_input.value = notatki.innerHTML;
    inputs.appendChild(new_input);
}