
function DodajNotatke()
{
    const rodzaj = document.getElementById("rodzaj_notatki").value;
    switch(rodzaj)
    {
        case 'tabela wierszowa':
            const TableNote = document.createElement("div", "table-note");
            TableNote.CreatedInJs = true;
            TableNote.setAttribute("new", "");
            TableNote.setAttribute("root", "");
            notatki.appendChild(TableNote);
            break;
        case 'definicja':
            const Definicja = document.createElement("div", "definicja-editable");
            Definicja.CreatedInJs = true;
            Definicja.setAttribute("new", "");
            Definicja.setAttribute("root", "");
            notatki.appendChild(Definicja);
            break;
          case 'grupa':
            console.log("grupa");
            const grupa = createElement("grupa-select");
            grupa.CreatedInJs = true;
            grupa.setAttribute("new","");
            grupa.setAttribute("root", "");
            notatki.appendChild(grupa);
    }
    //notatki.appendChild(pojemnik);
    window.scrollTo(0, document.body.scrollHeight);
    
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
