<template>
  <v-container>
    <div v-if="errMsg">
      <p class="red--text">{{ message }}</p>
    </div>
    <Breadcrumbs />
    <div class="mt-5">
      <h3>Form New Category</h3>
    </div>
    <v-form v-model="isValue" @submit.prevent="submitCategory">
      <v-text-field
        v-model="formcategory.name"
        label="Name"
        type="text"
        :rules="[(v) => !!v || 'Name category required']"
        placeholder="Insert category name"
        required
        autofocus
      ></v-text-field>
      <v-btn color="warning" @click.stop="$router.push('/categories')"
        >Cancel</v-btn
      >
      <v-btn
        :disabled="!isValue"
        :loading="loadingBtn"
        class="ml-4"
        type="submit"
        color="primary"
        >Submit</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/breadcrumbs'
export default {
  components: {
    Breadcrumbs,
  },
  middleware: 'auth',
  data() {
    return {
      errMsg: false,
      isValue: false,
      loadingBtn: false,
      message: '',
      formcategory: {
        name: '',
      },
    }
  },
  head() {
    return {
      title: 'New Category',
    }
  },
  methods: {
    async submitCategory() {
      this.loadingBtn = true
      const res = await this.$store.dispatch(
        'categories/postCategory',
        this.formcategory
      )
      if (res) {
        this.loadingBtn = false
        this.$router.push('/categories')
      } else {
        this.errMsg = true
      }
    },
  },
}
</script>
