<script>
    function ParseDownloadedData() {
        let struktury_by_id = GroupById(struktury);
        let grupy_by_id = GroupById(groupes);
        let images_by_id = GroupById(images);

        let struktury_tagi = Array();
        struktury_by_id.forEach(item => {
            struktury_tagi[item['Id']] = ParseTag(item,item['Rodzaj']);
        });

        struktury_by_id.forEach(item => {
            if(item['Root']) {
                document.getElementById("notatki").appendChild(struktury_tagi[item['Id']]);
            }
        })

        let images_tagi = Array();
        images_by_id.forEach(item => {
            images_tagi[item['Id']] = ParseTag(item,"image");
        });

        grupy_by_id.forEach(item => {
            console.log(struktury_tagi[item['Struktura']]);
            switch(item['childType']) {
                case 'Image':
                    struktury_tagi[item['Struktura']].appendChild(images_tagi[item['childId']]);
                    break;
            }
        });

        let tables_by_id = Array();
        tables.forEach(table => {
            
        });
    }

    function GroupById(array) {
        let grouped_array = Array();
        array.forEach(item => {
            grouped_array[item['Id']] = item;
        });
        return grouped_array;
    }

    function ParseTag(tag_data, type) {
        switch(type) {
            case 'Grupa':
                const grupa = document.createElement("grupa-select");
                console.log(tag_data);
                grupa.setTitle(tag_data['Title']);
                grupa.CreatedInJs = true;
                return grupa;
            case 'image':
                const image = document.createElement("group-image");
                image.setTitle(tag_data['title']);
                image.CreatedInJs = true;
                return image;
        }
    }

</script>

<?php
class lesson {
    public $dzial;
    public $lekcja;
    function __construct($dzial, $lekcja) {
        $this->dzial = $dzial;
        $this->lekcja = $lekcja;
        DB::Init_db($dzial);
    }

    function print_title() {
        echo "<h2>$this->dzial</h2>";
        echo "<h3>$this->lekcja</h4>";
        echo "<br>";
    }
}

class Parser {
    public static function DownloadData($dzial, $lekcja) {
        DB::Init_db($dzial);
        $structures = DB::sql("Select * from struktury where Lekcja = '$lekcja'");
        $images = DB::sql("Select * from images where Lekcja = '$lekcja'");
        $groupes = DB::sql("Select * from grupy where Lekcja = '$lekcja'");
        $tables = DB::sql("Select * from `tabela wierszowa` where Lekcja = '$lekcja'");
        $tables_headers = DB::sql("Select * from `nagłówki tabeli wierszowej` where Lekcja = '$lekcja'");
        $tables_body = DB::sql("Select * from `wiersze tabela wierszowa` where Lekcja = '$lekcja'");
        ?>
            <script>
                var struktury = <?php echo json_encode($structures); ?>;
                var images = <?php echo json_encode($images); ?>;
                var groupes = <?php echo json_encode($groupes); ?>;
                var tables = <?php echo json_encode($tables); ?>;
                var tables_headers = <?php echo json_encode($tables_headers); ?>;
                var tables_body = <?php echo json_encode($tables_body); ?>;
                ParseDownloadedData();
            </script>
        <?php

    }

    public static function ParseAndSaveData($note) {
        $obj = ( get_object_vars($note));
        $type = array_keys($obj)[0];
        $data = $note->$type;
        switch($type) {
            case 'Grupa':
                $sql = "insert into struktury values (null, '{$data->Title}', 'Grupa', '{$_POST['lekcja']}', {$data->Root})";
                $structure_id = DB::exec($sql);
                $ids = array();
                echo $sql;
                foreach($data->Children as $child) {
                   $ids []= Parser::ParseAndSaveData($child);
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
                    print_r($data);
                $sql = "insert into images values (null, '{$data->Properties->Title}','{$_POST['lekcja']}')";
                $image = array();
                $image_id = DB::exec($sql);
                $image['id'] = $image_id;
                $image['type'] = "Image";
                file_put_contents("$dir/$image_id.png",$data->Image);
                echo $data->Properties->Title;
                return $image;
                break;
            case 'Table':
                $sql = "insert into `tabela wierszowa` values (null, '{$data->Title}', '{$_POST['lekcja']}', '{$data->Table->Head->Headers_count}','{$data->Table->Body->Rows_count}')";
                $table_id = DB::insert($sql);
                $i = 0;
                foreach($data->Table->Head->Headers as $Header) {
                    DB::insert("insert into `nagłówki tabeli wierszowej` values (null, '$table_id', '$i', '$Header', '{$_POST['lekcja']}')");
                    $i++;
                }
                $Wiersz = 0;
                foreach($data->Table->Body->Rows as $Row) {
                    $Kolumna = 0;
                    foreach($Row as $column) {
                        DB::insert("insert into `wiersze tabela wierszowa` values (null, '$Wiersz', '$Kolumna', '$table_id', '$column', '{$_POST['lekcja']}')");
                        $Kolumna++;
                    }
                    $Wiersz++;
                }
                break;
            default:
                echo $type;
                break;
            
        }
    }
}

?>