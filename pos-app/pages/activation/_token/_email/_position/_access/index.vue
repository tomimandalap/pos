<template>
  <div style="height: 100%">
    <!-- Success Activation -->
    <div
      v-if="status == 'ok'"
      class="d-flex justify-center"
      style="height: 100%"
    >
      <div class="align-self-center">
        <!-- <h1>
          <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        </h1> -->
        <h4>OK!</h4>
        <p>Your activation success!</p>
        <v-btn color="primary" @click="$router.push('/login')">
          Take me to login page
        </v-btn>
      </div>
    </div>
    <!-- Failed Activation -->
    <div
      v-if="status == 'failed'"
      class="d-flex justify-center"
      style="height: 100%"
    >
      <div class="align-self-center">
        <!-- <h1 class="text-muted">
          <b-icon icon="emoji-frown-fill" class="text-dark" />
        </h1> -->
        <h4>Something not good</h4>
        <p>
          Maybe, your token was expired or typo. Dont make any unique for token
          that requested for activation
        </p>
        <v-btn color="primary" @click="$router.push('/')">
          Go to dasboard
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  data: () => ({
    status: 'loading',
  }),
  head() {
    return {
      title: 'Activation',
    }
  },
  mounted() {
    setTimeout(() => {
      this.$axios
        .get(
          `/baseurl/api/v1/activate/${this.$route.params.token}/${this.$route.params.email}/${this.$route.params.position}/${this.$route.params.access}`
        )
        .then(() => {
          this.status = 'ok'
        })
        .catch((error) => {
          this.status = 'failed' || error.response
        })
    }, 1000)
  },
}
</script>
