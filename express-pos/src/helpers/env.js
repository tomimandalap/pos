require('dotenv').config()

module.exports = {
  envPORT: process.env.PORT,
  envHOST: process.env.DBHOST,
  envUSER: process.env.DBUSER,
  envPASS: process.env.DBPASS,
  envNAME: process.env.DBNAME,
  envJWTKEY: process.env.JWTKEY,
  envEMAIL: process.env.EMAIL,
  envAPIKEY: process.env.MAILAPIKEY,
  envSECRETKEY: process.env.MAILSECRETKEY
}