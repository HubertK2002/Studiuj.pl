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
            $res = mysqli_query(DB::$conn, $query);
            if($res) $inserted_id []= DB::$conn->insert_id;
            return $inserted_id[0];
        }
        public static function exec_many($queries) {
            $result = array();
            foreach($queries as $query) {
                $res = DB::exec($query);
                if($res) $result []= $res;
            }
            return $result;
        }

        public static function sql_row($query) {
            return mysqli_query(DB::$conn, $query);
        }

        public static function sql($query) {
            $return = mysqli_query(DB::$conn, $query);
            $array = mysqli_fetch_all($return, MYSQLI_ASSOC);
            return $array;
        }

        public static function insert($query) {
            $res = mysqli_query(DB::$conn, $query);
            if($res) return DB::$conn->insert_id;
        }
    }

?>