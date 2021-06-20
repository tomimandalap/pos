### ```Build with```
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [expressjs](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [node-mailjet](https://www.npmjs.com/package/node-mailjet)
- [nodemon](https://www.npmjs.com/package/nodemon)


### ```Installing```
Clone project 
```
git clone https://github.com/tomimandalap/pos.git
```
```
npm install
```
or
```
yarn install
```

### ```Starting```
Create an **.env** file first before running this application.
```
  Please copy and paste it into your .env file.
  
  PORT=5005
  DBHOST=localhost
  DBUSER=root
  DBPASS=
  DBNAME=coffeeshop
  JWTKEY=#coffeeshop1234
  EMAIL=examples@gmail.com *using your email
  MAILAPIKEY=xxxxxxxxx *using your MAIL API KEY
  MAILSECRETKEY=xxxxxxxxx *using your MAIL SECRET KEY
  PATHURL=http://localhost:3000 **
  
  Note: 
  * Read the guide https://www.npmjs.com/package/node-mailjet and create an account https://www.mailjet.com/
  ** URL Running on NUXTJS
  
```

To start use
```
npm run start
```
or
```
yarn start
```

---
