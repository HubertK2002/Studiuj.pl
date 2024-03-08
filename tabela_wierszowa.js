function dodaj_naglowek(name, event)
{
    const para = document.createElement("td");
    
    event.preventDefault();
    //alert();
    const text = document.querySelector('[name="naglowek"][id="' + name  +'"]');
    const node = document.createTextNode(text.value);
    text.value = "";
    para.appendChild(node);
    const element = document.querySelector('[name="headers"][id="' + name  +'"]');
    console.log(element);
    element.appendChild(para);
    
    //alert();
}

function edit(td, name)
{
    console.log(td);
    if(td.children[0].nodeName == "TEXTAREA") return;
    let value = td.children[0].innerHTML;
    const textarea = document.createElement("textarea");
    textarea.id = name;
    textarea.name = "komorka_tabeli";
    textarea.value = value;
    td.removeChild(td.firstChild);
    td.appendChild(textarea);
    td.className="edit";
    textarea.focus();
}

function dodaj_wiersz(name, event)
{
    event.preventDefault();
    const wiersze = document.querySelector('[name="wiersze"][id="' + name  +'"]');
    const naglowki = document.querySelector('[name="headers"][id="' + name  +'"]');
    console.log(wiersze);
    console.log(naglowki);
    const tr = document.createElement("tr");
    for (const naglowek of naglowki.children) {
        const td = document.createElement("td");
        td.onclick = () => edit(td, name);
        td.className="edit";
        const textarea = document.createElement("textarea");
        textarea.name = "komorka_tabeli";
        textarea.id = name;
        td.appendChild(textarea);
        tr.appendChild(td);
      }
      wiersze.appendChild(tr);
      //wiersze.appendChild(tr);
     
}

function akceptuj_tabele(name, pojemnik, event)
{
    event.preventDefault();
    const komorki_tabeli = document.querySelectorAll('[name="komorka_tabeli"][id="' + name  +'"]');
    let pary = Array();
    for(const komorka of komorki_tabeli)
    {
        pary.push(Array(komorka.value,komorka.parentElement));
    }
    for(const para of pary)
    {
        const p = document.createElement("p");
        p.innerHTML = para[0];
        para[1].removeChild(para[1].firstChild);
        para[1].appendChild(p);
        para[1].className="value";
        console.log(para);
    }

    const elements = document.querySelectorAll('[name="notatki[]"][id="' + name  +'"]');
    elements[0].value = pojemnik.innerHTML;
    
}