const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Adjust the port as needed

// Configure bodyParser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a function to configure nodemailer for different email services
function createTransporter(service, user, pass) {
    return nodemailer.createTransport({
        service: service, // Use the provided service (e.g., 'Hotmail', 'Gmail', etc.)
        auth: {
            user: user, // Your email address
            pass: pass // Your email password or app-specific password
        }
    });
}

// Handle POST requests to the form submission endpoint
app.post('/submit-form', (req, res) => {
    const { name, email, message, emailService } = req.body;

    // Configure nodemailer based on the selected email service
    let transporter;
    if (emailService === 'hotmail') {
        transporter = createTransporter('Hotmail', 'your_hotmail_email@hotmail.com', 'your_hotmail_password');
    } else if (emailService === 'gmail') {
        transporter = createTransporter('Gmail', 'your_gmail_email@gmail.com', 'your_gmail_password');
    } else {
        return res.status(400).send('Invalid email service selected.');
    }

    // Compose the email
    const mailOptions = {
        from: transporter.options.auth.user,
        to: 'joanmbio@hotmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
