const Contact = require("../models/contact");
const transporter = require("../config/mailer");

const createContact = async (req, res) => {
    try {
        const { name, email, mobile, subject, message } = req.body;

        if (!name || !email || !mobile || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        // Save Contact
        const contact = await Contact.create({
            name,
            email,
            mobile,
            subject,
            message
        });

        // ===========================================
        // Email to You
        // ===========================================

        await transporter.sendMail({
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `📩 New Contact Form - ${subject}`,

            html: `
            <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
                <div style="max-width:650px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.1);">

                    <div style="background:#2563eb;color:#fff;padding:25px;text-align:center;">
                        <h2 style="margin:0;">📩 New Contact Form Submission</h2>
                    </div>

                    <div style="padding:30px;line-height:1.8;">

                        <table style="width:100%;border-collapse:collapse;">

                            <tr>
                                <td style="padding:10px;font-weight:bold;">Name</td>
                                <td>${name}</td>
                            </tr>

                            <tr style="background:#f7f7f7;">
                                <td style="padding:10px;font-weight:bold;">Email</td>
                                <td>${email}</td>
                            </tr>

                            <tr>
                                <td style="padding:10px;font-weight:bold;">Mobile</td>
                                <td>${mobile}</td>
                            </tr>

                            <tr style="background:#f7f7f7;">
                                <td style="padding:10px;font-weight:bold;">Subject</td>
                                <td>${subject}</td>
                            </tr>

                        </table>

                        <h3 style="margin-top:30px;">Message</h3>

                        <div style="background:#f8f9fa;padding:20px;border-left:4px solid #2563eb;border-radius:5px;">
                            ${message}
                        </div>

                    </div>

                </div>
            </div>
            `
        });

        // ===========================================
        // Auto Reply Email
        // ===========================================

        await transporter.sendMail({
            from: `"Parth Vaghela" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thank You for Contacting Me",

            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
            </head>

            <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.1);">

                    <div style="background:#2563eb;padding:35px;text-align:center;color:#fff;">
                        <h1 style="margin:0;">Thank You!</h1>
                        <p>Your message has been received successfully.</p>
                    </div>

                    <div style="padding:35px;color:#444;line-height:1.8;">

                        <h2>Hello ${name}, 👋</h2>

                        <p>
                            Thank you for contacting me through my portfolio website.
                            I appreciate your interest.
                        </p>

                        <div style="background:#f1f5ff;padding:18px;border-left:5px solid #2563eb;border-radius:5px;">

                            ✔ Your message has been received successfully.<br><br>

                            ✔ I will review your message carefully.<br><br>

                            ✔ You can expect a reply within <strong>24-48 hours.</strong>

                        </div>

                        <p style="margin-top:25px;">
                            Your submitted subject:
                        </p>

                        <div style="background:#fafafa;padding:15px;border-radius:5px;">
                            <strong>${subject}</strong>
                        </div>

                        <p style="margin-top:30px;">
                            Thank you once again for reaching out.
                            I look forward to connecting with you soon.
                        </p>

                        <br>

                        <strong>Best Regards,</strong><br><br>

                        <strong>Jaiminkumar Vaghela</strong><br>


                    </div>

                    <div style="background:#f7f7f7;padding:25px;text-align:center;color:#666;font-size:14px;">

                        <strong>Parth Vaghela</strong><br>

                        MERN Stack Developer<br><br>

                        📧 vaghelajaiminkumar528@gmail.com<br>

                        🌐 https://jaiminkumar-portfolio.vercel.app/<br>


                        💼 https://www.linkedin.com/in/vaghelajaiminkumar73

                        <br><br>

                        © ${new Date().getFullYear()} Jaiminkumar Vaghela. All Rights Reserved.

                    </div>

                </div>

            </body>
            </html>
            `
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: contact
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createContact
};