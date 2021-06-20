const {
  mAllOrder,
  mTotalOrders,
  mDetailOrder,
  mAddOrders,
  mAddDetailOrder,
  mReduceStock,
  mAddNewStocks,
  mUpdateOrders,
} = require("../modules/m_orders");
const { custom, success, failed } = require("../helpers/response");
exports.allOrder = async (req, res) => {
  try {
    // searching
    const filter = req.query.filter ? req.query.filter : "ordernumber";
    const keyword = req.query.keyword ? req.query.keyword : "";
    const search = filter
      ? `WHERE ${filter.toString().toLowerCase()} LIKE '%${keyword
          .toString()
          .toLowerCase()}%'`
      : "";
    // pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : "";
    const totalPage = await mTotalOrders(search);
    mAllOrder(search, pages)
      .then((response) => {
        if (response.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          success(res, "Get all order", pagination, response);
        } else {
          const pagination = {
            page: 1,
            limit: limit,
            total: 0,
            totalPage: 0,
          };
          custom(res, 404, "Data not found!", pagination, response);
        }
      })
      .catch((error) => {
        failed(res, "Internal server error!xx", error.message);
      });
  } catch (error) {
    failed(res, "Internal server error!", error.message);
  }
};
exports.detailOrder = (req, res) => {
  const id = req.params.id;
  mDetailOrder(id)
    .then((response) => {
      if (response.length > 0) {
        success(res, "Detail order", null, response);
      } else {
        custom(res, "Id not found!", null, null);
      }
    })
    .catch((error) => {
      failed(res, "Internal server error!", error.message);
    });
};
exports.addOrder = (req, res) => {
  const body = req.body;
  if (
    !body.customer ||
    // !body.operator ||
    !body.subtotal ||
    !body.payment ||
    !body.status
  ) {
    custom(res, 400, "Bad request!", null, null);
  } else {
    const data = {
      ordernumber: `${new Date().valueOf()}`,
      customer: body.customer,
      operator: body.operator,
      subtotal: body.subtotal,
      payment: body.payment,
      status: body.status,
    };
    mAddOrders(data)
      .then((response) => {
        custom(res, 201, "Add orders success!", null, response);
      })
      .catch((error) => {
        failed(res, "Internal server error!", error.message);
      });
  }
};
exports.addDetailOrder = (req, res) => {
  const orderid = req.body.orderid;
  const productid = req.body.productid;
  const price = req.body.price;
  const qty = req.body.qty;
  const total = req.body.total;
  const operator = req.body.operator;

  if (!orderid || !productid || !price || !qty || !total || !operator) {
    custom(res, 400, "Bad request!", null, null);
  } else {
    const dataDetail = {
      orderid,
      productid,
      price,
      qty,
      total,
      remark: null,
    };
    mAddDetailOrder(dataDetail)
      .then(() => {
        mReduceStock(qty, productid)
          .then(() => {
            const addStock = {
              productid,
              category: "1",
              qty,
              operator,
              remark: "Transaction",
            };
            mAddNewStocks(addStock)
              .then(() => {
                success(res, "Success Add Detail", null, null);
              })
              .catch((error) => {
                failed(res, "Internal server error!", error.message);
              });
          })
          .catch((error) => {
            failed(res, "Internal server error!", error.message);
          });
      })
      .catch((error) => {
        failed(res, "Internal server error!", error.message);
      });
  }
};
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!req.body.operator || !req.body.status) {
    custom(res, 400, "Bad request!", null, null);
  } else {
    mUpdateOrders(body, id)
      .then((response) => {
        if (response.affectedRows) {
          success(res, "Update orders success!", null, null);
        } else {
          custom(res, 404, "Id orders not found!", null, null);
        }
      })
      .catch((error) => {
        failed(res, "Internal server error!", error.message);
      });
  }
};
