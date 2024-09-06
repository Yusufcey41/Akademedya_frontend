<template>
  <div class="div-table-name">
    Tablo adı:<input type="text" placeholder="tablo adı giriniz" class="input-table-name" />
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
        <div class="div-add-btn-row">
          <button class="add-btn-row" @click="addRow">+</button>
        </div>
        <div class="save-btn-div">
          <button class="save-btn" @click="saveTable">Save</button>
        </div>
      </div>
      <div class="full-row">
        <button class="add-btn-col" @click="addColumn">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnCount: 1,
      rowCount: 1,
      headers: [''],
      rows: [['']]
    }
  },
  methods: {
    addColumn() {
      this.columnCount++
      this.headers.push(``)
      this.rows.forEach((row) => row.push(''))
    },
    addRow() {
      this.rowCount++
      this.rows.push(Array(this.columnCount).fill(''))
    },
    saveTable() {
      console.log(this.rows)
    }
  }
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
}
.div-add-btn-row {
  display: flex;
  height: 30px;
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
}

.add-btn-col {
  cursor: pointer;
  background-color: rgb(226, 223, 223);
  border: 2px solid black;
  padding: 5px;
  margin-bottom: 60px;
}
.add-btn-col:hover {
  background-color: rgb(236, 234, 234);
  color: white;
}
.add-btn-row {
  width: 100%;
  height: 25px;
  margin-left: 30px;
  margin-right: 5px;
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
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  height: 35px;
}
.header-field::placeholder,
.input-table-name::placeholder {
  padding-left: 10px;
}
.div-table-name {
  margin-left: 50px;
  margin-top: 20px;
}
.save-btn {
  background-color: #caf7ca;
  border-radius: 10px;
  width: 100%;
}
.save-btn-div {
  margin-left: 30px;
}
</style>
