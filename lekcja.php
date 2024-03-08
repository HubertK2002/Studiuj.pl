<?php
require_once('db.php');
DB::Init();
$dzial = $_POST['dzial'];
$lekcja = $_POST['lekcja'];
$query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dzial'";
$result = db::exec($query);
if ($result && !mysqli_num_rows($result) > 0) {
   $query = "CREATE DATABASE `$dzial` CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;";
   db::exec($query);
}
else
{
    $query = "use `$dzial`";
    db::exec($query);
}
DB::Init_db($dzial);

DB::exec("CREATE table if not exists `$lekcja`(
    id int not null primary key AUTO_INCREMENT,
    pytanie text,
    rodzaj_pytania text,
    odpowiedz text
    );");

echo "<h2>$dzial</h2>";
echo "<h3>$lekcja</h4>";
echo "<br>";

?>
<html>
<head>
<script src="tabela_wierszowa.js?v=3"></script>
<script src="notatki.js?v=4"></script>
<script src="grupa.js?v=8" type="module"></script>
<link rel="stylesheet" href="style.css?ver=9">
</head>
<body>
<h1 id="msg"></h1>
<?php
    if(isset($_POST['zapisz'])) {
        //print_r($_POST['notatki']);
        foreach($_POST['notatki'] as $value) {
            DB::exec("insert into `$lekcja` (id, odpowiedz) values (null, '$value')");
        }
        ?>
        <form id="redirectForm" method="post" action="lekcja.php">
        <input type="hidden" name="dzial" value="<?php echo $dzial?>" />
        <input type="hidden" name="lekcja" value="<?php echo $lekcja?>" />
        <!-- Dodaj inne ukryte pola zgodnie z potrzebami -->
    </form>

    <script type="text/javascript">
        // Automatyczne przesłanie formularza po załadowaniu strony
        document.getElementById('redirectForm').submit();
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
        $lekcje = DB::exec("select * from `$lekcja`");
        while($row=mysqli_fetch_assoc($lekcje)): ?>
            <div class="notatka">
                <?php  echo $row['odpowiedz']; ?>
            </div>
            <?php
        endwhile
        ?>
    </div>

    <button>Zapisz</button>
</form>
<label class="custom-file-upload">
    <input type="file"/>
    Custom Upload
</label>
</body>
</html>