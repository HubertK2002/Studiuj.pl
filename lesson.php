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
                grupa.CreatedInJs = true;
                return grupa;
            case 'image':
                const image = document.createElement("group-image");
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
        ?>
            <script>
                var struktury = <?php echo json_encode($structures); ?>;
                var images = <?php echo json_encode($images); ?>;
                var groupes = <?php echo json_encode($groupes); ?>;
                ParseDownloadedData();
            </script>
        <?php

    }
}

?>