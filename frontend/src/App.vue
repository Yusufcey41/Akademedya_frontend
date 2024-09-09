<template>
  <v-app>
    <HeaderPage />
    <router-view></router-view>
  </v-app>
</template>

<script>
import HeaderPage from './components/PageHeader.vue'

export default {
  name: 'App',
  components: {
    HeaderPage
  }
}
</script>
<style></style>
