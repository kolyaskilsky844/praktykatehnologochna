<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "19612046";
$dbname = "test_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Перевірка, чи є ім'я користувача
    if (empty($user) || empty($pass)) {
        echo json_encode(["success" => false, "message" => "Username and password are required"]);
        exit();
    }

    // Перевірка користувача
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            echo json_encode(["success" => true, "message" => "Login successful!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password!"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found!"]);
    }

    $stmt->close();
}
$conn->close();
?>
