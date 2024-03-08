<?php
    class DB
    {
        public static $servername = "localhost";
        public static $username = "root";
        public static $password = "";
        public static $conn;
        public static function Init()
        {
            DB::$conn = mysqli_connect(DB::$servername, DB::$username, DB::$password);
        }
        public static function Init_db($db)
        {
            DB::$conn = mysqli_connect(DB::$servername, DB::$username, DB::$password, $db);
        }
        public static function exec($query)
        {
            return mysqli_query(DB::$conn, $query);
        }
    }

?>