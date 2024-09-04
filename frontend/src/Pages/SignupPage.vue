<template>
  <div>
    <v-btn color="primary" type="submit" @click="handleSignup" to="/login">signup</v-btn>
  </div>
</template>

<script>
import EventBus from '../eventBus.js'
export default {
  components: {},
  methods: {
    handleSignup() {
      EventBus.emit('userSignUp')
    }
  }
}
</script>
