<template>
  <v-card id="card" max-width="350">
    <v-subheader style="font-weight: bold">Dataset List:</v-subheader>
    <v-list-item v-for="dataSetName in dataSetList" :key="dataSetName">
        <v-btn block v-text="dataSetName"></v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
    data () {
        return {
            dataSetList: []
        }
    }
};
</script>

<style scoped>
#card {
    max-height: 400px;
    overflow-y: auto;
}
</style>