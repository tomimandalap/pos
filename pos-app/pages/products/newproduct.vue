<template>
  <v-container>
    <div v-if="errMsg">
      <p class="red--text">{{ message }}</p>
    </div>
    <Breadcrumbs />
    <div class="mt-5">
      <h3>Form New Product</h3>
    </div>
    <v-form v-model="isValue" @submit.prevent="submitProduct">
      <v-text-field
        v-model="formproduct.name"
        label="Name"
        type="text"
        :rules="[(v) => !!v || 'Name products required']"
        placeholder="Insert product name"
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="formproduct.stock"
        label="Stock"
        type="number"
        :rules="[(v) => !!v || 'Stock required']"
        placeholder="Insert product stock"
        required
      ></v-text-field>

      <v-text-field
        v-model="formproduct.price"
        label="Price"
        type="number"
        prepend-inner-icon="mdi-cash"
        :rules="[(v) => !!v || 'Price required']"
        placeholder="Insert product price"
        required
      ></v-text-field>
      <v-select
        v-model="formproduct.categoryid"
        :items="allCategory"
        :rules="[(v) => !!v || 'Categories riquired']"
        item-value="id"
        item-text="name"
        label="Categories"
        required
      ></v-select>
      <v-file-input
        accept="image/png/jpg"
        label="Image"
        :rules="[(v) => !!v || 'Image required']"
        placeholder="Insert product image"
        required
        @change="imgproduct"
      ></v-file-input>
      <v-btn color="warning" @click.stop="$router.push('/products')"
        >Cancel</v-btn
      >
      <v-btn
        :disabled="!isValue"
        :loading="loadingBtn"
        class="ml-4"
        type="submit"
        color="primary"
        >Submit</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/breadcrumbs'
import defaultdata from '@/helpers/defaultdata'
export default {
  components: {
    Breadcrumbs,
  },
  mixins: [defaultdata],
  middleware: 'auth',
  data: () => ({
    isValue: false,
    loadingBtn: false,
    errMsg: false,
    formproduct: {
      name: '',
      categoryid: '',
      price: '',
      stock: '',
      image: '',
    },
  }),
  head() {
    return {
      title: 'New Product',
    }
  },
  computed: {
    allCategory() {
      return this.$store.get('categories/dataCategories')
    },
    message() {
      return this.$store.get('products/message')
    },
  },
  mounted() {
    this.$store.dispatch('categories/getAllCategories', this.setData)
  },
  methods: {
    imgproduct(files) {
      const image = files
      if (image) {
        if (
          image.type !== 'image/jpeg' &&
          image.type !== 'image/png' &&
          image.type !== 'image/JPEG' &&
          image.type !== 'image/PNG'
        ) {
          alert('Please enter a jpg/jpeg/png')
        } else {
          this.formproduct.image = image
        }
      }
    },
    async submitProduct() {
      const fd = new FormData()
      fd.append('name', this.formproduct.name)
      fd.append('stock', this.formproduct.stock)
      fd.append('price', this.formproduct.price)
      fd.append('categoryid', this.formproduct.categoryid)
      fd.append('image', this.formproduct.image)
      this.loadingBtn = true
      const res = await this.$store.dispatch('products/postProducts', fd)
      if (res) {
        this.loadingBtn = false
        this.errMsg = false
        this.$router.push('/products')
      } else {
        this.errMsg = true
        this.loadingBtn = false
      }
    },
  },
}
</script>
