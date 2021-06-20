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
          @click="$router.push('/categories/newcategory')"
          ><v-icon>mdi-plus</v-icon> Category</v-btn
        >
        <v-spacer></v-spacer>
        <div class="mt-6">
          <v-text-field
            v-model="setData.keyword"
            placeholder="Search name categories"
            label="Seaching"
            outlined
            dense
            append-icon="mdi-card-search"
            @keyup="searchData()"
          ></v-text-field>
        </div>
      </v-app-bar>
      <v-card-title
        v-if="dataCategories.length == 0"
        class="d-flex justify-center"
      >
        <v-icon large>mdi-emoticon-neutral-outline</v-icon>
        <h4>Categories Empty</h4>
      </v-card-title>
      <v-card
        v-for="items in dataCategories"
        v-else
        :key="items.id"
        outlined
        class="pa-2 d-flex justify-space-between align-center ma-3"
      >
        <v-card-text class="d-block justify-space-between mt-5">
          <p class="font-weight-bold">{{ items.name }}</p>
          <p>Created: {{ setFormatDate(items.created) }}</p>
          <p>
            Updated:
            {{ !items.updated ? '-' : setFormatDate(items.updated) }}
          </p>
        </v-card-text>
        <v-card-actions class="d-block">
          <!-- md to sm -->
          <v-btn
            color="primary"
            class="text-capitalize mb-3 d-sm-block d-none"
            width="100%"
            @click="$router.push(`/categories/edit/${items.id}`)"
            >Edit</v-btn
          >
          <!-- xs -->
          <v-btn
            color="primary"
            class="text-capitalize mb-3 d-sm-none d-block"
            width="100%"
            small
            @click="$router.push(`/categories/edit/${items.id}`)"
            >Edit</v-btn
          >
          <v-spacer></v-spacer>
          <!-- md to sm -->
          <v-btn
            color="red darken-1"
            dark
            class="text-capitalize d-sm-block d-none"
            width="100%"
            @click="$router.push(`/categories/delete/${items.id}?modals=true`)"
            >Delete</v-btn
          >
          <!-- xs -->
          <v-btn
            color="red darken-1"
            dark
            class="text-capitalize d-sm-none d-block"
            width="100%"
            small
            @click="$router.push(`/categories/delete/${items.id}?modals=true`)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import defaultdata from '@/helpers/defaultdata'
import formatdate from '@/helpers/formatdate'
export default {
  components: {
    Breadcrumbs,
    Loading,
  },
  mixins: [defaultdata, formatdate],
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
    dataCategories() {
      return this.$store.get('categories/dataCategories')
    },
  },
  mounted() {
    this.loadPage = true
    this.$store.dispatch('categories/getAllCategories', this.setData)
    setTimeout(() => {
      this.loadPage = false
    }, 3000)
  },
  methods: {
    searchData() {
      this.$store.dispatch('categories/getAllCategories', this.setData)
    },
  },
}
</script>
