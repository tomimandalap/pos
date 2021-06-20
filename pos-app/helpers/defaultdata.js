const defaultdata = {
  data() {
    return {
      setData: {
        filter: '',
        keyword: '',
        sortby: '',
        orderby: 'desc',
        page: 1,
        limit: 20,
      },
      setDataDasboard: [
        {
          id: 1,
          title: 'Products',
          total: 0,
        },
        {
          id: 2,
          title: 'Categories',
          total: 0,
        },
        {
          id: 3,
          title: 'Stocks',
          total: 0,
        },
        {
          id: 4,
          title: 'Reports',
          total: 0,
        },
      ],
    }
  },
}

export default defaultdata
