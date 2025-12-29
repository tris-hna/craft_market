<?php
session_start();
include("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $pass  = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, name, password FROM register WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $name, $hash);
        $stmt->fetch();

        if (password_verify($pass, $hash)) {
            // login successful
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;
            header("Location: buyer.php");
            exit;
        } else {
            echo "Wrong password.";
        }
    } else {
        echo "User not found.";
    }

    $stmt->close();
}
$conn->close();
?>
