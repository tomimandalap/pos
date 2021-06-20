<template>
  <div style="heigh: 100%">
    <v-row>
      <v-col md="7" sm="6" class="img-form d-none d-sm-block"> </v-col>
      <v-col md="5" sm="6" cols="12">
        <Forms :formprops="setForm" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Forms from '@/components/forms.vue'
export default {
  components: { Forms },
  data() {
    return {
      setForm: {
        title: 'Register',
        access: 2,
      },
    }
  },
  head() {
    return {
      title: `${
        this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)
      }`,
    }
  },
}
</script>
