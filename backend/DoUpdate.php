<?php
$id = $_POST['id'];
$money = $_POST['money'];
$costtime = $_POST['costtime'];
$category = $_POST['category'];

require_once 'mysql.inc.php';
$response = openDB();

if ($response['status'] == 200) {
    if (!empty($money) && !empty($costtime)) {
        if (
            !($date = explode("-", $costtime)) ||
            count($date) !== 3
        ) {
            $response['status'] = 400; // Bad Reques
            $response['message'] = "日期格式輸入錯誤";
            die(json_encode($response));
        }
        $month = $date[1];

        if ($month && $month <= 12) {
            $sql = "UPDATE `mycost` SET `money`=?, `costtime`=?, `category`=? ,`month`=? WHERE id=?";
            $conn = $response['result'];
            $stmt = $conn->prepare($sql);
            $response['result'] = $stmt->execute(array($money, $costtime, $category, $month, $id));

            if ($response['result']) {
                $count = $stmt->rowCount();
                if ($count < 1) {
                    $response['status'] = 204; //No Content
                    $response['message'] = "修改失敗";
                } else {
                    $response['status'] = 200; //OK
                    $response['message'] = "修改成功";
                }
            } else {
                $response['status'] = 400; //Bad Request
                $response['message'] = "SQL錯誤";
            }
        } else {
            $response['status'] = 400; //Bad Request
            $response['message'] = '錯誤日期格式';
        }
    }
}

echo json_encode($response);
