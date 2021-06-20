<template>
  <v-container>
    <div v-if="stsMsg">
      <p class="red--text">{{ message }}</p>
    </div>
    <Breadcrumbs />
    <div class="mt-5">
      <h3>Form Edit Product</h3>
    </div>
    <Loading v-if="loadPage" />
    <v-row v-else class="mt-5">
      <v-col md="4" sm="5" cols="12">
        <v-card outlined style="height: 100%">
          <v-img :src="`${staticURL}/api/v1/imgproducts/${image}`" />
          <v-card-actions class="text-center">
            <input
              id="fileImageProfile"
              type="file"
              accept="image/png/jpg"
              class="d-none"
              @input="changeImgProduct"
            />
            <v-btn
              :loading="loadingBtnImg"
              outlined
              color="success"
              rounded
              onclick="document.getElementById('fileImageProfile').click()"
              class="text-capitalize mt-5 mb-5"
              width="100%"
            >
              Change
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="8" sm="7" cols="12">
        <v-form v-model="isValue" @submit.prevent="submitEditProduct">
          <v-text-field
            v-model="formeditproduct.name"
            label="Name"
            type="text"
            :rules="[(v) => !!v || 'Name products required']"
            placeholder="Insert product name"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="formeditproduct.stock"
            label="Stock"
            type="number"
            :rules="[(v) => !!v || 'Stock required']"
            placeholder="Insert product stock"
            required
          ></v-text-field>
          <v-text-field
            v-model="formeditproduct.price"
            label="Price"
            type="number"
            prepend-inner-icon="mdi-cash"
            :rules="[(v) => !!v || 'Price required']"
            placeholder="Insert product price"
            required
          ></v-text-field>
          <v-select
            v-model="formeditproduct.categoryid"
            :items="allCategory"
            :rules="[(v) => !!v || 'Categories riquired']"
            item-value="id"
            item-text="name"
            label="Categories"
            required
          ></v-select>
          <v-btn color="warning" @click.stop="$router.push('/products')"
            >Cancel</v-btn
          >
          <v-btn
            :disabled="!isValue"
            :loading="loadingBtn"
            class="ml-4"
            type="submit"
            color="primary"
            >Update</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import defaultdata from '@/helpers/defaultdata'
export default {
  components: {
    Breadcrumbs,
    Loading,
  },
  mixins: [defaultdata],
  middleware: 'auth',
  data() {
    return {
      id: this.$route.params.id,
      isValue: false,
      loadingBtn: false,
      loadingBtnImg: false,
      loadPage: false,
      stsMsg: false,
      image: '',
      formeditproduct: {
        name: '',
        categoryid: '',
        price: '',
        stock: '',
      },
    }
  },
  head() {
    return {
      title: 'Edit Products',
    }
  },
  computed: {
    staticURL() {
      return this.$store.get('staticURL')
    },
    allCategory() {
      return this.$store.get('categories/dataCategories')
    },
    detailProduct() {
      return this.$store.get('products/detailProduct')
    },
    message() {
      return this.$store.get('products/message')
    },
  },
  mounted() {
    this.$store.dispatch('categories/getAllCategories', this.setData)
    this.$store.dispatch('products/getDetailProduct', this.id)
    this.loadPage = true
    setTimeout(() => {
      this.loadPage = false
      this.formeditproduct.name = this.detailProduct[0].name
      this.formeditproduct.categoryid = this.detailProduct[0].categoryid
      this.formeditproduct.price = this.detailProduct[0].price
      this.formeditproduct.stock = this.detailProduct[0].stock
      this.image = this.detailProduct[0].image
    }, 3000)
  },
  methods: {
    async changeImgProduct(e) {
      const image = e.target.files[0]
      if (image) {
        if (
          image.type !== 'image/jpeg' &&
          image.type !== 'image/png' &&
          image.type !== 'image/JPEG' &&
          image.type !== 'image/PNG'
        ) {
          alert('Please enter a jpg/jpeg/png')
        } else {
          this.imageUrl = ''
          this.imageRaw = ''
          this.imageUrl = URL.createObjectURL(image)
          this.imageRaw = image
          const fd = new FormData()
          fd.append('image', this.imageRaw)

          this.loadingBtnImg = true
          const res = await this.$store.dispatch('products/updateProduct', {
            id: this.id,
            data: fd,
          })
          if (res) {
            this.stsMsg = true
            this.loadingBtnImg = false
            this.$router.push('/products')
          } else {
            this.stsMsg = true
            this.loadingBtnImg = false
          }
        }
      }
    },
    async submitEditProduct() {
      this.loadingBtn = true
      const res = await this.$store.dispatch('products/updateProduct', {
        id: this.id,
        data: this.formeditproduct,
      })
      if (res) {
        this.stsMsg = true
        this.loadingBtn = false
        this.$router.push('/products')
      } else {
        this.stsMsg = true
        this.loadingBtn = false
      }
    },
  },
}
</script>
