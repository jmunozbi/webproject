<?php
// Collect form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Compose the email
$to = 'joanmbio@hotmail.com'; // Your email address
$subject = 'New Contact Form Submission';
$headers = "From: $name <$email>" . "\r\n";
$messageBody = "Name: $name\nEmail: $email\nMessage:\n$message";

// Send the email
mail($to, $subject, $messageBody, $headers);

// Redirect back to a thank you page
header('Location: thankyou.html'); // Create a thank you page
exit;
?>
