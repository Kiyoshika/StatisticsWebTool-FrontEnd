<template>
  <v-dialog persistent v-model="showDialog" max-width="500">
    <v-card>
      <v-card-title id="cardTitle" class="headline indigo darken-4">
        Delete Dataset
      </v-card-title>

      <br />

      <p>Are you sure you want to delete '{{ currentDataSet }}'?</p>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> Cancel </v-btn>
        <v-btn
          color="primary"
          text
          @click="deleteData"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

    data () {
        return {

        }
    },

    computed: {
        showDialog() {
            return this.$store.getters.getDeleteDatasetDialog;
        },

        currentDataSet () {
            return this.$store.state.currentSelectedDatasetName.toUpperCase();
        }
    },

    methods: {
        closeDialog: function() {
            this.$store.commit('setDeleteDatasetDialog', false);
        },

        deleteData: async function() {
            await this.$http({
                method: 'post',
                url: 'http://localhost:2020/removeData/'+this.$store.state.currentSelectedDatasetName,
                headers: {
                    'client-username': this.$store.getters.getUsername
                }
            });

            this.$store.commit('setDeleteDatasetDialog', false);
            this.$store.commit('refreshDatasetList');
        }
    }
};
</script>

<style scoped>
#cardTitle {
    color: white;
}

p {
    padding: 12px;
}
</style>