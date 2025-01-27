<?php
header('Content-Type: application/json');

// Підключення до бази даних
$servername = "localhost";
$username = "root";
$password = "19612046";
$dbname = "test_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM tests";
$result = $conn->query($sql);

$questions = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
}

echo json_encode($questions);

$conn->close();
?>
