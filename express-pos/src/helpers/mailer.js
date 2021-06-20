const { envEMAIL, envAPIKEY, envSECRETKEY } = require('../helpers/env')
const mailjet = require("node-mailjet").connect(envAPIKEY, envSECRETKEY)
module.exports = {
  register: (mail, username, secret) => {
    const mailer = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: envEMAIL,
            Name: "Admin Coffee Shop",
          },
          To: [
            {
              Email: mail,
              Name: username,
            },
          ],
          Subject: "Verify your account! - ",
          HTMLPart: `
          <h4>Hello, ${username}!</h4>
          <p>Select user access and verify your account, please click : </p>
          <p>1. <a href="${process.env.PATHURL}/activation/${secret}/${mail}/Cashier/1">Cashier Coffee</a></p>
          <p>or</p>
          <p>2. <a href="${process.env.PATHURL}/activation/${secret}/${mail}/Customer/2">Customer Coffee</a></p>`,
          CustomID: "AppGettingStartedTest",
        }
      ]
    })
    return new Promise((resolve, reject) => {
      mailer
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
