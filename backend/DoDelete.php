<?php

$id = $_POST['id'];

require_once 'mysql.inc.php';
$response = openDB();

if ($response['status'] == 200) {
    $sql = "DELETE  FROM  `mycost`WHERE id=?"; //WHERE條件句

    $conn = $response['result'];
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute(array($id));
    if ($result) {
        $count = $stmt->rowCount();
        if ($count < 1) {
            $response['status'] = 200; //No Content
            $response['message'] = "刪除失敗ˋ";
        } else {
            $response['status'] = 200; //OK
            $response['message'] = "刪除成功";
        }
    } else {
        $response['status'] = 400; //Bad Request
        $response['message'] = "SQL錯誤";
    }
}
echo json_encode($response);