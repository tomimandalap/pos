<template>
  <v-container>
    <v-row class="mt-8">
      <v-col md="8" sm="12" cols="12">
        <v-card v-if="loadPage" outlined height="440px">
          <Loading />
        </v-card>
        <v-card v-else outlined height="440px" class="pa-2 overflow-y-auto">
          <v-card-text v-if="!dataCart" class="row justify-center">
            <p style="margin-top: 30vh">
              <v-icon large>mdi-emoticon-sad</v-icon> Your cart is empty!
            </p>
          </v-card-text>
          <v-card
            v-for="itm in dataCart"
            v-else
            :key="itm.id"
            outlined
            class="mb-2 pa-2 d-flex justify-space-between align-center"
          >
            <v-img
              :src="`${staticURL}/api/v1/imgproducts/${itm.image}`"
              max-width="100px"
            ></v-img>
            <v-card-subtitle class="d-md-flex d-sm-none d-none">
              <p class="font-weight-bold text-truncate">{{ itm.name }}</p>
            </v-card-subtitle>
            <v-card-subtitle>
              <p class="text-truncate">Qty : {{ itm.qty }} item</p>
            </v-card-subtitle>
          </v-card>
        </v-card>
      </v-col>
      <v-col md="4" sm="12" cols="12">
        <v-card v-if="loadPage" outlined height="440px" class="pa-2">
          <Loading />
        </v-card>
        <v-card
          v-else
          outlined
          height="440px"
          class="pa-2 overflow-x-hidden overflow-y-auto"
        >
          <v-card-actions v-if="!dataCart">
            <v-btn
              color="primary"
              width="100%"
              dark
              class="text-capitalize"
              @click="$router.push('/menus')"
              >Back to menu</v-btn
            >
          </v-card-actions>
          <v-form v-else v-model="isValue" @submit.prevent="paymentBtn">
            <v-text-field
              v-model="formuser.customer"
              type="text"
              label="Name Customer"
              :rules="[(v) => !!v || 'Name customer required']"
              placeholder="Input name customer"
              class="mb-5"
              required
            ></v-text-field>
            <v-select
              v-model="formuser.payment"
              :items="items"
              label="Payment methods"
              :rules="[(v) => !!v || 'Paymen methods required']"
              dense
            ></v-select>
            <!-- struc -->
            <v-card-title>
              <h5>Struck</h5>
              <v-spacer></v-spacer>
              <h5>Code Pesanan</h5>
            </v-card-title>
            <v-card-text>
              <!-- <div class="d-flex justify-space-between">
                <p>Cashier</p>
                <p class="font-weight-bold">Mika Tambayong</p>
              </div> -->
              <div class="d-flex justify-space-between">
                <p>Subtotal</p>
                <p class="font-weight-bold">IDR. {{ conversiRp(totalCart) }}</p>
              </div>
              <div class="d-flex justify-space-between">
                <p>ppn * 10%</p>
                <p class="font-weight-bold">IDR. {{ conversiRp(ppn) }}</p>
              </div>
              <div class="d-flex justify-space-between">
                <p>Total</p>
                <p class="font-weight-bold">IDR. {{ conversiRp(total) }}</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="!isValue"
                :loading="loadingBtn"
                type="submit"
                color="success"
                width="100%"
                class="text-capitalize"
                >Order</v-btn
              >
            </v-card-actions>
            <v-card-actions>
              <v-btn
                color="red lighten-1"
                width="100%"
                dark
                class="text-capitalize"
                @click="cancelCart"
                >Cencel</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Loading from '@/components/loading'
import price from '@/helpers/price'
export default {
  components: {
    Loading,
  },
  mixins: [price],
  middleware: 'auth',
  data: () => ({
    ppn: 0,
    total: 0,
    isValue: false,
    loadingBtn: false,
    loadPage: false,
    formuser: {
      customer: '',
      payment: '',
    },
    items: ['Cash', 'Gopay', 'Ovo', 'Dana', 'Shopee Pay'],
  }),
  computed: {
    staticURL() {
      return this.$store.get('staticURL')
    },
    dataCart() {
      return this.$store.get('cart/dataCart')
    },
    totalCart() {
      return this.$store.get('cart/totalCart')
    },
    insertId() {
      return this.$store.get('cart/insertId')
    },
    message() {
      return this.$store.get('cart/message')
    },
  },
  mounted() {
    this.loadPage = true
    setTimeout(() => {
      this.loadPage = false
      this.ppn = this.totalCart * 0.1
      this.total = this.totalCart + this.ppn
    }, 3000)
  },
  methods: {
    async paymentBtn() {
      const params = {
        customer: this.formuser.customer,
        operator: null,
        subtotal: this.total,
        payment: this.formuser.payment,
        status: 1, // 1 pending & 2 approve
      }
      const res = await this.$store.dispatch('cart/postOrder', params)
      if (res) {
        this.dataCart.forEach((e) => {
          const detailData = {
            orderid: this.insertId,
            productid: e.id,
            price: e.price,
            qty: e.qty,
            total: e.qty * e.price,
            remark: 'Transaction',
            operator: 2,
          }
          const detail = this.$store.dispatch(
            'cart/postDetailOrder',
            detailData
          )
          if (detail) {
            // alert('Order success!')
            this.$store.set('stateDialog', false)
            this.$router.push('/menus')
          } else {
            alert('Oder bermasalah!')
            this.$store.set('stateDialog', false)
            this.$router.push('/menus')
          }
        })
      } else {
        // console.log(this.message)
      }
    },
    cancelCart() {
      this.$store.set('stateDialog', false)
      this.$store.dispatch('cart/setTotal', 0)
      this.$store.dispatch('cart/setIndex', 0)
      this.$router.push('/menus')
    },
  },
}
</script>
