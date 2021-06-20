<template>
  <div class="pa-4 mt-6">
    <div>
      <!-- error -->
      <v-alert v-model="alertError" outlined text type="error">
        <v-row align="center" no-gutters>
          <v-col class="grow">
            {{ message }}
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="shrink">
            <v-btn icon small @click="$store.set('users/alertError', false)"
              ><v-icon>mdi-close-circle-outline</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-alert>
      <!-- success -->
      <v-alert v-model="alertSuccess" outlined text type="success">
        <v-row align="center" no-gutters>
          <v-col class="grow">
            {{ message }}
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="shrink">
            <v-btn icon small @click="$store.set('users/alertSuccess', false)"
              ><v-icon>mdi-close-circle-outline</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-alert>
    </div>
    <div class="f-secondary">
      <h1>{{ formprops.title }}</h1>
      <h3>Welcome, coffee lover's</h3>
    </div>
    <v-form
      v-model="isValue"
      :class="formprops.access !== 1 ? 'mt-5 mb-10' : 'mt-15 mb-10'"
      @submit.prevent="sumitforms"
    >
      <v-text-field
        v-if="formprops.access !== 1"
        v-model="formsdata.username"
        type="text"
        label="Username"
        :counter="15"
        :rules="usernameRules"
        placeholder="Input username"
        required
        :autofocus="formprops.access !== 1 ? true : false"
      >
      </v-text-field>
      <v-text-field
        v-if="formprops.access !== 1"
        v-model="formsdata.phone"
        type="text"
        label="Phone"
        :maxlength="15"
        :counter="15"
        :rules="phoneRules"
        palceholder="Input your phone number"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="formsdata.email"
        label="Email"
        type="email"
        :rules="emailRules"
        placeholder="Input your email"
        required
        :autofocus="formprops.access !== 2 ? true : false"
      ></v-text-field>
      <v-text-field
        v-model="formsdata.password"
        label="Password"
        :type="statePass ? 'text' : 'password'"
        :append-icon="statePass ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="passRules"
        placeholder="Input your password"
        required
        class="mb-4"
        @click:append="statePass = !statePass"
      >
      </v-text-field>
      <div v-if="formprops.access === 1" class="mb-8 float-end f-secondary">
        <nuxt-link to="/forgotpassword">Forgot Password</nuxt-link>
      </div>
      <v-btn
        :disabled="!isValue"
        :loading="loadingBtn"
        type="submit"
        color="yellow darken-1"
        :class="
          formprops.access !== 1
            ? 'mt-10 text-capitalize f-secondary'
            : 'text-capitalize f-secondary'
        "
        block
        x-large
        rounded
        >{{ formprops.access !== 1 ? 'Register' : 'Login' }}</v-btn
      >
    </v-form>
    <div class="text-center f-secondary">
      <p v-if="formprops.access === 1">
        You don't have an account yet?
        <nuxt-link to="/register">Register.</nuxt-link>
      </p>
      <p v-else>
        You have an account yet?
        <nuxt-link to="/login">Login.</nuxt-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Forms',
  props: {
    formprops: {
      type: Object,
      default: Object,
    },
  },
  data() {
    return {
      isValue: false,
      statePass: false,
      stsMsg: false,
      loadingBtn: false,
      formsdata: {
        username: '',
        phone: '',
        email: '',
        password: '',
      },
      usernameRules: [
        (v) => !!v || 'Username required',
        (v) =>
          (v && v.length <= 15) || 'Username must be less than 15 characters',
      ],
      phoneRules: [
        (v) => !!v || 'Phone number required',
        (v) =>
          (v && v.length <= 15 && /^(62)(\d{3,4}-?){2}\d{3,4}$/.test(v)) ||
          'Phone number must be valid!',
      ],
      emailRules: [
        (v) => !!v || 'Email required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passRules: [
        (v) => !!v || 'Password required',
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@,#,_])[0-9a-zA-Z@#_]{8,}$/.test(
            v
          ) || 'Use a combination of a-z, A-Z, 0-9 and symbol (@,#,_,)',
      ],
    }
  },
  computed: {
    message() {
      return this.$store.get('users/message')
    },
    alertSuccess() {
      return this.$store.get('users/alertSuccess')
    },
    alertError() {
      return this.$store.get('users/alertError')
    },
  },
  mounted() {},
  methods: {
    async sumitforms() {
      this.loadingBtn = true
      if (this.formprops.access === 1) {
        const res = await this.$store.dispatch(
          'users/postLogin',
          this.formsdata
        )
        if (res) {
          this.loadingBtn = false
          this.$store.set('authenticated', true)
          this.$router.push('/')
        } else {
          const msg = `Your account isn't activated yet! Check your email!`
          if (this.$store.get('users/message') === msg) {
            this.loadingBtn = false
            this.$store.set('users/message', 'Check email!')
            this.$store.set('users/alertError', true)
            this.stsMsg = !this.stsMsg
          } else {
            this.loadingBtn = false
            this.$store.set('users/message', 'Email or pass wrong!')
            this.$store.set('users/alertError', true)
            this.stsMsg = !this.stsMsg
          }
        }
      } else {
        const res = await this.$store.dispatch(
          'users/postRegister',
          this.formsdata
        )
        if (res) {
          this.loadingBtn = false
          this.$store.set('users/alertSuccess', true)
          this.$store.set('users/message', 'Check email!')
          this.$router.push('/login')
        } else {
          this.loadingBtn = false
          this.$store.set('users/alertError', true)
          this.stsMsg = !this.stsMsg
        }
      }
    },
  },
}
</script>
