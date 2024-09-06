<template>
  <v-toolbar density="compact">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-btn v-if="isLoggedIn" to="/createtable">
      <v-toolbar-title><a>Create Table</a></v-toolbar-title>
    </v-btn>
    <v-btn v-if="isLoggedIn" to="/listtable">
      <v-toolbar-title><a>List Table</a></v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" to="/login" :disabled="isLoginPage"> Login </v-btn>
    <v-btn v-if="!isSignedUp" to="/signup" :disabled="isSignUpPage"> Signup </v-btn>
    <v-btn v-if="isLoggedIn" icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn v-if="isLoggedIn" to="/login" @click="handlelogout" icon>
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
  computed: {
    isLoginPage() {
      return this.$route.path === '/login' || this.$route.path === '/'
    },
    isSignUpPage() {
      return this.$route.path === '/signup'
    }
  },
  created() {
    EventBus.on('userLoggedIn', () => {
      this.isLoggedIn = true
      this.isSignedUp = true
    })
    EventBus.on('userSignUp', () => {
      this.isLoggedIn = false
      this.isSignedUp = true
    })
    EventBus.on('userLogOut', () => {
      this.isLoggedIn = false
      this.isSignedUp = true
    })
  },
  methods: {
    handlelogout() {
      EventBus.emit('userLogOut')
    }
  }
}
</script>

<style scoped></style>
