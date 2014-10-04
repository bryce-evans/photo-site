<?php
  $browser = strpos($_SERVER['HTTP_USER_AGENT'],"iPhone");
    if ($browser == true){
    $browser = 'iphone';
  }
?>

<?php if($browser == 'iphone'){ ?>
  <meta name="viewport"
  content="width=device-width,
  minimum-scale=1.0, maximum-scale=1.0" />
<?php } ?>