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
    <v-card v-else outlined class="mt-5">
      <v-app-bar flat color="grey lighten-4" light>
        <v-spacer></v-spacer>
        <div class="mt-6">
          <v-text-field
            v-model="setData.keyword"
            type="number"
            placeholder="Search ordernumber"
            label="Seaching"
            outlined
            dense
            append-icon="mdi-card-search"
            @keyup="searchData()"
          ></v-text-field>
        </div>
      </v-app-bar>
      <v-simple-table fixed-header height="300px">
        <template #default>
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Order Number</th>
              <th class="text-left">Customer</th>
              <th class="text-left">Operator</th>
              <th class="text-left">Total</th>
              <th class="text-left">Payment</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dataOrders.length === 0">
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Order</td>
              <td>Empty!</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr v-for="item in dataOrders" v-else :key="item.name">
              <td>{{ setFormatDate(item.created) }}</td>
              <td>{{ item.ordernumber }}</td>
              <td>{{ item.customer }}</td>
              <td>{{ item.operator ? item.operator : '-' }}</td>
              <td>IDR. {{ conversiRp(item.subtotal) }}</td>
              <td>{{ item.payment }}</td>
              <td>{{ item.status === 1 ? 'Pending' : 'Approve' }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/breadcrumbs'
import defaultdata from '@/helpers/defaultdata'
import formatdate from '@/helpers/formatdate'
import price from '@/helpers/price'
export default {
  components: {
    Breadcrumbs,
  },
  mixins: [defaultdata, formatdate, price],
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
    dataOrders() {
      return this.$store.get('orders/dataOrders')
    },
  },
  mounted() {
    this.loadPage = true
    this.$store.dispatch('orders/getAllOrder', this.setData)
    setTimeout(() => {
      this.loadPage = false
    }, 3000)
  },
  methods: {
    searchData() {
      this.$store.dispatch('orders/getAllOrder', this.setData)
    },
  },
}
</script>
