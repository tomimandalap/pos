<template>
  <v-container>
    <v-card
      v-if="loadPage"
      outlined
      class="mt-5 overflow-y-auto"
      style="height: 350px"
    >
      <Loading />
    </v-card>
    <v-card v-else outlined class="mt-5 overflow-y-auto" style="height: 400px">
      <v-card
        v-for="(itm, i) in detailOrder"
        :key="i"
        outlined
        class="mb-3 d-flex justify-space-between align-center pa-2"
      >
        <v-img
          :src="`${staticURL}/api/v1/imgproducts/${itm.image}`"
          max-width="120px"
        ></v-img>
        <v-card-text class="d-sm-flex d-none justify-space-between">
          <p class="font-weight-bold">{{ itm.name }}</p>
          <p>
            Order number: <b>{{ itm.ordernumber }}</b>
          </p>
          <p>
            Customer: <b>{{ itm.customer }}</b>
          </p>
          <p>
            Qty: <b>{{ itm.qty }}</b> item
          </p>
        </v-card-text>
        <v-card-text class="d-sm-none d-block">
          <p class="font-weight-bold">{{ itm.name }}</p>
          <p>
            Qty: <b>{{ itm.qty }}</b> item
          </p>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card color="grey lighten-3" class="mt-5">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="$router.push('/orders')"
          >Back</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import price from '@/helpers/price'
export default {
  mixins: [price],
  middleware: 'auth',
  data() {
    return {
      id: this.$route.params.id,
      loadPage: false,
    }
  },
  head() {
    return {
      title: 'Detail Order',
    }
  },
  computed: {
    staticURL() {
      return this.$store.get('staticURL')
    },
    detailOrder() {
      return this.$store.get('orders/detailOrder')
    },
  },
  async mounted() {
    this.loadPage = true
    const res = await this.$store.dispatch('orders/getDetailOrder', this.id)
    if (res) {
      this.loadPage = false
    }
  },
}
</script>
