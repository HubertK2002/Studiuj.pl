import * as myImport from '/studia/definicja.js';
//import * as ta from '/studia/tabela_wierszowa.js';

export function DodajNotatke()
{
    const rodzaj = document.getElementById("rodzaj_notatki").value;
    switch(rodzaj)
    {
        case 'tabela wierszowa':
            const TableNote = document.createElement("div", "table-note");
            TableNote.CreatedInJs = true;
            notatki.appendChild(TableNote);
            break;
        case 'definicja':
          console.log("It's me");
            const Definicja = document.createElement("div", "definicja-editable");
            Definicja.CreatedInJs = true;
            notatki.appendChild(Definicja);
            console.log("It's me2");
            break;
          case 'grupa':
            console.log("grupa");
            const grupa = document.createElement("grupa-select");
            pojemnik.appendChild(grupa);
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
