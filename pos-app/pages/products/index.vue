<template>
  <v-container>
    <Breadcrumbs />
    <v-card
      v-if="loadPage"
      outlined
      class="mt-5 overflow-y-auto"
      style="height: 350px"
    >
      <Loading />
    </v-card>
    <v-card v-else outlined class="mt-5 overflow-y-auto" style="height: 350px">
      <v-app-bar flat color="grey lighten-4" light>
        <v-btn
          color="success"
          class="text-capitalize mr-3"
          @click="$router.push('/products/newproduct')"
          ><v-icon>mdi-plus</v-icon> Product</v-btn
        >
        <v-spacer></v-spacer>
        <div class="mt-6">
          <v-text-field
            v-model="setData.keyword"
            placeholder="Search name product"
            label="Seaching"
            outlined
            dense
            append-icon="mdi-card-search"
            @keyup="searchData()"
          ></v-text-field>
        </div>
      </v-app-bar>
      <v-card-title
        v-if="dataProduct.length == 0"
        class="d-md-flex d-sm-none d-none justify-center"
      >
        <v-icon large>mdi-emoticon-neutral-outline</v-icon>
        <h4>Product Empty</h4>
      </v-card-title>
      <!-- md -->
      <v-card
        v-for="items in dataProduct"
        v-else
        :key="items.id"
        outlined
        class="pa-2 d-md-flex d-sm-none d-none justify-space-between ma-3"
      >
        <v-img
          :src="
            items.image
              ? `${staticurl}/api/v1/imgproducts/${items.image}`
              : `${staticurl}/api/v1/imgproducts/default.png`
          "
          width="120"
        ></v-img>
        <v-card-text class="d-md-flex justify-space-between mt-5">
          <p class="font-weight-bold">{{ items.name }}</p>
          <p>{{ items.category }}</p>
          <p>IDR. {{ conversiRp(items.price) }}</p>
          <p>Stock: {{ items.stock }}</p>
        </v-card-text>
        <v-card-actions class="d-md-flex">
          <v-btn
            color="primary"
            class="text-capitalize"
            @click="$router.push(`/products/edit/${items.id}`)"
            >Edit</v-btn
          >
          <v-btn
            color="red darken-1"
            dark
            class="text-capitalize"
            @click="$router.push(`/products/delete/${items.id}?modals=true`)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
      <!-- sm to xs -->
      <v-card-title
        v-if="dataProduct.length == 0"
        class="d-md-none d-sm-flex d-flex justify-center"
      >
        <v-icon large>mdi-emoticon-neutral-outline</v-icon>
        <h4>Product Empty</h4>
      </v-card-title>
      <v-card
        v-for="itm in dataProduct"
        v-else
        :key="itm.name"
        outlined
        class="pa-2 d-block d-sm-block d-md-none ma-5"
      >
        <v-img
          :src="
            itm.image
              ? `${staticurl}/api/v1/imgproducts/${itm.image}`
              : `${staticurl}/api/v1/imgproducts/default.png`
          "
          width="100%"
        ></v-img>
        <v-card-text>
          <p class="font-weight-bold">{{ itm.name }}</p>
          <p>{{ itm.category }}</p>
          <p>IDR. {{ conversiRp(itm.price) }}</p>
          <p>Stock: {{ itm.stock }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
            class="text-capitalize"
            @click="$router.push(`/products/edit/${itm.id}`)"
            >Edit</v-btn
          >
          <v-btn
            color="red darken-1"
            small
            dark
            class="text-capitalize"
            @click="$router.push(`/products/delete/${itm.id}?modals=true`)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-card>
    <!-- pagination -->
    <v-row class="mt-2 justify-end">
      <v-pagination
        v-model="setData.page"
        :length="totalPage"
        :total-visible="5"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        color="grey lighten-2"
        circle
        class="my-4"
        @input="pageProduct('')"
      ></v-pagination>
    </v-row>
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import price from '@/helpers/price'
import defaultdata from '@/helpers/defaultdata'
export default {
  components: {
    Breadcrumbs,
    Loading,
  },
  mixins: [price, defaultdata],
  middleware: 'auth',
  data() {
    return {
      loadPage: false,
    }
  },
  head() {
    return {
      title: `${
        this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)
      }`,
    }
  },
  computed: {
    staticurl() {
      return this.$store.get('staticURL')
    },
    dataProduct() {
      return this.$store.get('products/dataProduct')
    },
    totalPage() {
      return this.$store.get('products/totalPage')
    },
  },
  mounted() {
    this.loadPage = true
    this.$store.dispatch('products/getProducts', this.setData)
    setTimeout(() => {
      this.loadPage = false
    }, 3000)
  },
  methods: {
    searchData() {
      this.$store.dispatch('products/getProducts', this.setData)
    },
    pageProduct() {
      this.$store.dispatch('products/getProducts', this.setData)
    },
  },
}
</script>
