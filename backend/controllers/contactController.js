const Contact = require("../models/contact");
const transporter = require("../config/mailer");



const createContact = async (req, res) => {

    try {

        const { 
            name, 
            email, 
            mobile, 
            subject, 
            message 
        } = req.body;



        if (!name || !email || !mobile || !subject || !message) {

            return res.status(400).json({

                success:false,
                message:"Please fill all fields."

            });

        }



        // ===========================================
        // Save Contact in MongoDB
        // ===========================================


        const contact = await Contact.create({

            name,
            email,
            mobile,
            subject,
            message

        });



  
        // ===========================================
        // Email To Admin
        // ===========================================


        await transporter.sendMail({

            from:`"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,

            to:process.env.EMAIL_USER,

            subject:`📩 New Contact Form - ${subject}`,

            html:`


            <div style="font-family:Arial;background:#f4f4f4;padding:30px">

            <div style="max-width:650px;margin:auto;background:#fff;padding:30px">


            <h2>
            📩 New Contact Form Submission
            </h2>


            <table>

            <tr>
            <td><b>Name:</b></td>
            <td>${name}</td>
            </tr>


            <tr>
            <td><b>Email:</b></td>
            <td>${email}</td>
            </tr>


            <tr>
            <td><b>Mobile:</b></td>
            <td>${mobile}</td>
            </tr>


            <tr>
            <td><b>Subject:</b></td>
            <td>${subject}</td>
            </tr>


            </table>



            <h3>Message</h3>

            <p>
            ${message}
            </p>


            </div>

            </div>


            `

        });


                // ===========================================
        // Auto Reply Email To Customer
        // ===========================================


        await transporter.sendMail({

            from:`"Parth Vaghela" <${process.env.EMAIL_USER}>`,

            to:email,

            subject:"Thank You for Contacting Me",


            html:`

            <!DOCTYPE html>

            <html>

            <body style="
            margin:0;
            padding:0;
            background:#f4f4f4;
            font-family:Arial,Helvetica,sans-serif;
            ">


            <div style="
            max-width:600px;
            margin:30px auto;
            background:#ffffff;
            border-radius:10px;
            overflow:hidden;
            box-shadow:0 5px 20px rgba(0,0,0,.1);
            ">


                <div style="
                background:#2563eb;
                padding:35px;
                text-align:center;
                color:white;
                ">


                    <h1>
                    Thank You!
                    </h1>


                    <p>
                    Your message has been received successfully.
                    </p>


                </div>



                <div style="
                padding:35px;
                color:#444;
                line-height:1.8;
                ">


                    <h2>
                    Hello ${name}, 👋
                    </h2>



                    <p>
                    Thank you for contacting me through my portfolio website.
                    I appreciate your interest.
                    </p>



                    <div style="
                    background:#f1f5ff;
                    padding:18px;
                    border-left:5px solid #2563eb;
                    border-radius:5px;
                    ">


                    ✔ Your message has been received successfully.
                    <br><br>

                    ✔ I will review your message carefully.
                    <br><br>

                    ✔ You can expect a reply within 
                    <strong>24-48 hours.</strong>


                    </div>



                    <p style="margin-top:25px">

                    Your submitted subject:

                    </p>



                    <div style="
                    background:#fafafa;
                    padding:15px;
                    border-radius:5px;
                    ">


                    <strong>
                    ${subject}
                    </strong>


                    </div>




                    <p style="margin-top:30px">

                    Thank you once again for reaching out.
                    I look forward to connecting with you soon.

                    </p>



                    <br>


                    <strong>
                    Best Regards,
                    </strong>


                    <br><br>


                    <strong>
                    Parth Vaghela
                    </strong>


                </div>





                <div style="
                background:#f7f7f7;
                padding:25px;
                text-align:center;
                color:#666;
                font-size:14px;
                ">



                <strong>
                Parth Vaghela
                </strong>


                <br>


                MERN Stack Developer


                <br><br>


                📧 ${process.env.EMAIL_USER}


                <br>


                🌐 
                https://jaiminkumar-portfolio.vercel.app/


                <br><br>


                © ${new Date().getFullYear()} 
                Parth Vaghela.
                All Rights Reserved.



                </div>


            </div>


            </body>

            </html>

            `

        });




        // ===========================================
        // Final Response
        // ===========================================


        res.status(201).json({

            success:true,

            message:"Message sent successfully.",

            data:contact

        });



    } catch (error) {
    console.error("CONTACT ERROR:", error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}


    //  catch(error){


    //     console.error(error);



    //     res.status(500).json({

    //         success:false,

    //         message:"Internal Server Error"

    //     });


    // }

};




// Export Controller

module.exports = {

    createContact

};