<body>
<?php
require_once('db.php');
DB::Init_db('Zajecia');
$dzial = $_POST['dzial'];
echo $dzial;
    $create_dzial = "CREATE TABLE if not exists `$dzial` (
        nazwa varchar(20) not null primary key COLLATE utf8mb4_polish_ci
        );";
    DB::exec($create_dzial);
    if(isset($_POST['lekcja']))
    {
        DB::exec("insert into `$dzial` values ('{$_POST['lekcja']}');");
    }
    ?>
    <form action="dzial.php" method="POST">
        <input type="hidden"  name="dzial" value="<?php echo $dzial?>"/>
Dodaj lekcję: <input type="text" name="lekcja"/>
<input type="submit" value="dodaj"/>

    </form>
    <?php
    $lekcje = DB::exec("select * from `$dzial`");
    while($row=mysqli_fetch_assoc($lekcje)): ?>
        <form action="lekcja.php" method="POST">
            <input type="hidden" name="lekcja" value="<?php echo $row['nazwa'] ?>">
            <input type="hidden"  name="dzial" value="<?php echo $dzial?>"/>
            <input type="submit" value="<?php echo $row['nazwa']?>">
        </form>
        <?php
    endwhile

?>
</body>