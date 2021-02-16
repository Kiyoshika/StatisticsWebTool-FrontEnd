<template>
  <v-card id="card" class="px-3 mx-3 pb-3" color="indigo darken-4">
    <v-subheader style="font-weight: bold; font-size: 20px; color: white">Dataset List:</v-subheader>
    <v-list-item v-for="dataSetName in dataSetList" :key="dataSetName">
        <!-- <v-btn block dark color="indigo darken-1" v-text="dataSetName"></v-btn> -->
        <data-set-list-button :buttonText="dataSetName"></data-set-list-button>
    </v-list-item>
  </v-card>
</template>

<script>
import DataSetListButton from './DataSetListButton.vue';
export default {
  components: { DataSetListButton },
    mounted() {
        // fetch dataset list for current user
        this.$http.get(this.$store.state.serverURL+'getUploadedFileNames', {
            headers: {
                'client-username': this.$store.getters.getUsername
            }
        }).then(response => this.dataSetList = response.data);
    },

    data () {
        return {
            dataSetList: []
        }
    }
};
</script>

<style scoped>
#card {
    max-height: 500px;
    overflow-y: auto;
}
</style>