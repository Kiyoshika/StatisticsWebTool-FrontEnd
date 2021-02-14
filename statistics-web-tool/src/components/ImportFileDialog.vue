<template>
    <v-dialog
      persistent
      v-model="showDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title id="cardTitle" class="headline indigo darken-4">
          Import CSV File
        </v-card-title>

        <v-file-input
            name="file"
            chips
            accept=".csv"
            label="Click here to upload file..."
            v-model="chosenFile"
            ></v-file-input>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="closeDialog"
            >Cancel</v-btn>
            
          <v-btn
            color="primary"
            text
            @click="uploadFile"
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            chosenFile: null
        }
    },

    computed: {
      showDialog () {
        return this.$store.getters.getImportFileDialog;
      }
    },

    methods: {
        closeDialog() {
          this.chosenFile = null;
          this.$store.commit('setImportFileDialog', false);
        },

        async uploadFile() {
            this.$store.commit('setImportFileDialog', false);
            let formData = new FormData();
            formData.append("file", this.chosenFile);

            await this.$http.post('http://localhost:2020/importData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'client-username': this.$store.getters.getUsername
                }
            });

            // refresh dataset list on App.vue using its store value
            this.$store.commit('refreshDatasetList');
            this.chosenFile = null;
        }
    }
}
</script>

<style scoped>
* {
    overflow: hidden;
}

#cardTitle {
  color: white;
}
</style>