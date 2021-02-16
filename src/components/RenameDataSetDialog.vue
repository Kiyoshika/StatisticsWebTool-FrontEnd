<template>
  <v-dialog persistent v-model="showDialog" max-width="500">
    <v-card>
      <v-card-title id="cardTitle" class="headline indigo darken-4">
        Rename Dataset
      </v-card-title>

    <br>

      <v-text-field
        class="px-3"
        label="Rename Dataset"
        placeholder="Enter a new name..."
        outlined
        v-model="newDatasetName"
        ></v-text-field>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> Cancel </v-btn>
        <v-btn :disabled="newDatasetName.length === 0" color="primary" text @click="renameData"> Rename </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
    data () {
        return {
            newDatasetName: ''
        }
    },

    computed: {
        showDialog () {
            return this.$store.getters.getRenameDialog;
        }
    },

    methods: {
        closeDialog() {
            this.newDatasetName = '';
            this.$store.commit('setRenameDialog', false);
        },

        async renameData() {
            await this.$http({
                method: 'post',
                url: this.$store.state.serverURL+'renameData/'+this.$store.state.currentSelectedDatasetName+'/'+this.newDatasetName,
                headers: {
                    'client-username': this.$store.getters.getUsername
                }
            });

            this.newDatasetName = '';
            this.$store.commit('refreshDatasetList');
            this.$store.commit('setRenameDialog', false);
        }
    }
}
</script>

<style scoped>
#cardTitle {
    color: white;
}
</style>