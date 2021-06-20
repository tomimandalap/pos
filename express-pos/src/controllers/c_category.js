const {
  mAddCategory,
  mAllCategory,
  mTotalCategory,
  mDetailCategory,
  mUpdateCategory,
  mDeleteCategory
} = require('../modules/m_category')
const { custom, success, failed } = require('../helpers/response')
module.exports = {
  addCategory: (req, res) => {
    const body = req.body
    if (!body.name) {
      custom(res, 400, 'Bad request!', {}, null)
    } else {
      mAddCategory(body).then(() => {
        custom(res, 201, 'Create category success!', {}, null)
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    }
  },
  allCategory: async(req, res) => {
    try {
      // searching
      const filter = req.query.filter ? req.query.filter : 'name'
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
      const totalPage = await mTotalCategory(search)
      mAllCategory(search, sorting, pages).then((response) => {
        if (response.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total/limit)
          }
          success(res, 'Get all category!', pagination, response)
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
  detailCategory: (req, res) => {
    const id = req.params.id
    mDetailCategory(id).then((response) => {
      if (response.length > 0) {
        success(res, 'Detail category', null, response)
      } else {
        custom(res, 404, 'Id category not found!', null, null)
      }
    }).catch((error) => {
      failed(res, 'Internal server error!', error.message)
    })
  },
  updateCategory: async(req, res) => {
    const body = req.body
    body.updated = new Date()
    const id = req.params.id
    mUpdateCategory(body, id).then((response) => {
      if (response.affectedRows) {
        success(res, 'Update category success!', null, null)
      } else {
        custom(res, 404, 'Id category not found!', null, null)
      }
    }).catch((error) => {
      failed(res, 'Internal server error!', error.message)
    })
  },
  deleteCategory: async(req, res) => {
    try {
      const id = req.params.id
      mDeleteCategory(id).then((response) => {
        if (response.affectedRows) {
          success(res, 'Delete category success!', null, null)
        } else {
          custom(res, 404, 'Id category not found!', null, null)
        }
      }).catch((error) => {
        failed(res, 'Internal server error!', error.message)
      })
    } catch (error) {
      failed(res, 'Internal server error!', error.message)
    }
  }
}