<template>
  <v-container>
    <div>
      <v-alert v-model="errMsg" outlined text type="error">
        <v-row align="center" no-gutters>
          <v-col class="grow">
            {{ message }}
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="shrink">
            <v-btn icon small @click="errMsg = false"
              ><v-icon>mdi-close-circle-outline</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-alert>
    </div>
    <div style="background: #f5f5f5" class="mt-5">
      <v-breadcrumbs :items="items">
        <template #item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
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
              <th class="text-left">Actions</th>
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
              <td>
                <v-card-actions v-if="item.status === 1">
                  <v-btn
                    outlined
                    small
                    color="success"
                    class="text-capitalize"
                    @click="btnApprove(item.id)"
                    >Approve</v-btn
                  >
                </v-card-actions>
                <v-card-actions v-else>
                  <v-btn
                    outlined
                    small
                    color="primary"
                    class="text-capitalize"
                    @click="$router.push(`orders/detail/${item.id}`)"
                    >Detail</v-btn
                  >
                </v-card-actions>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>
<script>
import defaultdata from '@/helpers/defaultdata'
import formatdate from '@/helpers/formatdate'
import price from '@/helpers/price'
export default {
  mixins: [defaultdata, formatdate, price],
  middleware: 'auth',
  data() {
    return {
      loadPage: false,
      errMsg: false,
      items: [
        {
          text: 'Menus',
          disabled: false,
          to: '/menus',
        },
        {
          text: 'Orders',
          disabled: true,
          to: '/orders',
        },
      ],
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
    message() {
      return this.$store.get('orders/message')
    },
    user() {
      return this.$store.get('users/user')
    },
    // userDetail() {
    //   return this.$store.get('users/userDetail')
    // },
  },
  mounted() {
    this.loadPage = true
    this.$store.dispatch('orders/getAllOrder', this.setData)
    // this.$store.dispatch('users/detailUser', this.user.id)
    setTimeout(() => {
      this.loadPage = false
    }, 3000)
  },
  methods: {
    searchData() {
      this.$store.dispatch('orders/getAllOrder', this.setData)
    },
    async btnApprove(id) {
      const data = {
        operator: this.user.id,
        status: 2,
      }
      const res = await this.$store.dispatch('orders/updateOrder', { id, data })
      if (res) {
        this.$store.dispatch('orders/getAllOrder', this.setData)
      } else {
        this.$store.set('orders/message', 'Failed request!')
        this.errMsg = true
      }
    },
  },
}
</script>
