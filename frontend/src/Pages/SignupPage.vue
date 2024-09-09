<template>
  <v-app>
    <v-container class="d-flex align-center justify-center" style="height: 100vh">
      <v-card max-width="400" class="mx-auto">
        <v-card-title class="headline">Sign Up</v-card-title>
        <v-card-subtitle class="subtitle">please enter your informations</v-card-subtitle>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="name"
              prepend-inner-icon="mdi-account"
              label="Name"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastname"
              prepend-inner-icon="mdi-account"
              label="Lastname"
              type="text"
              required
            ></v-text-field>
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
              class="signupbutton"
              color="primary"
              type="submit"
              @click="handleSignUp"
              to="/login"
              >Sign Up
            </v-btn>
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
      password: '',
      name: '',
      lastname: ''
    }
  },
  methods: {
    submit() {
      alert(
        `Name: ${this.name}, Lastname: ${this.lastname},
        Email: ${this.email}, Password: ${this.password}`
      )
    },
    handleSignUp() {
      EventBus.emit('userSignUp')
    }
  },
  components: {}
}
</script>

<style scoped>
.v-card {
  padding: 20px;
  border-width: 3px;
  border-color: #bdbdbd;
  margin-top: 200px;
}
.headline,
.subtitle,
.signuplink-text {
  text-align: center;
}
.mx-auto {
  width: 600px;
  margin-bottom: 250px;
}
.signupbutton {
  left: 35%;
}
</style>
