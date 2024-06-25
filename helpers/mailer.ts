let nodemailer = require('nodemailer')
let bcrypt = require('bcryptjs')
import User from "../models/users"

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const encryptedToken = await bcrypt.hash(userId.toString(), salt)

        console.log('THis is the token: ',encryptedToken)

        // update database with account verification token or reset password token
        if (emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {verifyToken: encryptedToken, verifyTokenExpiry: Date.now() + 3600000})
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: encryptedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        // set up the mail host
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD
            }
        }) 

        // send email fields
        const mailOptions = {
            from: process.env.EMAIL_HOST,
            to: email,
            subject: emailType === 'VERIFY' ? 'Account verification' : 'Reset your password',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html lang="en">
            <head>
            <!--[if gte mso 9]>
                        <xml>
                            <o:OfficeDocumentsettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentsettings>
                        </xml>
                    <![endif]-->
            <!--[if gt mso 15]>
                <style type="text/css" media="all">
                /* Outlook 2016 Height Fix */
                table, tr, td {border-collapse: collapse;}
                tr { font-size:0px; line-height:0px; border-collapse: collapse; }
                </style>
                <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
            <meta name="robots" content="noindex, nofollow">
            <title>Welcome Email</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
            <style>
            body {
                margin: 0;
                padding: 0;
                mso-line-height-rule: exactly;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            body, table, td, p, a, li {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                font-family: 'Lato', Arial, Helvetica, sans-serif;
            }
            table td {
                border-collapse: collapse;
            }
            table {
                border-spacing: 0;
                border-collapse: collapse;
                border-color: #FFFFFF;
            }
            p, a, li, td, blockquote {
                mso-line-height-rule: exactly;
            }
            p, a, li, td, body, table, blockquote {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            img, a img {
                border: 0;
                outline: none;
                text-decoration: none;
            }
            img {
                -ms-interpolation-mode: bicubic;
            }
            * img[tabindex="0"] + div {
                display: none !important;
            }
            a[href^=tel],a[href^=sms],a[href^=mailto], a[href^=date] {
                color: inherit;
                cursor: default;
                text-decoration: none;
            }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important}
            .logo {
                width: 220px!important;
                height: 35px!important;
            }
            .logo-footer {
                width: 129px!important;
                height: 29px!important;
            }
            .table-container .alert-icon {
                width: 120px!important;
                height: 120px!important;
            }
            .table-container .avatar-img {
                width: 64px!important;
                height: 64px!important;
            }
            .x-gmail-data-detectors, .x-gmail-data-detectors * {
                border-bottom: 0 !important;
                cursor: default !important}
            @media screen {
                body {
                font-family: 'Lato', Arial, Helvetica, sans-serif;
            }
            }
            @media only screen and (max-width: 640px) {
                body {
                margin: 0px!important;
                padding: 0px!important;
            }
            body, table, td, p, a, li, blockquote {
                -webkit-text-size-adjust: none!important;
            }
            .table-main, .table-container,.social-icons,table,.table-container td {
                width: 100%!important;
                min-width: 100%!important;
                margin: 0!important;
                float: none!important;
            }
            .table-container img {
                width: 100%!important;
                max-width: 100%!important;
                display: block;
                height: auto!important;
            }
            .table-container a {
                width: 50%!important;
                max-width: 100%!important;
            }
            .table-container .logo {
                width: 200px!important;
                height: 30px!important;
            }
            .table-container .alert-icon {
                width: 120px!important;
                height: 120px!important;
            }
            .social-icons {
                float: none!important;
                margin-left: auto!important;
                margin-right: auto!important;
                width: 220px!important;
                max-width: 220px!important;
                min-width: 220px!important;
                background: #383e56!important;
            }
            .social-icons td {
                width: auto!important;
                min-width: 1%!important;
                margin: 0!important;
                float: none!important;
                text-align: center;
            }
            .social-icons td a {
                width: auto!important;
                max-width: 100%!important;
                font-size: 10px!important;
            }
            .mobile-title {
                font-size: 34px!important;
            }
            .table-container .logo-footer {
                width: 129px!important;
                height: 29px!important;
                margin-bottom: 40px!important;
            }
            .block-img {
                width: 100%;
                height: auto;
                margin-bottom: 20px;
            }
            .info-block {
                padding: 0!important;
            }
            .video-img {
                width: 100%!important;
                height: auto!important;
            }
            .post-footer-container td {
                text-align: center!important;
                padding: 0 40px 0 40px!important;
            }
            }

            </style>
            </head>
            <body style="padding: 0; margin: 0; -webkit-font-smoothing:antialiased; background-color:#f1f1f1; -webkit-text-size-adjust:none;">
            <!--Main Parent Table -->
            <table width="100%" border="0" cellpadding="0" direction="ltr" bgcolor="#f1f1f1" cellspacing="0" role="presentation" style="width: 640px; min-width: 640px; margin:0 auto 0 auto;">
            <tbody>
            <tr>
                <td style="display:none;font-size:0;line-height:0;color:#111111;">
                    Sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                </td>
            </tr>
            <tr>
                <td>
                    <!--Content Starts Here -->
                    <!--Top Header Starts Here -->
                    <table border="0" bgcolor="#121212" cellpadding="0" cellspacing="0" width="640" role="presentation" width="640" style="width: 640px; min-width: 640px;" align="center" class="table-container ">
                    <tbody>
                    <tr width="640" style="width: 640px; min-width: 640px; " align="center">
                        <td>
                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation" bgcolor="#f1f1f1">
                            <tr>
                                <td height="35" style="line-height:35px;min-height:35px;">
                                </td>
                            </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0" border="0" width="640" style="width: 640px; min-width: 640px;" role="presentation" align="center" bgcolor="#f1f1f1">
                            <tr>
                                <td align="left">
                                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" align="left" bgcolor="#f1f1f1">
                                    <tr>
                                        <td>
                                            <table cellpadding="0" cellspacing="0" border="0" align="left" role="presentation">
                                            <tr>
                                                <td align="left">
                                                    <p>Hi, thank you for signing up to Emtech.</p>
                                                </td>
                                            </tr>
                                            </table>
                                            
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                            </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--Top Header Ends Here -->
                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation" bgcolor="#f6f5f5">
                    <tbody>
                    <tr>
                        <td valign="top" bgcolor="#383e56" background="assets/top-section-bg-01.jpg">
                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation">
                            <tr>
                                <td height="60" style="line-height:60px;min-height:60px;">
                                </td>
                            </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation">
                            <tbody>
                            <tr>
                                <td align="center" style="color:#FFFFFF;padding:20px 40px 0 40px;font-family: 'Lato', Arial, Helvetica, sans-serif;font-weight:800;font-size:34px;-webkit-font-smoothing:antialiased;line-height:1.2;" class="table-container mobile-title">
                                    Congratulations, you’re <br>
                                    ready to get started!
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="color:#FFFFFF;padding:20px 40px 0 40px;font-family: 'Lato', Arial, Helvetica, sans-serif;font-weight:normal;font-size:16px;-webkit-font-smoothing:antialiased;line-height:1.4;" class="table-container">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding:40px 40px 10px 40px;" class="table-container">
                                    <!--[if mso]>
                                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.mailersend.com/" style="height: 40px; v-text-anchor: middle; width: 250px;" arcsize="13%" stroke="f" fillcolor="#01c8c8">
                                                            <w:anchorlock/>
                                                            <center>
                                                            <![endif]-->
                                    <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyaccount" : "resetpassword"}?token=${encryptedToken}" style="background-color: #01c8c8; color: #ffffff; display: inline-block;font-family: 'Lato', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 20px; text-align: center; font-weight: bold; text-decoration: none; padding: 20px 25px; min-width: 150px; -webkit-text-size-adjust: none;">Verify account</a>
                                    <!--[if mso]>
                                                            </center>
                                                        </v:roundrect>
                                                        <![endif]-->
                                </td>
                            </tr>
                            </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation">
                            <tr>
                                <td height="60" style="line-height:60px;min-height:60px;">
                                </td>
                            </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                    
                    <table bgcolor="#383e56" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation" class="table-container ">
                    <tr>
                        <td style="color:#FFFFFF; font-size:14px; line-height:22px; text-align:center;border:none;font-weight:bold;">
                            Street Address, Town/City, State ZIP <br>
                            © 2021 Your Company, Inc. <br>
                            <br>
                            Update your email preferences <a href="https://www.MailerSend.com/" target="_blank" class="link t-grey-1" style="text-decoration:underline; color:#FFFFFF;">here</a>.
                        </td>
                    </tr>
                    </table>
                    <table bgcolor="#383e56" cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="width: 640px; min-width: 640px;" role="presentation" class="table-container ">
                    <tr>
                        <td height="60" style="line-height:60px;min-height:60px;">
                        </td>
                    </tr>
                    </table>
                    
                    <!--Main Td  Ends Here -->
                </td>
            </tr>
            </tbody>
            <!--Main Parent Table Ends Here -->
            </table>
            </body>
            </html>`
        }

        return await transporter.sendMail(mailOptions)
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}