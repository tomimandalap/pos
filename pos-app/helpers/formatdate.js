const formatdate = {
  methods: {
    setFormatDate(data) {
      return new Date(data).toDateString()
    },
  },
}
export default formatdate
