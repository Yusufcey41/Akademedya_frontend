<template>
  <v-container>
    <v-row>
      <!-- Eğer bir tablo seçilmediyse iki kart göster -->
      <v-col cols="6" v-if="!selectedTable">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-card
            class="mx-auto"
            max-width="344"
            @click="selectTable(1)"
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
            <v-card-title>Table 1</v-card-title>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6" v-if="!selectedTable">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-card
            class="mx-auto"
            max-width="344"
            @click="selectTable(2)"
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/cards/road.jpg" height="200px"></v-img>
            <v-card-title>Table 2</v-card-title>
          </v-card>
        </v-hover>
      </v-col>

      <!-- Tablo seçildiyse tabloyu göster -->
      <v-col cols="12" v-if="selectedTable">
        <v-btn @click="selectedTable = null" color="primary" class="mb-3"> Geri </v-btn>
        <v-data-table
          :headers="currentHeaders"
          :items="currentDesserts"
          :sort-by="[{ key: 'calories', order: 'asc' }]"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ props }">
                  <v-btn class="mb-2" color="primary" dark v-bind="props"> New Item </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
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
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const dialog = ref(false)
const dialogDelete = ref(false)
const selectedTable = ref(null)
const headers1 = [
  { title: 'Dessert (100g serving)', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Actions', key: 'actions', sortable: false }
]
const headers2 = [
  { title: 'Item', key: 'name' },
  { title: 'Quantity', key: 'calories' },
  { title: 'Cost', key: 'fat' },
  { title: 'Stock', key: 'carbs' },
  { title: 'Supplier', key: 'protein' },
  { title: 'Actions', key: 'actions', sortable: false }
]
const desserts1 = ref([
  { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 }
])
const desserts2 = ref([
  { name: 'Apples', calories: 100, fat: 0, carbs: 20, protein: 1.0 },
  { name: 'Bananas', calories: 150, fat: 0, carbs: 30, protein: 1.0 }
])
const editedIndex = ref(-1)
const editedItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0
})
const defaultItem = {
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0
}

const currentHeaders = computed(() => (selectedTable.value === 1 ? headers1 : headers2))
const currentDesserts = computed(() =>
  selectedTable.value === 1 ? desserts1.value : desserts2.value
)
const formTitle = computed(() => (editedIndex.value === -1 ? 'New Item' : 'Edit Item'))
const tableTitle = computed(() => (selectedTable.value === 1 ? 'Table 1' : 'Table 2'))

function selectTable(tableNumber) {
  selectedTable.value = tableNumber
}

function editItem(item) {
  editedIndex.value = currentDesserts.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

function deleteItem(item) {
  editedIndex.value = currentDesserts.value.indexOf(item)
  editedItem.value = { ...item }
  dialogDelete.value = true
}

function deleteItemConfirm() {
  currentDesserts.value.splice(editedIndex.value, 1)
  closeDelete()
}

function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
  })
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(currentDesserts.value[editedIndex.value], editedItem.value)
  } else {
    currentDesserts.value.push(editedItem.value)
  }
  close()
}

function initialize() {
  desserts1.value = [
    { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 }
  ]
}
</script>
