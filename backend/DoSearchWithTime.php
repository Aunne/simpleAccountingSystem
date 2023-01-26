<?php
$small = $_POST['time1'];
$big = $_POST['time2'];
$sortmethod = $_POST['sortmethod'];

if (empty($small) || empty($big)) {
    $response['status'] = 204; //No Content
    $response['message'] = "不能輸入空值!";
} else {

    require_once 'mysql.inc.php';
    $response = openDB();
    if ($response['status'] == 200) {
        $sql = "SELECT * FROM `mycost` WHERE costtime>=? AND costtime<=?";
        $conn = $response['result'];
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute(array($small, $big));
    }
    if ($result) {
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response['status'] = 200; //OK
        $response['message'] = '查詢成功';
        $response['sortmethod'] = $sortmethod;
        $response['result'] = $rows;
    } else {
        $response['status'] = 400; //Bad Request
        $response['message'] = 'SQL錯誤';
    }
}
echo json_encode($response);
