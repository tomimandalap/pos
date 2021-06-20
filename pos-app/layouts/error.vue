<template>
  <v-app dark>
    <div v-if="error.statusCode === 404" class="mx-auto my-auto text-center">
      <v-icon x-large color="red lighten-2" class="mb-5"
        >mdi-emoticon-sad-outline</v-icon
      >
      <h4 class="mb-5">Sorry! We couldn't find it! (404)</h4>
      <v-btn outlined color="primary" @click="$router.push('/')">
        Go to dasboard
      </v-btn>
    </div>
    <div v-else>
      {{ otherError }}
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  computed: {
    idUser() {
      return this.$store.get('users/user')
    },
  },
}
</script>
<style scoped>
h1 {
  font-size: 20px;
}
</style>
