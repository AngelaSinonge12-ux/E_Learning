-- Active: 1745934871033@@127.0.0.1@3306@learnify_db
<?php
$host = "localhost";
$username = "root"; 
$password = "";    
$databaseName = "learnify_db";
$tableName = "data";

$connection = mysqli_connect($host, $username, $password, $databaseName);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = isset($_POST["first_name"]) ? $_POST["first_name"] : "";
    $lastName = isset($_POST["last_name"]) ? $_POST["last_name"] : "";
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $subject = isset($_POST["subject"]) ? $_POST["subject"] : "";
    $message = isset($_POST["message"]) ? $_POST["message"] : "";

    $sql = "INSERT INTO $tableName (first_name, last_name, email, subject, message) VALUES (?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($connection, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sssss", $firstName, $lastName, $email, $subject, $message);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(array("status" => "success", "message" => "Message sent successfully!"));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error inserting data: " . mysqli_error($connection)));
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(array("status" => "error", "message" => "Error preparing statement: " . mysqli_error($connection)));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "This script should be accessed via a POST request."));
}

mysqli_close($connection);
?>