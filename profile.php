<?php
session_start();
include ("config.php");

if (!isset($_SESSION['user_id'])) {
    echo "not_logged_in";
    exit;
}

if (isset($_POST['action']) && $_POST['action'] == "addCraft") {

    $name = $_POST['craftName'];
    $desc = $_POST['craftDescription'];
    $price = $_POST['craftPrice'];
    $imgName = $_FILES['craftImage']['name'];

    $tmp = $_FILES['craftImage']['tmp_name'];
    $path = "uploads/" . $imgName;

    move_uploaded_file($tmp, $path);

    $q = "INSERT INTO crafts(user_id, name, description, price, image)
          VALUES('$user_id','$name','$desc','$price','$imgName')";

    if (mysqli_query($conn, $q)) {
        echo "success";
    } else {
        echo "error";
    }
}

/* ======================
   FETCH USER CRAFTS
====================== */
if (isset($_GET['action']) && $_GET['action'] == "getCrafts") {

    $user_id = $_SESSION['user_id'];
    $data = [];

    $res = mysqli_query($conn, "SELECT * FROM crafts WHERE user_id='$user_id'");
    while ($row = mysqli_fetch_assoc($res)) {
        $data[] = $row;
    }

    echo json_encode($data);
}

/* ======================
   LOGOUT
====================== */
if (isset($_GET['action']) && $_GET['action'] == "logout") {
    session_destroy();
    echo "logged_out";
}
?>
