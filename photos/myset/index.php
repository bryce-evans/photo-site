<?php
function size_to_string($size) {
	if ($size / pow(1024,2) < 1){
		return round($size / 1024,0) . ' kB';
	} elseif ($size / pow(1024,3) < 1){
		return round($size / pow(1024,2),0) . ' MB';
	}
	return round($size / pow(1024,3),0) . ' GB';
}


$title = "Nicole's Photos";
$date = "Sept. 14, 2014";
$photo_count = 33;
$raw_size = filesize('photos.zip');
$size = size_to_string($raw_size);
include '../download_template.php'
?>
