<template>
  <v-container>
    <div v-if="errMsg">
      <p class="red--text">{{ message }}</p>
    </div>
    <Breadcrumbs />
    <div class="mt-5">
      <h3>Form New Category</h3>
    </div>
    <v-form v-model="isValue">
      <v-select
        v-model="formstock.productid"
        :items="dataProduct"
        :rules="[(v) => !!v || 'Products riquired']"
        item-value="id"
        item-text="name"
        label="Products"
        required
      ></v-select>
      <v-text-field
        v-model="formstock.qty"
        label="Quantity"
        type="number"
        :rules="[(v) => !!v || 'Quatity required']"
        placeholder="Insert quantity"
        required
      ></v-text-field>
      <v-textarea
        v-model="formstock.remark"
        name="input-2-1"
        label="Remark"
        type="text"
        :rules="[(v) => !!v || 'Remark required']"
        placeholder="Input text Add or Reduce or Adjustmen"
        hint="Remark wajib diisi!"
        class="mb-5"
      ></v-textarea>
      <!-- sm upto md lg -->
      <div class="d-sm-flex d-none">
        <v-btn color="warning" @click.stop="$router.push('/stocks')"
          >Cancel</v-btn
        >
        <v-btn
          :disabled="!isValue"
          :loading="loadingBtn1"
          class="ml-2"
          color="success"
          dark
          @click="addStock"
          >Add</v-btn
        >
        <v-btn
          :disabled="!isValue"
          :loading="loadingBtn2"
          class="ml-2"
          color="primary"
          dark
          @click="reduceStock"
          >Reduce</v-btn
        >
        <v-btn
          :disabled="!isValue"
          :loading="loadingBtn3"
          class="ml-2"
          color="red ligthen-4"
          dark
          @click="adjusmentStock"
          >Adjusment</v-btn
        >
      </div>
      <!-- xs -->
      <v-row class="d-sm-none d-flex justify-center">
        <v-col cols="6">
          <v-btn
            color="warning"
            small
            width="100%"
            @click.stop="$router.push('/stocks')"
            >Cancel</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            :disabled="!isValue"
            :loading="loadingBtn1"
            color="success"
            dark
            small
            width="100%"
            @click="addStock"
            >Add</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            :disabled="!isValue"
            :loading="loadingBtn2"
            color="primary"
            dark
            small
            width="100%"
            @click="reduceStock"
            >Reduce</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            :disabled="!isValue"
            :loading="loadingBtn3"
            color="red ligthen-4"
            dark
            small
            width="100%"
            @click="adjusmentStock"
            >Adjusment</v-btn
          >
        </v-col>
      </v-row>
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
    errMsg: false,
    message: '',
    isValue: false,
    loadingBtn1: false,
    loadingBtn2: false,
    loadingBtn3: false,
    formstock: {
      productid: '',
      category: '',
      qty: '',
      operator: '',
      remark: '',
    },
  }),
  computed: {
    dataProduct() {
      return this.$store.get('products/dataProduct')
    },
  },
  mounted() {
    this.$store.dispatch('products/getProducts', this.setData)
  },
  methods: {
    async addStock() {
      this.formstock.category = '0'
      this.formstock.operator = localStorage.getItem('idUser')
      this.loadingBtn1 = true
      const res = await this.$store.dispatch('stocks/postStock', this.formstock)
      if (res) {
        this.loadingBtn1 = false
        this.$router.push('/stocks')
      } else {
        this.loadingBtn1 = false
      }
    },
    async reduceStock() {
      this.formstock.category = '1'
      this.formstock.operator = localStorage.getItem('idUser')
      this.loadingBtn2 = true
      const res = await this.$store.dispatch('stocks/postStock', this.formstock)
      if (res) {
        this.loadingBtn2 = false
        this.$router.push('/stocks')
      } else {
        this.loadingBtn2 = false
      }
    },
    async adjusmentStock() {
      this.formstock.category = '2'
      this.formstock.operator = localStorage.getItem('idUser')
      this.loadingBtn3 = true
      const res = await this.$store.dispatch('stocks/postStock', this.formstock)
      if (res) {
        this.loadingBtn3 = false
        this.$router.push('/stocks')
      } else {
        this.loadingBtn3 = false
      }
    },
  },
}
</script>
