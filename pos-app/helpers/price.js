const price = {
  methods: {
    conversiRp(values) {
      return values.toLocaleString('id').split(',').join('.')
    },
  },
}
export default price
