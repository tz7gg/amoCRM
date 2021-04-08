<?php

//скрипт на тестовое задание #1

require_once(__DIR__ . '/autoload.php');


//функция возвращает всех клиентов
function getClients() {
    return [
        [
            'id' => 1,
            'name' => 'intrdev',
            'api' => '23bc075b710da43f0ffb50ff9e889aed'
        ],
        [
            'id' => 2,
            'name' => 'artedegrass0',
            'api' => '',
        ],
    ];
}

// функция принимает 3 параметра, массив всех сделок, дату сортировки от и до
// и возвращает сумму всех сделок клиента

function totalSumSortedByDate ($dateFrom, $dateTo, $totalLeds) {
    $AllSumLeads = 0;      
    foreach ($totalLeds as $key) {                   
        if( $dateFrom < $key['date_close'] && $dateTo > $key['date_close']) {
            $AllSumLeads += (int)$key['price'];
        }        
    }
    return $AllSumLeads;
}
//рисуем начало таблицы 
echo '<table border="1">
<tr>
 <th>id</th>
 <th>Имя</th>
 <th>Сумма</th>
</tr>';

$allClients = getClients();

//цикл проходит по всем клиентам
foreach ($allClients as $key) {

    $clientId = $key['id'];
    $clientName = $key['name'];
    $ClientApi = $key['api'];
    $clientAlive = true; // если ошибка подключения по ключу = false

    $dateFrom = $_GET["date_from"];
    $dateTo =   $_GET["date_to"];

    $allLedsList = []; //массив принимает на каждом запросе по 200 элементов в массиве
    $totalLeds = []; //массив всех сделок

    $count = 200;
    $offset = 0;
    $status = 142;  
      
    Introvert\Configuration::getDefaultConfiguration()->setApiKey('key', $ClientApi);

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

    $sum = totalSumSortedByDate($dateFrom, $dateTo, $totalLeds);    

    $totalSum +=  $sum; // общая сумма всех сделок всех клиентов

    if(!$clientAlive) {
        $sum = 'клиент уже не клиент';
    }
    
    echo '<tr><td>' . $clientId . '</td><td>' . $clientName . '</td><td>' . $sum . '</td></tr>';
}

echo '</table>' . 'Сумма сделок всех клиентов: ' . $totalSum;