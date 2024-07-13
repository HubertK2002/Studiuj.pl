<style>
    table td {
    border-bottom: 1px solid black;
}

table td:last-child {
    border-bottom: none;
}
</style>
<?php
    class fraction {
        public int $numerator;
        public int $denominator;

        function __construct($numerator, $denominator) {
            $this->numerator = $numerator;
            $this->denominator = $denominator;
        }

        public function present() {
            echo "
            <table>
                <tr><td>{$this->numerator}</td></tr>
                <tr><td>{$this->denominator}</td></tr>
            </table>
            ";
        }

        public static function __mul($lhs, $rhs) {
            $lhs_type = gettype($lhs);
            $rhs_type = gettype($rhs);

        }
    }

    class number extends fraction {
        function __construct($numerator)
        {
            parent::__construct($numerator, 1);
        }

        public function present() {
            echo $this->numerator;
        }
    }

    class operation {
        public array $elements;
        public static string $operator;
        function __construct($elements) {
            switch(gettype($elements)) {
                case 'array':
                    $this->elements = $elements;
                    break;
                case 'string':
                    $this->elements = self::string_to_type($elements);
            }
        }

        public static function string_to_type($string) {
            return explode(self::$operator, $string);
        }
    }

    class sum extends operation {
        public static string $operator = "+";
    }

    class substraction extends operation {
        public static string $operator = "-";
    }

    class product {
       public static string $operator = "*";
    }

    class divide {
        public static string $operator = "/";
    }

    class equation {
        public string $equation;
        function __construct($equation) {

        }
    }

    $t = new fraction(5,8);
    $t->present();

?>