<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    v-if="headers.length"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props" @click="newItem"
              >New Item</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <!-- v-for ile editedItem'in key-value çiftlerini döndür -->
                  <v-col
                    v-for="(value, key, index) in editedItem"
                    :key="index"
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <!-- Key adını label olarak, value'yu v-model olarak kullan -->
                    <v-text-field :label="key" v-model="editedItem[key]"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchData">Yeniden Yükle</v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const dialog = ref(false)
const dialogDelete = ref(false)

const headers = ref([]) // Başlıkları backend'den alacağız
const desserts = ref([]) // Satırları backend'den alacağız

const editedIndex = ref(-1)
const editedItem = ref(null) // Düzenlenecek veri backend'den geldiğinde dinamik olarak belirlenecek
const tableid = route.params.tableid
const tableTitle = route.params.tablename

// Backend'den verileri almak için API isteği
const fetchData = async () => {
  console.log(tableid, tableTitle)
  try {
    const tablecolumns = await axios.get(
      `http://localhost:5177/api/Columns/getcolumnname/${tableid}`
    )
    const tablevalues = await axios.get(
      `http://localhost:5177/api/TablesValues/tableRows/${tableid}`
    )
    const columnNames = tablecolumns.data.map((column) => column.columnName)
    const rowValues = tablevalues.data.map((row) => row.value)

    console.log(rowValues.length)
    headers.value = tablecolumns.data.map((column) => ({
      title: column.columnName, // Tablo başlığında görünecek olan isim
      key: column.columnName
      // Tablo verilerini bağlamak için kullanılan anahtar
    }))
    //öpleröerlferplfperlf
    headers.value.push({
      title: 'Actions', // Başlık adı
      key: 'actions', // Slot ile eşleşecek anahtar
      align: 'center',
      sortable: false
    })

    const groupedValues = []
    tablevalues.data.forEach((row) => {
      groupedValues[row.inputAreaId - 1] = row.value // inputAreaId'ye göre değerleri sakla
    })

    let length = headers.value.length - 1
    const exceptActionsArray = []
    let header = {}
    let j = 0
    for (let i = 0; i < length; i++) {
      exceptActionsArray.push()
    }
    for (let i = 0; i < length; i++) {
      header = headers.value[i]
      exceptActionsArray.push(header)
    }

    for (let i = 0; i < groupedValues.length; i++) {
      if (i != 0) {
        i--
      }
      const dessertObject = {}
      for (let j = 0; j < exceptActionsArray.length; j++) {
        dessertObject[exceptActionsArray[j].key] = groupedValues[i + j] || null // Değerleri atama
        console.log(dessertObject)
      }
      desserts.value.push(dessertObject)
      i = i + exceptActionsArray.length
    }
  } catch (error) {
    console.error('Veri alınırken bir hata oluştu:', error)
  }
}

// Sayfa yüklendiğinde verileri al
onMounted(() => {
  fetchData() // await olmadan çağırıyoruz
})

// Düzenleme işlemleri: Edit, Delete
const editItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

const newItem = () => {
  editedItem.value = {} // Boş bir obje başlatıyoruz
  headers.value.forEach((header) => {
    if (header.key !== 'actions') {
      editedItem.value[header.key] = '' // Her bir başlık için boş bir alan oluşturuyoruz
    }
  })
  dialog.value = true
}

const deleteItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = { ...item }

  dialogDelete.value = true
}
const decrease = async (tableid, inputid) => {
  try {
    const response = await axios.put(
      `http://localhost:5177/api/TablesValues/decreaseinputareid/${tableid}/${inputid}/${headers.value.length - 1}`
    )
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}
const deleteItemConfirm = async () => {
  try {
    // Silinecek item'ın `inputAreaId` değerini bulmak

    //const deletedItemIndex = desserts.value.indexOf(editedItem.value)

    const values = Object.values(editedItem.value)

    // Silinecek her sütun için backend'e silme isteği gönder
    const totalColumns = Object.keys(editedItem.value).length

    for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
      const rowIndex = editedIndex.value + 1 // Satır numarası

      const currentCellNumber = rowIndex * totalColumns + (columnIndex + 1) - totalColumns

      // Silme işlemi için backend'e istek gönder
      const data = {
        TableId: tableid,
        InputAreaId: currentCellNumber,
        Value: values[columnIndex]
      }

      //DELETE isteği gönder
      const response = await axios.delete(`http://localhost:5177/api/TablesValues/deletevalue`, {
        data
      })

      console.log('silinen response', response)
    }
    const response2 = await axios.get(`http://localhost:5177/api/TablesValues/tableRows/${tableid}`)

    console.log('allrows', response2)

    console.log('yusuf', editedIndex.value)
    desserts.value.splice(editedIndex.value, 1)

    const rowIndex2 = editedIndex.value + 1
    const currentCellNumber2 = rowIndex2 * totalColumns
    await decrease(tableid, currentCellNumber2)
    // Frontend'de tabloyu güncelle, item'ı sil

    // İşlem tamamlandığında silme dialogunu kapat
    closeDelete()
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const close = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = null
    editedIndex.value = -1
  })
}

const closeDelete = () => {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = null
    editedIndex.value = -1
  })
}

const createItem = async () => {
  try {
    const values = Object.values(editedItem.value)
    console.log(values[0])

    const firstAddItemId = (headers.value.length - 1) * desserts.value.length + 1
    console.log(firstAddItemId)
    for (let i = 0; i < Object.keys(editedItem.value).length; i++) {
      console.log('i:', i)
      const data = {
        TableId: tableid,
        InputAreaId: firstAddItemId + i,
        Value: values[i] // Tüm yeni değerler burada gönderilir
      }

      console.log(data)
      const response = await axios.post(`http://localhost:5177/api/TablesValues/addrows`, data)
      console.log('New item added successfully', response)
    }
    close()
    desserts.value.push({ ...editedItem.value })
    console.log(desserts.value)
  } catch (error) {
    console.error('Error adding new item:', error)
  }
}

// Var olan bir öğeyi güncelleme işlemi için fonksiyon
const updateItem = async () => {
  const originalItem = desserts.value[editedIndex.value] // Orijinal satır
  const updatedItem = editedItem.value // Güncellenen satır

  // Toplam sütun sayısı
  const totalColumns = Object.keys(updatedItem).length

  // Değiştirilen sütunları bulmak için
  Object.keys(updatedItem).forEach(async (key, columnIndex) => {
    if (originalItem[key] !== updatedItem[key]) {
      const rowIndex = editedIndex.value + 1 // Satır numarası
      const currentCellNumber = rowIndex * totalColumns + (columnIndex + 1) - totalColumns

      // Mesajı oluşturma
      const result = `${updatedItem[key]} neyin değeri ${key}, bu ${currentCellNumber}. hücre`

      // Backend'e güncelleme isteği gönderme
      const data = {
        TableId: tableid,
        InputAreaId: currentCellNumber,
        Value: updatedItem[key]
      }

      try {
        const response = await axios.put(`http://localhost:5177/api/TablesValues/updatevalue`, data)
        console.log(response)
      } catch (error) {
        console.error('Value update failed', error)
      }
    }
  })

  // Orijinal öğeyi güncelle
  Object.assign(desserts.value[editedIndex.value], editedItem.value)
  close()
}

// Save fonksiyonu hangi işlemin yapılacağını belirler
const save = () => {
  if (editedIndex.value > -1) {
    // Eğer var olan bir öğeyi düzenliyorsa, update işlemi
    updateItem()
  } else {
    // Eğer yeni bir öğe ekliyorsa, create işlemi
    createItem()
  }
}
</script>

<style>
.v-data-table {
  max-width: 1200px !important;
  max-height: 600px;
  margin: 0 auto;
  margin-top: 40px;
}

.v-toolbar {
  margin-bottom: 16px;
}
</style>
