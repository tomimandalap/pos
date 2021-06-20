<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="
        $route.path != '/register' &&
        $route.path != '/login' &&
        $route.name != 'activation-token-email-position-access' &&
        $route.name != null &&
        idUser.access === 0
      "
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in admin"
          :key="i"
          :to="item.title != 'Logout' ? item.to : ''"
          router
          exact
          :class="item.title == 'Logout' ? 'cursor list' : 'cursor list'"
          @click="item.title == 'Logout' ? logout() : ''"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="
        $route.path != '/register' &&
        $route.path != '/login' &&
        $route.name != 'activation-token-email-position-access' &&
        $route.name != null
      "
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon
        v-if="idUser.access === 0"
        @click.stop="drawer = !drawer"
      />
      <v-btn
        v-if="idUser.access === 0"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn v-if="idUser.access === 0" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title
        v-text="
          $route.name == 'index'
            ? 'Dasboard'
            : $route.name.charAt(0).toUpperCase() + $route.name.slice(1)
        "
      />
      <v-spacer />
      <v-btn
        v-if="idUser.access !== 0 && idUser.access !== 2"
        icon
        @click="$router.push('/orders')"
      >
        <v-icon color="primary">mdi-order-bool-descending</v-icon>
      </v-btn>
      <!-- md -->
      <v-btn
        v-if="idUser.access !== 0"
        icon
        disabled
        class="d-md-block d-sm-none d-none"
      >
        <v-badge color="green" :content="`${indexCart}`" overlap top
          ><v-icon color="success">mdi-cart-minus</v-icon></v-badge
        >
      </v-btn>
      <!-- sm to xs -->
      <v-btn
        v-if="idUser.access !== 0"
        icon
        class="d-md-none d-sm-block d-block"
        @click="cartBtn"
      >
        <v-badge color="green" :content="`${indexCart}`" overlap top
          ><v-icon color="success">mdi-cart-minus</v-icon></v-badge
        >
      </v-btn>
      <v-btn v-if="idUser.access !== 0" icon @click="logout">
        <v-icon color="red lighten-2">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- <v-container fluid> -->
      <nuxt />
      <!-- </v-container> -->
    </v-main>
    <!-- <v-navigation-drawer
      v-if="idUser.access !== 0"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      admin: [
        {
          icon: 'mdi-home',
          title: 'Dasoard',
          to: '/',
        },
        {
          icon: 'mdi-bookmark',
          title: 'Products',
          to: '/products',
        },
        {
          icon: 'mdi-bookmark',
          title: 'Categories',
          to: '/categories',
        },
        {
          icon: 'mdi-apps',
          title: 'Stocks',
          to: '/stocks',
        },
        {
          icon: 'mdi-notebook',
          title: 'Reports',
          to: '/reports',
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    idUser() {
      return this.$store.get('users/user')
    },
    indexCart() {
      return this.$store.get('cart/indexCart')
    },
    totalCart() {
      return this.$store.get('cart/totalCart')
    },
  },
  mounted() {},
  methods: {
    cartBtn() {
      this.$store.dispatch('setDialog', true)
    },
    logout() {
      const res = this.$store.dispatch('users/postLogout')
      if (res) {
        this.$router.push('/login')
      }
    },
  },
}
</script>
