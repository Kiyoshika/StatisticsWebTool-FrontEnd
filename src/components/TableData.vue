<template>
  <center>
    <table id="dTable">
      <tr>
        <th v-for="(cols, colIndex) in tableColumns" :key="colIndex">
          {{ tableColumns[colIndex] }}
        </th>
      </tr>

      <tr v-for="(rows, index) in tableData" :key="index">
        <td v-for="(cols, colIndex) in rows" :key="colIndex">
            {{ tableData[index][colIndex] }}
        </td>
      </tr>
    </table>
  </center>
</template>

<script>
export default {
  data() {
    return {
      tableColumns: this.$store.getters.getTableColumns,
      tableData: this.$store.getters.getTableData
    };
  },
};
</script>

<style scoped>
#dTable {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: black;
  border-collapse: collapse;
}

#dTable td,
#dTable th {
  border: 2px solid black;
  padding: 8px;
  text-align: center;
}

#dTable tr:nth-child(even) {
  background-color: #c8c8c8;
}
#dTable tr:nth-child(odd) {
  background-color: rgb(228, 228, 228);
}

#dTable tr:hover {
  background-color: rgb(255, 255, 255);
}

#dTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #9db2f6;
  color: black;
  position: sticky;
  top: 0;
}
</style>