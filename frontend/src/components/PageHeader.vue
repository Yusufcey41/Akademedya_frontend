<template>
  <v-toolbar density="compact">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-btn to="/home"
      ><v-toolbar-title><a>MENU</a></v-toolbar-title></v-btn
    >
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" to="/login">Login</v-btn>
    <v-btn v-if="!isSignedUp" to="/signup">Signup</v-btn>
    <v-btn v-if="isLoggedIn" icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import EventBus from '../eventBus.js'

export default {
  name: 'PageHeader',
  data() {
    return {
      isLoggedIn: false,
      isSignedUp: false
    }
  },
  created() {
    EventBus.on('userLoggedIn', () => {
      this.isLoggedIn = true
      this.isSignedUp = true
    }),
      EventBus.on('userSignUp', () => {
        this.isLoggedIn = false
        this.isSignedUp = true
      })
  },
  methods: {}
}
</script>

<style scoped></style>
