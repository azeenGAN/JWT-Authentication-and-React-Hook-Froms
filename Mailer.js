import nodemailer from "nodemailer";
import dotenv from "dotenv"
import mailgen from "mailgen"
import writeFileSync from "fs"


dotenv.config()

var mailGenerator = new mailgen({
    theme: 'default',
    // Custom text direction
    product: {
        // Appears in header & footer of e-mails
        name: 'azeenGAN',
        link: 'https://en.wikipedia.org/wiki/Pakistan'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

export let funcToSendMail = async (usermail, username, date1) => {
    const originalDate = new Date(date1);
    const options = { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);
    var emailtemplate = {
        body: {
            greeting: 'Mr',
            name: username,
            dictionary: {
                date: formattedDate,
                address: '123 Park Avenue, Miami, Florida'
            },
            intro: 'Here is your e-receipt',
            table: {
                data: [
                    {
                        item: 'Node.js',
                        description: 'Event-driven I/O server-side JavaScript environment based on V8.',
                        price: '$10.99'
                    },
                    {
                        item: 'Mailgen',
                        description: 'Programmatically create beautiful e-mails .',
                        price: '$1.99'
                    }
                ],
                columns: {
                    // Optionally, customize the column widths
                    customWidth: {
                        item: '20%',
                        price: '15%'
                    },
                    // Optionally, change column text alignment
                    customAlignment: {
                        price: 'right'
                    }
                }
            },
            outro: 'Need help, or have questions then search for go disturb me'

        }
    }

    var mail = mailGenerator.generate(emailtemplate)

    let mailInfo = {

        from: '"SUKOON" <usemarajpoot3450@gmail.com>',
        to: usermail,
        subject: "Confirmation message about filling our form",
        html: mail
    }
    transporter.sendMail(mailInfo)
        .then(() => {

            console.log(`mail has been send to ${username}`)
        })
        .catch((error) => { throw new Error(error.message) })

}
