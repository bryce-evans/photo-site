<?php
$title = "Nicole's Photos";
$date = "Sept. 14, 2014";
$photo_count = 33;
?>

<!DOCTYPE html>

<html>
	<head>
		<link rel='stylesheet' href ='../css/download.css'/>
		<link rel='stylesheet' href ='../../css/fonts.css'/>
		<title><?php echo $title?> | Bryce Evans Photography</title>
	</head>
	<body>
		<div id='page'>
			<ul id='film-reel'>
				<li>
					<div style='background-image: url("thumbs/tile-1.jpg")'/>
				</li>
				<li>
					<div style='background-image: url("thumbs/tile-2.jpg")'/>
				</li>
				<li>
					<div style='background-image: url("thumbs/tile-3.jpg")'/>
				</li>
				<li>
					<div style='background-image: url("thumbs/tile-4.jpg")'/>
				</li>
			</ul>
			<div id="title">
				<span id='main'><?php echo $title?></span>
				<span id='subtitle'><?php echo $date ?> - <?php echo $photo_count ?> photos </span>
			</div>
			<div id='button-container'>
				<a id='download-button' href="photos.zip" download="photos.zip" class="green button">Download All</a>
				<a id='select-images' href="#" class="blue button disabled">Select Images</a>
			</div>
			<a class='logo-container' href='/'>
				<div  class='logo small'>
					Bryce<span class='blue'>Evans</span>
					<div class='photolettering'>
						photography
					</div>
				</div>
			</a>
		</div>
		<div id='footer'>
			&copy;2014 Bryce A. Evans
		</div>
	</body>
</html>