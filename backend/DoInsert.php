<?php
$response = [];

if (!(isset($_POST['money']) &&
    isset($_POST['costtime']) &&
    isset($_POST['category']))) {
    $response['status'] = 400;
    $response['message'] = "前端錯誤，資料不完整";
    die(json_encode($response));
}

$money = $_POST['money'];
$costtime = $_POST['costtime'];
$category = $_POST['category'];

if (
    empty($money) ||
    empty($costtime)
) {
    $response['status'] = 400; // Bad Request 無效的請求。No Content 是指執行成功，只是伺服器不知道要回答什麼
    $response['message'] = "不能輸入空值！";
    die(json_encode($response));
}

if (
    !($date = explode("-", $costtime)) ||
    count($date) !== 3
) {
    $response['status'] = 400; // Bad Reques
    $response['message'] = "日期格式輸入錯誤";
    die(json_encode($response));
}
$month = $date[1];

require_once 'mysql.inc.php';

$response = openDB();
if ($response['status'] !== 200) {
    $response['status'] = 500;
    $response['message'] = "內部錯誤（資料庫無法連線）";
    die(json_encode($response));
}

$sql = "INSERT INTO `mycost` (`money`, `costtime`, `category`, `month`) VALUES (?, ?, ?, ?)";
$conn = $response['result'];
$stmt = $conn->prepare($sql);
$result = $stmt->execute([$money, $costtime, $category, $month]);

if (!$result) {
    $response['status'] = 400; // Bad Request
    $response['message'] = "SQL 執行失敗";
    die(json_encode($response));
}

$count = $stmt->rowCount();
if ($count < 1) {
    $response['status'] = 400; // Bad Request
    $response['message'] = "新增失敗";
} else {
    $response['status'] = 200; //OK
    $response['message'] = "新增成功";
}

echo json_encode($response);
