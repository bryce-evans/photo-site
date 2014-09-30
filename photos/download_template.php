
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
					<div style='background-image: url("tiles/tile-1.jpg")'/>
				</li>
				<li>
					<div style='background-image: url("tiles/tile-2.jpg")'/>
				</li>
				<li>
					<div style='background-image: url("tiles/tile-3.jpg")'/>
				</li>
				<li>
					<div style='background-image: url("tiles/tile-4.jpg")'/>
				</li>
			</ul>
			<div id="content">
			<div id="title">
				<span id='main'><?php echo $title?></span>
				<span id='subtitle'><?php echo $date ?></span>
			</div>
			<div id='info'>
				<span id='desc'>(No Description)</span>
				 <span id='photo-count'><?php echo $photo_count ?> photos </span>
				 <span id='dl_size'>(<?php echo $size ?>)</span>
			</div>
			<div id='button-container'>
				<a id='download-button' href="photos.zip" download="photos.zip" class="green button">Download All </a>
				<a id='select-images' href="#" class="blue button disabled">Select Images</a>
			</div>
			<div class='logo-positioner'>
<a class='logo-container' href='/'> <img  src='../../logos/small.png'></img>  </a></div>
		</div>
		</div>
		<div id='footer'>
			&copy;2014 Bryce A. Evans
		</div>
	</body>
</html>