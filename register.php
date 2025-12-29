<?php
// include database connection
include("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $name = trim($_POST['name']);
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $email = trim($_POST['email']);
     $db="craft_market";
    // Check empty fields
    if(!$name || !$username || !$password || !$email){
        echo "All fields are required.";
        exit;
    }

    // Encrypt password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into database
    $sql = "INSERT INTO register (name, username, password, email) 
            VALUES ('$name', '$username', '$hashedPassword', '$email')";

    if (mysqli_query($conn, $sql)) {
        echo "Registration successful. <a href='login.html'>Login Now</a>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
