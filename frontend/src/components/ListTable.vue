<template>
  <div class="vcard-list">
    <div v-if="isLoading" class="loading-message">
      <p>Veriler yükleniyor...</p>
    </div>
    <div v-else-if="isEmpty == 0" class="no-table-message">
      <p>Hiç tablonuz yok, tablo oluşturun!</p>
      <!-- router-link kullanarak butona tıklanıldığında create table sayfasına yönlendir -->
      <router-link to="/createtable" class="create-table-button">Tablo Oluştur</router-link>
    </div>
    <div
      v-else
      v-for="tableId in tableIds"
      :key="tableId"
      class="vcard"
      @mouseover="hoveredId = tableId"
      @mouseleave="hoveredId = null"
      @click="showtable(tableId, tableNameMap[tableId].tableName)"
    >
      <img
        v-if="tableNameMap[tableId]?.url"
        :src="tableNameMap[tableId].url"
        alt="Table Image"
        class="vcard-image"
      />
      <div class="vcard-details">
        <h3 class="vcard-name">{{ tableNameMap[tableId]?.tableName || 'Loading...' }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const tableIds = ref([]) // Boş array başlatıldı
const tableNameMap = ref({})
const hoveredId = ref(null)
const isLoading = ref(true) // Yüklenme durumu için değişken
const isEmpty = ref()
function showtable(id, name) {
  router.push({
    path: `/showtable/${id}/${name}`
  })
}

onMounted(async () => {
  const ids = route.query.tableIds ? JSON.parse(route.query.tableIds) : []
  isEmpty.value = ids

  tableIds.value = ids
  console.log('tablo sayisi:', isEmpty.value)
  // Veriler yüklendiğinde buton veya içerik görünmesi için kontrol
  if (tableIds.value === 0) {
    isLoading.value = false // Yüklenme durumu sona erdi
  } else if (tableIds.value.length > 0) {
    // Backend'den veri alma

    await Promise.all(
      ids.map(async (tableId) => {
        try {
          const response = await axios.get(
            `http://localhost:5177/api/TableInformations/gettable/${tableId}`
          )
          tableNameMap.value[tableId] = {
            tableName: response.data.tableName,
            url: response.data.imageUrl
          }
        } catch (error) {
          console.error('Failed to fetch table data:', error)
        }
      })
    )
    isLoading.value = false // Yüklenme durumu sona erdi
  }
})
</script>

<style scoped>
.vcard-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center; /* Kartları yatayda ortalar */
  margin-top: 50px; /* Üst kısımda boşluk ekleyin */
}

.no-table-message {
  text-align: center;
  margin-top: 20px;
}

.create-table-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  margin-top: 10px;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.create-table-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.vcard {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 24px; /* Daha fazla iç boşluk ekleyin */
  width: 250px; /* Kart genişliğini artırın */
  text-align: center;
  transition:
    background-color 0.3s,
    transform 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* İçeriği en alta yerleştirir */
  height: 300px; /* Yüksekliği artırın */
}

.vcard:hover {
  background-color: #f0f0f0; /* Hover efekti */
  transform: scale(1.05); /* Küçük bir büyütme efekti */
}

.vcard-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.vcard-name {
  font-size: 1.5em; /* Yazı boyutunu artırın */
  margin: 8px 0;
}
</style>
