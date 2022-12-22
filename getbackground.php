<?php
$dir = './videobg/';
  // Verificamos si existe directorio
  if (file_exists($dir) && is_dir($dir) ) {
    
      // Escanea todos los archivos del directorio
      $scan_arr = scandir($dir);
      // Excluimos el . y el  ..
      $files_arr = array_diff($scan_arr, array('.','..') );

      // Get each files of our directory with line break
      foreach ($files_arr as $file) {
        //Get the file path
        $file_path = $dir.$file;
        // Get the file extension
        $file_ext = pathinfo($file_path, PATHINFO_EXTENSION);
        if ($file_ext=="jpg" || $file_ext=="png" || $file_ext=="JPG" || $file_ext=="PNG"|| $file_ext=="mp4"|| $file_ext=="MP4") {
          echo $file_path.",";
        }
        
      }
  }
  else {
    echo "Directorio no existe";
  }





?>