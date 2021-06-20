module.exports = {
  custom: (res, code, message, pagination, data) => {
    const response = {
      code,
      message,
      pagination,
      data
    }
    res.status(code).json(response)
  },
  success: (res, message, pagination, data) => {
    const response = {
      code: 200,
      message,
      pagination,
      data
    }
    res.status(200).json(response)
  },
  failed: (res, message, statusTxt) => {
    const response = {
      code: 500,
      message,
      statusTxt
    }
    res.status(500).json(response)
  }
}