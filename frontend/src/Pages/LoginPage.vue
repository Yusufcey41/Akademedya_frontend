<template>
  <v-app>
    <v-container class="d-flex align-center justify-center" style="height: 100vh">
      <v-card max-width="400" class="mx-auto">
        <v-card-title class="headline">Login</v-card-title>
        <v-card-subtitle>Please enter your credentials</v-card-subtitle>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn color="primary" type="submit" @click="handleLogin" to="/createtable"
              >Login</v-btn
            >
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
</style>
