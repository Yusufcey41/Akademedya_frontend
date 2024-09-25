<template>
  <v-toolbar density="compact">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-spacer></v-spacer>
    <v-btn v-if="isLoggedIn" to="/createtable">
      <v-toolbar-title><a>Create Table</a></v-toolbar-title>
    </v-btn>
    <v-btn v-if="isLoggedIn" @click="listtablebutton" class="ms-12">
      <v-toolbar-title><a>List Table</a></v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" to="/login" :disabled="isLoginPage"> Login </v-btn>
    <v-btn v-if="!isSignedUp" to="/signup" :disabled="isSignUpPage"> Signup </v-btn>

    <v-icon v-if="isLoggedIn">mdi-account</v-icon>

    <div :style="{ marginLeft: '8px' }">{{ username }}</div>

    <v-btn v-if="isLoggedIn" to="/login" @click="handlelogout" icon style="margin-left: 50px">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import EventBus from '../eventBus.js'
import axios from 'axios'
// Reactive state
const isLoggedIn = ref(false)
const isSignedUp = ref(false)
const username = ref('')
const userid = ref('')
const router = useRouter()
const tableIds = ref([])

const isLoginPage = computed(() => router.path === '/login' || router.path === '/')
const isSignUpPage = computed(() => router.path === '/signup')

function handlelogout() {
  sessionStorage.removeItem('token')
  EventBus.emit('userLogOut')
}
async function listtablebutton() {
  try {
    const response = await axios.get(
      `http://localhost:5177/api/UserTables/getUserTable/${sessionStorage.getItem('id')}`
    )
    console.log(response)
    if (response.data == 'Kullanicinin tablosu yok') {
      router.push({ path: '/listtable', query: { tableIds: 0 } })

      return 'Kullanicinin tablosu yok'
    }
    tableIds.value = response.data.map((table) => table.tableId)
    console.log(tableIds.value)
    router.push({ path: '/listtable', query: { tableIds: JSON.stringify(tableIds.value) } })
  } catch (error) {
    console.error('tables returning failed', error)
  }
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
    username.value = ''
  })
  EventBus.on('whoLoggedIn', (name) => {
    username.value = name
  })
}

onMounted(setupEventListeners)
onUnmounted(() => {
  EventBus.off('userLoggedIn')
  EventBus.off('userSignUp')
  EventBus.off('userLogOut')
  EventBus.off('whoLoggedIn')
})
</script>

<style></style>
