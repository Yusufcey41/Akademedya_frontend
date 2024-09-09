<template>
  <div class="div-table-name">
    Tablo adı:
    <input type="text" placeholder="tablo adı giriniz" class="input-table-name" />
    <input
      type="file"
      id="fileInput"
      @change="handleFileChange"
      accept="image/*"
      ref="fileInput"
      style="display: none"
    />
    <button class="select-photo" @click="triggerFileInput">Fotoğraf Seç</button>
    <p>Fotoğraf Adı: {{ fileName }}</p>
    <!-- Fotoğraf ismini gösterir -->
  </div>

  <div class="table-container">
    <div class="loo">
      <div class="zart">
        <div class="table-header">
          <div class="header-input">
            <input
              v-for="(header, index) in headers"
              :key="'header' + index"
              class="input-field header-field"
              :placeholder="'Sütun adı giriniz'"
              v-model="headers[index]"
            />
          </div>
        </div>
        <div class="tableBody">
          <div v-for="(row, rowIndex) in rows" :key="'row' + rowIndex" class="table-row">
            <div class="row-number">{{ rowIndex + 1 }}</div>
            <input
              v-for="(cell, cellIndex) in row"
              :key="'cell' + cellIndex"
              class="input-field"
              v-model="rows[rowIndex][cellIndex]"
            />
          </div>
        </div>
        <div class="flex-horizantal-buttons">
          <button class="add-btn-row" @click="addRow">+</button>
          <button class="add-btn-row" @click="removeRow">-</button>
        </div>
        <div class="save-btn-div">
          <button class="save-btn" @click="saveTable">Save</button>
        </div>
      </div>
      <div class="full-row">
        <button class="add-btn-col" @click="addColumn">+</button>
        <button class="add-btn-col" @click="removeColumn">-</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columnCount = ref(1)
const rowCount = ref(1)
const headers = ref([''])
const rows = ref([['']])
const imageUrl = ref(null)
const fileName = ref('')
const fileInput = ref(null)

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)

    fileName.value = file.name
  }
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

function addColumn() {
  columnCount.value++
  headers.value.push('')
  rows.value.forEach((row) => row.push(''))
}

function removeColumn() {
  if (columnCount.value > 1) {
    columnCount.value--
    headers.value.pop()
    rows.value.forEach((row) => row.pop())
  }
}

function addRow() {
  rowCount.value++
  rows.value.push(Array(columnCount.value).fill(''))
}

function removeRow() {
  if (rowCount.value > 1) {
    rowCount.value--
    rows.value.pop()
  }
}

function saveTable() {
  console.log(headers.value[0])
  console.log(rows.value)
}
</script>

<style scoped>
.loo {
  display: flex;
  flex-direction: row;
}
.table-zart {
  display: flex;
  flex-direction: column;
}
.full-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 60px;
}
.div-add-btn-row {
  display: flex;
  height: 30px;
}
.flex-horizantal-buttons {
  display: flex;
  padding-left: 30px;
  padding-right: 5px;
  gap: 10px;
  margin-bottom: 10px;
}
.tableBody {
  display: flex;
  flex-direction: column;
}
.table-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  border-radius: 5px;
}
.table-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 30px;
}

.header-input {
  display: flex;
  align-items: center;
}

.header-field {
  width: 150px;
  margin-right: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
}

.table-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.row-number {
  width: 30px;
  text-align: center;
}

.input-field {
  width: 150px;
  margin-right: 5px;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(248, 245, 245);
}

.add-btn-col {
  flex: 1;
  cursor: pointer;
  background-color: rgb(226, 223, 223);
  border: 2px solid black;
  padding: 5px;
}
.add-btn-col:hover {
  background-color: rgb(236, 234, 234);
  color: white;
}
.add-btn-row {
  width: 100%;
  height: 25px;
  cursor: pointer;
  background-color: rgb(226, 223, 223);
  border: 2px solid black;
}
.add-btn-row:hover {
  background-color: rgb(236, 234, 234);
  color: white;
}
.input-table-name {
  border: 1px solid #ddd;
  border-radius: 15px;
  margin-top: 20px;
  margin-left: 10px;
  height: 35px;
}
.header-field::placeholder,
.input-table-name::placeholder {
  padding-left: 10px;
}
.div-table-name {
  display: flex;
  align-items: center; /* Yatay ortalama sağlar */
  text-align: center; /* Metinlerin ortalanmasını sağlar */
  margin-left: 50px;
  margin-top: 20px;
  gap: 20px;
}

.input-table-name {
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 35px;
  width: 80%; /* Genişliği biraz küçültmek için ayarlayın */
  max-width: 400px; /* Maksimum genişlik belirleyin */
}
.save-btn {
  background-color: #caf7ca;
  border-radius: 10px;
  width: 100%;
}
.save-btn-div {
  margin-left: 30px;
}
.select-photo {
  background-color: #4caf50; /* Buton rengi */
  border: none; /* Kenarlık kaldırma */
  color: white; /* Metin rengi */
  padding: 10px 20px; /* İç boşluk */
  text-align: center; /* Metin hizalaması */
  text-decoration: none; /* Alt çizgi kaldırma */
  display: inline-block; /* Butonun yan yana olması için */
  font-size: 16px; /* Yazı boyutu */
  margin: 10px 0; /* Butonlar arasında boşluk */
  cursor: pointer; /* Fare imlecini değiştirir */
  border-radius: 5px; /* Kenarları yuvarlatır */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Hafif gölge ekler */
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease; /* Geçiş efekti */
}

.select-photo:hover {
  background-color: #45a049; /* Hover durumunda buton rengi */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Hover durumunda gölge */
}

.select-photo:focus {
  outline: none; /* Fokus durumunda kenarlık kaldırma */
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3); /* Fokus durumunda kenarlık */
}
</style>
