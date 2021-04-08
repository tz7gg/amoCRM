<?php

//скрипт на тестовое задание #2

require_once(__DIR__ . '/autoload.php');  

$clientAlive = true; // если ошибка подключения по ключу = false
$allLedsList = []; //массив принимает на каждом запросе по 200 элементов в массиве
$totalLeds = []; //массив всех сделок

$count = 200;
$offset = 0;
$fieldId = 968675;
$status = [30510703, 35171416];

Introvert\Configuration::getDefaultConfiguration()->setApiKey('key', '23bc075b710da43f0ffb50ff9e889aed');
$api = new Introvert\ApiClient();      

//цикл получает массив сделок частичто по $count = 200;
do {
    try {
        $result = $api->lead->getAll($crm_user_id, $status, $id, $ifmodif, $count, $offset);
    } catch (Exception $e) {
        $clientAlive = false;
    }
    $allLedsList[] = $result['result'];
    $offset += 200;     
} while ($result['count'] != 0);

// если клиент действующий формируем массив всех сделок
if($clientAlive) {
    foreach ($allLedsList as $array) {
        if($array) {
            foreach ($array as $key) {
                $totalLeds[] = $key;
            }
        }
    } 
}  
//убираем все не нужное оставляем кастом филдс
$customFields = array_column($totalLeds, 'custom_fields');

foreach ($customFields as $key => $value) {
    $temp[] = $value;
}
//проверяем ан соответсиве нужного поля
for ($i=0; $i < count($temp) ; $i++) { 
    foreach ($temp[$i] as $key => $value) {        
        if ($value['id'] == $fieldId) {
            $allDates[] = $value['values'][0]['value'];
        }
    }
}
// считаем количествло по датам 
foreach( array_count_values($allDates) as $key => $val ) {
    if ( $val >= 5 ) {
        $dateNeedBlocked[] = $key;  
    } 
}

$AllDate = []; //создаем массив всех даты

$today = date("Y-m-d " . '00:00:00');

//наполняем дадатами + 30 дней от текущего дня
for ($i=0; $i <= 30; $i++) { 
    $timeTo = date('Y-m-d', strtotime($today. ' + ' .$i. ' days'));
    $timeTo .= ' 00:00:00';  
    $AllDate[] = $timeTo;
}
//убираем те даты на которых больше 5 сделок
foreach ($dateNeedBlocked as $key => $value) {
    foreach ($AllDate as $key => $timeTo) {
        if ($timeTo == $value) {
            unset($AllDate[$key]);
        }
    }
}
//убираем ключи
$aliveDate = [];
foreach ($AllDate as $key => $value) {
    $aliveDate[] = $value;
}

echo json_encode($aliveDate);

