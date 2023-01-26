<?php
$money1 = $_POST['money1'];
$money2 = $_POST['money2'];
$sortmethod = $_POST['sortmethod'];

if (empty($money1) || empty($money2)) {
    $response['status'] = 204; //No Content
    $response['message'] = "不能輸入空值!";
} else {
    if ($money1 > $money2) {
        $big = $money1;
        $small = $money2;
    } else {
        $big = $money2;
        $small = $money1;
    }

    require_once 'mysql.inc.php';
    $response = openDB();
    if ($response['status'] == 200) {
        $sql = "SELECT * FROM `mycost` WHERE money>=? AND money<=?";
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
