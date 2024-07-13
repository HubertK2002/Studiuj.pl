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
<script src="notatki.js?v=7"></script>
<link rel="stylesheet" href="style.css?ver=10">
</head>
<body>
<script>
    const Zapisz = (event) => {
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
    if(isset($_POST['zapisz'])) {        
        print_r($_POST);
        $array = json_decode($_POST['NewData']);
        foreach($array as $id => $note) {
            Parser::ParseAndSaveData($note);
        }
        ?>
        <form id="redirectForm" method="post" action="lekcja.php">
        <input type="hidden" name="dzial" value="<?php echo $dzial?>" />
        <input type="hidden" name="lekcja" value="<?php echo $lekcja?>" />
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
