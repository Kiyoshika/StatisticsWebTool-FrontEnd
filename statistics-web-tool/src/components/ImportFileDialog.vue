<template>
    <v-dialog
      v-model="showDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Import CSV File
        </v-card-title>

        <v-file-input
            chips
            label="Click here to upload file..."
            ></v-file-input>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="hideDialog"
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
            showDialog: false
        }
    },

    methods: {
        hideDialog() {
            this.showDialog = false;
        }
    }
}
</script>

<style scoped>
* {
    overflow: hidden;
}
</style>