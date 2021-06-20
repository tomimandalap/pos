const conn = require('../config/db')
module.exports = {
  mAddStock: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO stocks SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProductStock: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE products SET stock=${data}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mAllStock: (search, sorting, pages) => {
    return new Promise((resolve, reject) => {
      conn.query(`
      SELECT stocks.id AS id, stocks.productid AS productid, stocks.category AS category, stocks.qty AS qty, stocks.operator AS operator, stocks.remark AS remark, stocks.created AS created, stocks.updated AS updated, users.username AS username, CONCAT_WS(' ', users.firstname, users.lastname) AS name 
      FROM stocks LEFT JOIN products ON stocks.productId=products.id LEFT JOIN users ON stocks.operator=users.id
      ${search} ${sorting} ${pages}`
      , (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mTotalStock: (search) => {
    return new Promise((resolve, reject) => {
      conn.query(`
      SELECT stocks.id AS id, stocks.productid AS productid, stocks.category AS category, stocks.qty AS qty, stocks.operator AS operator, stocks.remark AS remark, stocks.created AS created, stocks.updated AS updated, users.username AS username, CONCAT_WS(' ', users.firstname, users.lastname) AS name, 
      COUNT (*) AS total FROM stocks LEFT JOIN products ON stocks.productId=products.id LEFT JOIN users ON stocks.operator=users.id
      ${search}`
      ,(error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  mDetailStock: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`
      SELECT stocks.id AS id, stocks.productid AS productid, stocks.category AS category, stocks.qty AS qty, stocks.operator AS operator, stocks.remark AS remark, stocks.created AS created, stocks.updated AS updated, users.username AS username, CONCAT_WS(' ', users.firstname, users.lastname) AS name 
      FROM stocks LEFT JOIN products ON stocks.productId=products.id LEFT JOIN users ON stocks.operator=users.id
      WHERE stocks.id='${id}'`
      , (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mDetailProductStockId: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`
      SELECT stocks.id AS id, stocks.productid AS productid, stocks.category AS category, stocks.qty AS qty, stocks.operator AS operator, stocks.remark AS remark, stocks.created AS created, stocks.updated AS updated, users.username AS username, CONCAT_WS(' ', users.firstname, users.lastname) AS name 
      FROM stocks LEFT JOIN products ON stocks.productId=products.id LEFT JOIN users ON stocks.operator=users.id
      WHERE stocks.productid='${id}'`
      , (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}