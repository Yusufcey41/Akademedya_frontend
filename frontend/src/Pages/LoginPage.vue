<template>
  <v-app>
    <v-container class="d-flex align-center justify-center" style="height: 100vh">
      <v-card max-width="400" class="mx-auto">
        <v-card-title class="headline">Login</v-card-title>
        <v-card-subtitle class="subtitle">please enter your informations</v-card-subtitle>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="userid"
              prepend-inner-icon="mdi-account"
              label="user id"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-inner-icon="mdi-key"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn class="loginbutton" color="primary" type="submit" @click="handleLogin"
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const userid = ref('')
const password = ref('')
const isUser = false
function submit() {
  //console.log(`userid: ${userid.value}, Password: ${password.value}`)
}
async function handleLogin() {
  const data = {
    userid: userid.value,
    password: password.value
  }

  try {
    const response = await axios.post('http://localhost:5177/api/Auth/login', data)

    if (response.data == 'yok') {
      alert('kullanıcı mevcut değil')
      return
    }
    if (response.data == 'wrong') {
      alert('hatalı şifre')
      return
    }

    if (!response.data) {
      alert('aktif değilsin')
      return
    }
    if (response.status === 200) {
      const token = response.data.token
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('id', userid.value)
      EventBus.emit('whoLoggedIn', response.data.firstname)

      EventBus.emit('userLoggedIn')
      router.push('/createtable')
    } else {
      alert('Login failed: ' + response.data)
    }
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed: ' + error.message)
  }
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
