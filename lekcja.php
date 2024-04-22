<?php
require_once('db.php');
require_once("lesson.php");

$dzial = $_POST['dzial'];
$lekcja = $_POST['lekcja'];
$lesson = new lesson($dzial, $lekcja);
$lesson->print_title();
?>

<html>
<head>
<script src="tabela_wierszowa.js"></script>
<script src="grupa.js?v=9"></script>
<script src="notatki.js?v=7" type="module" defer></script>
<link rel="stylesheet" href="style.css?ver=10">
</head>
<body>
<script type="module">
    console.log("Hello");
    import {DodajNotatke} from  './notatki.js';
    console.log(DodajNotatke);
    window.DodajNotatke = () => {
        DodajNotatke();
    }
    window.Zapisz = (event) => {
        //event.preventDefault();
        //console.log("Hello");
        const notatki = document.querySelectorAll("[new]");
        let NewData = Array();
        for(let item of notatki)
        {
            NewData.push(item.getData());
        }
        let NewDataString = JSON.stringify(NewData);
        const input = document.createElement("input");
        input.type="hidden";
        input.name="NewData";
        input.value=NewDataString;
        document.querySelector("form").appendChild(input);    
    }
</script>
<h1 id="msg"></h1>
<?php

    function parseNote($note) {
        //print_r($note);
        //echo $note->Grupa->Title . "<br><br>";
        $obj = ( get_object_vars($note));
        $type = array_keys($obj)[0];
        $data = $note->$type;
        switch($type) {
            case 'Grupa':
                $sql = "insert into struktury values (null, '{$data->Title}', 'Grupa', '{$_POST['lekcja']}')";
                $structure_id = DB::exec($sql);
                $ids = array();
                echo $sql;
                foreach($data->Children as $child) {
                   $ids []= parseNote($child);
                }
                foreach ($ids as $id) {
                
                    $sql = "insert into grupy values (null, {$id['id']}, '{$id['type']}', $structure_id, '{$_POST['lekcja']}')";
                    DB::exec($sql);
                }
                break;
            case 'Image':
                    //echo "<img src='$data->Image'>";
                    $dir = "images/{$_POST['dzial']}/{$_POST['lekcja']}";
                    if (!is_dir($dir)) {
                        // dir doesn't exist, make it
                        mkdir($dir, 0777, true);
                      }
                    $sql = "insert into images values (null, '{$data->Title}','{$_POST['lekcja']}')";
                    $image = array();
                    $image_id = DB::exec($sql);
                    $image['id'] = $image_id;
                    $image['type'] = "Image";
                    file_put_contents("$dir/$image_id.png",$data->Image);
                    echo $data->Title;
                    return $image;
                break;
                default:
                echo $type;
            
        }
    }
    if(isset($_POST['zapisz'])) {
        //$value = $_POST['notatki'];
        
        $array = json_decode($_POST['NewData']);
        //if(count($_POST['NewData']) == 1) parseNote($_POST[])
        foreach($array as $id => $note) {
            parseNote($note);
            //echo $data;
        }
       // print_r($_POST['NewData']);
        //print_r($_POST['notatki']);
        //foreach($_POST['notatki'] as $value) {
          //  DB::exec("insert into `$lekcja` (id, odpowiedz) values (null, '$value')");
        //}
        //DB::exec("delete from `$lekcja`");
        //DB::exec("insert into `$lekcja` (id, odpowiedz) values (null, '$value')")
        ?>
        <form id="redirectForm" method="post" action="lekcja.php">
        <input type="hidden" name="dzial" value="<?php echo $dzial?>" />
        <input type="hidden" name="lekcja" value="<?php echo $lekcja?>" />
        <!-- Dodaj inne ukryte pola zgodnie z potrzebami -->
    </form>

    <script type="text/javascript">
        // Automatyczne przesłanie formularza po załadowaniu strony
        //document.getElementById('redirectForm').submit();
    </script>
    <?php
    }
?>

<div id="wybor">
Wybierz rodzaj notatki
    <select id="rodzaj_notatki">
        <option value="definicja">Definicja</option>
        <option value="tabela wierszowa">Tabela wierszowa</option>
        <option value="lista">Lista</option>
        <option value="grupa">Grupa</option>
    </select><br><br>
    Nazwa notatki: <input type="text" id="nazwa_notatki">
    <input type="submit" onclick="DodajNotatke();"/><br><br>
</div>
<form action="lekcja.php" method="POST">
    <input type="hidden" value="<?php echo $dzial?>" name="dzial"/>
    <input type="hidden" value="<?php echo $lekcja?>" name="lekcja"/>
    <input type="hidden" value="1" name="zapisz"/>
    <div id="inputs">

    </div>
    <div id="notatki">
        <?php
            Parser::DownloadData($dzial,$lekcja);
        ?>
    </div>

    <button onclick="Zapisz(event)">Zapisz</button>
</form>
</body>
</html>
