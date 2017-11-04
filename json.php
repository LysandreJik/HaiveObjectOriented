<?php
   $json = $_POST['json'];

   if (json_decode($json) != null){
     $file = fopen('json/read.json','w+');
     fwrite($file, $json);
     fclose($file);
   }

?>