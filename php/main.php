<?php

function writeLogs($message)
{
$logs = fopen('php.log', 'a+');
fwrite($logs, date('d.m.y H:i:s') . ': ' . $message . "\n");
fclose($logs);
}

function validate() {
return isset($_GET['X']) && isset($_GET['Y']) && isset($_GET['R']);
}

function checkTriangle($x, $y, $r) {
return $x <= 0 && $y <= 0 && $y >= -$r/2+$x ;
}

function checkRectangle($x, $y, $r) {
return $x <= 0 && $x >= -$r && $y >= 0 && $y <= $r;
}
function checkSector ($x, $y, $r) {
return $x >= 0 && $y <= 0 && sqrt($x * $x + $y * $y) <= $r/2;
}

function checkArea($x, $y, $r) {
return checkTriangle($x, $y, $r) || checkRectangle($x, $y, $r) || checkSector($x, $y, $r);
}

if (validate()) {
date_default_timezone_set('Europe/Moscow');
$x = trim($_GET['X']);
$y = trim($_GET['Y']);
$r = trim($_GET['R']);
$currentTime = date("d.m.Y H:i:s", time());
$scriptTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 6);
$inArea = checkArea($x, $y, $r) ? 'Да':'Нет';
$data =  "{\"x\" : $x, \"y\" : $y, \"r\" : $r, \"current\" : \"$currentTime\", \"execution\" : $scriptTime, \"result\" : \"$inArea\"}";
echo $data;
} else {
echo "error";
}



