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

<script setup>
import EventBus from '../eventBus.js'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function submit() {
  alert(`Email: ${email.value}, Password: ${password.value}`)
}
function handleLogin() {
  EventBus.emit('userLoggedIn')
}
</script>

<style scoped>
.v-card {
  padding: 20px;
  border-width: 3px;
  border-color: #bdbdbd;
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
  margin-bottom: 170px;
}
.loginbutton {
  left: 35%;
}
</style>
