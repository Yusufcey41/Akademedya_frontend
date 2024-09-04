<template>
  <div><input type="text" placeholder="tablo adı giriniz" /></div>
  <div class="hello">
    <div class="table-container">
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
      <div class="div-add-btn-col">
        <button class="add-btn-row" @click="addRow">+</button>
      </div>
    </div>
    <div>
      <button class="add-btn-col" @click="addColumn">+</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnCount: 1,
      rowCount: 1,
      headers: ['Sütun adı giriniz'],
      rows: [['']]
    }
  },
  methods: {
    addColumn() {
      this.columnCount++
      this.headers.push(`sütun adı girin`)
      this.rows.forEach((row) => row.push(''))
    },
    addRow() {
      this.rowCount++
      this.rows.push(Array(this.columnCount).fill(''))
    }
  }
}
</script>

<style scoped>
.tablebody {
  display: flex;
}
.table-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 5px;
}
.div-add-btn-col {
  display: flex;
}
.table-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #d80b0b;
  padding-left: 10px;
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
}

.add-btn-col {
  margin-left: 5px;
  cursor: pointer;
  background-color: rgb(226, 223, 223);
  border: 2px solid black;
  padding: 5px;
}
.add-btn-col:hover {
  background-color: #04aa6d;
  color: white;
}
.add-btn-row {
  margin-left: 30px;
  cursor: pointer;
  background-color: rgb(226, 223, 223);
  border: 2px solid black;
  padding: 5px;
}
.add-btn-row:hover {
  background-color: rgb(236, 234, 234);
  color: white;
}
</style>
