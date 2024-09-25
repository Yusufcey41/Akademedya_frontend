<template>
  <div>
    <p v-if="loading">Hesabınız aktif ediliyor...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const loading = ref(true)
    const error = ref(null)
    const router = useRouter()
    const route = useRoute()

    onMounted(async () => {
      const userId = route.params.userId

      if (!userId) {
        error.value = 'Geçersiz aktivasyon bağlantısı.'
        loading.value = false
        return
      }

      try {
        const response = await axios.post(`http://localhost:5177/api/Auth/activate/${userId}`)

        if (response.status === 200) {
          // Başarılıysa giriş sayfasına yönlendirin
          router.push('/login')
        }
      } catch (err) {
        console.error(err) // Hatanın detaylarını konsola yazdırın
        error.value = err.response
          ? err.response.data
          : 'Aktivasyon işlemi sırasında bir hata oluştu.'
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      error
    }
  }
}
</script>
