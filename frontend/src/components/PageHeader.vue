<template>
  <v-toolbar density="compact">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-spacer></v-spacer>
    <v-btn v-if="isLoggedIn" to="/createtable">
      <v-toolbar-title><a>Create Table</a></v-toolbar-title>
    </v-btn>
    <v-btn v-if="isLoggedIn" to="/listtable" class="ms-12">
      <v-toolbar-title><a>List Table</a></v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" to="/login" :disabled="isLoginPage"> Login </v-btn>
    <v-btn v-if="!isSignedUp" to="/signup" :disabled="isSignUpPage"> Signup </v-btn>
    <v-btn v-if="isLoggedIn" icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    {{}}
    <v-btn v-if="isLoggedIn" to="/login" @click="handlelogout" icon style="margin-left: 8px">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import EventBus from '../eventBus.js'

// Reactive state
const isLoggedIn = ref(false)
const isSignedUp = ref(false)

const route = useRoute()

const isLoginPage = computed(() => route.path === '/login' || route.path === '/')
const isSignUpPage = computed(() => route.path === '/signup')

function handleLogout() {
  EventBus.emit('userLogOut')
}

function setupEventListeners() {
  EventBus.on('userLoggedIn', () => {
    isLoggedIn.value = true
    isSignedUp.value = true
  })
  EventBus.on('userSignUp', () => {
    isLoggedIn.value = false
    isSignedUp.value = true
  })
  EventBus.on('userLogOut', () => {
    isLoggedIn.value = false
    isSignedUp.value = true
  })
}

onMounted(setupEventListeners)
onUnmounted(() => {
  EventBus.off('userLoggedIn')
  EventBus.off('userSignUp')
  EventBus.off('userLogOut')
})
</script>

<style></style>
