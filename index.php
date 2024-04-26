<?php 
require_once('db.php');

?>
<body>
    <p>Lekcje</p>
    <?php 
        db::Init();

        $dbname = "Zajecia";
        $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
        $result = db::sql_row($query);
        if ($result && !mysqli_num_rows($result) > 0) {
           $query = "CREATE DATABASE Zajecia CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;";
           db::exec($query);
        }
        else
        {
            $query = "use Zajecia";
            db::exec($query);
        }
        $query = "CREATE TABLE IF NOT EXISTS zajecia (
            nazwa VARCHAR(20) COLLATE utf8mb4_polish_ci PRIMARY KEY NOT NULL
        );";
         db::exec($query);
         if(isset($_POST['zajecie']))
         {
             DB::exec("insert into zajecia values ('{$_POST['zajecie']}');");
         }
        $query = "Select nazwa from zajecia";
        $result =  db::sql_row($query);
        while($row=mysqli_fetch_assoc($result)): ?>
            <form action="dzial.php" method="POST">
                <input type="hidden" name="dzial" value="<?php echo $row['nazwa'] ?>">
                <input type="submit" value="<?php echo $row['nazwa']?>">
            </form>
            <?php
        endwhile
    ?>
     <form action="index.php" method="POST">
Dodaj Zajecia: <input type="text" name="zajecie"/>
<input type="submit" value="dodaj"/>

    </form>
</body>
