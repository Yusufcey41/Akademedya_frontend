<template>
  <v-app>
    <v-container class="d-flex align-center justify-center" style="height: 100vh">
      <v-card max-width="400" class="mx-auto">
        <v-card-title class="headline">Login</v-card-title>
        <v-card-subtitle class="subtitle">please enter your informations</v-card-subtitle>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="email"
              prepend-inner-icon="mdi-mail"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-inner-icon="mdi-key"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn
              class="loginbutton"
              color="primary"
              type="submit"
              @click="handleLogin"
              to="/listtable"
              >Login
            </v-btn>
            <div class="signuplink-text">
              <a href="/signup"><p>if you don't have a account</p></a>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import EventBus from '../eventBus.js'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      alert(`Email: ${this.email}, Password: ${this.password}`)
    },
    handleLogin() {
      EventBus.emit('userLoggedIn')
    }
  },
  components: {}
}
</script>

<style scoped>
.v-card {
  padding: 20px;
}
.headline,
.subtitle,
.signuplink-text {
  text-align: center;
}
.signuplink-text {
  margin-top: 15px;
}
.mx-auto {
  width: 600px;
  margin-bottom: 250px;
}
.loginbutton {
  left: 35%;
}
</style>
