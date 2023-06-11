import express from 'express'
import nodemailer from 'nodemailer'

const app = express()

let transporter = nodemailer.createTransport ({ // Genero la forma de neviar info desde mail (a donde y desde que cuenta)
  host: 'smtp.gmail.com', // Defino que voy a usar un servicio de Gmail
  port: 465,
  secure: true,
  auth: {
    user: "federico.dinuzzo.soluciones@gmail.com", // Mail del que se envia info
    pass: "plkitoiudlkdvynx",
    authMethod: 'LOGIN'
  }
})

app.get('/mail', async (req,res) => {
  await transporter.sendMail({
    from: 'Test Coder <federico.dinuzzo.soluciones@gmail.com>',
    to: "federicodinuzzo98@gmail.com",
    subject: "Saludos, buenas noches",
    html: `
      <div>
        <h2>Hola, saludos desde la clase coder</h2>
      </div>
    `,
    attachments: [{
      filename: 'bobSponja.jpg',
      path:'./src/images/bobSponja.jpg',
      cid:'bobSponja'
    }]
  })

  res.send("Email enviado")
})

app.listen(4000, () => {
  console.log("Server on Port 4000")
})