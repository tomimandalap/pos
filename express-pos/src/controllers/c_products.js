const {
  mAddProduct,
  mAllProduct,
  mTotalProduct,
  mDetailProduct,
  mUpdateProduct,
  mDeleteProduct
} = require('../modules/m_products')
const { success, custom, failed } = require('../helpers/response')
const fs = require('fs')

module.exports = {
  addProduct: (req, res) => {
    const body = req.body
    body.image = req.file.filename
    if (!body.name || !body.categoryid || !body.price || !body.stock) {
      const locationPath = `./public/products/${req.file.filename}`
      fs.unlinkSync(locationPath)
      custom(res, 400, 'Bad request', {}, null)
    } else {
      mAddProduct(body).then(() => {
        custom(res, 201, 'Create product success!', {}, null)
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    }
  },
  allProduct: async(req, res) => {
    try {
      // searching
      const filter = req.query.filter ? req.query.filter : 'products.name'
      const keyword = req.query.keyword ? req.query.keyword : ''
      const search = filter ? `WHERE ${filter.toString().toLowerCase()} LIKE '%${keyword.toString().toLowerCase()}%'` : ''
      // sorting
      const sortby = req.query.sortby ? req.query.sortby : ''
      const orderby = req.query.orderby ? req.query.orderby : 'asc'
      const sorting =  sortby ? `ORDER BY ${sortby} ${orderby.toString().toLowerCase()}` : ''
      // pagination
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 10
      const start = page===1 ? 0 : (page-1)* limit
      const pages = page ? `LIMIT ${start}, ${limit}` : ''
      const totalPage = await mTotalProduct(search)
      mAllProduct(search, sorting, pages).then((response) => {
        if (response.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }
          success(res, 'Get all data user', pagination, response)
        } else {
          const pagination = {
            page: 1,
            limit: limit,
            total: 0,
            totalPage: 0
          }
          custom(res, 404, 'Data not found!', pagination, response)
        }
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    } catch (error) {
      failed(res, 'Internal server error!', error.message)
    }
  },
  detailProduct: (req, res) => {
    const id = req.params.id
    mDetailProduct(id).then((response) => {
      if (response.length > 0) {
        success(res, 'Detail product!', null, response)
      } else {
        custom(res, 404, 'Id product not found!', null, [])
      }
    }).catch((error) => {
      failed(res, 'Internal server error!', error.message)
    })
  },
  updateProduct: async(req, res) => {
    const body = req.body
    body.updated = new Date()
    const id = req.params.id
    const detail = await mDetailProduct(id)
    if (req.file) {
      body.image = req.file.filename
      const path = `./public/products/${detail[0].image}`
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }
      mUpdateProduct(body, id).then(() => {
        success(res, 'Update image product success!', {}, null)
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    } else {
      mUpdateProduct(body, id).then(() => {
        success(res, 'Update product success!', {}, null)
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    }
  },
  deleteProduct: async(req, res) => {
    try {
      const id = req.params.id
      const callDetail = await mDetailProduct(id)
      mDeleteProduct(id).then((response) => {
        if (response.affectedRows) {
          const locationPath = `./public/products/${callDetail[0].image}`
          fs.unlinkSync(locationPath)
          success(res, 'Delete product success!', {}, null)
        } else {
          custom(res, 404, 'Id product not found!', null, null)
        }
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    } catch (error) {
      failed(res, 'Internal server error!', error.message)
    }
  }
}