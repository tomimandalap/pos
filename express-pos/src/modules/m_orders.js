const conn = require('../config/db')
module.exports = {
  mAllOrder: (search, pages) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM orders ${search} ORDER BY orders.created DESC ${pages}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mTotalOrders: (search) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT COUNT (*) as total FROM orders ${search}`,(err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mDetailOrder: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT *, orders.id as id FROM orders LEFT JOIN orderdetail ON orders.id=orderdetail.orderId LEFT JOIN products ON orderdetail.productid=products.id WHERE orders.id='${id}' ORDER BY orders.created DESC`,
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mAddOrders: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO orders SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mAddDetailOrder: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO orderdetail SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mReduceStock: (qty, productid) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE products SET stock=stock-'${qty}' WHERE id='${productid}'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mAddNewStocks: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO stocks SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mUpdateOrders: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE orders SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}