<template>
  <v-menu :offset-x="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        dark
        color="indigo darken-1"
        v-bind="attrs"
        v-on="on"
        v-text="buttonText"
      >
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="items in menuItems"
        :key="items"
        @click="performAction(items, buttonText)"
      >
        <v-list-item-title>{{ items }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import dataAction from '../js/DataSetListButtonActions.js'
export default {
    props: {
        buttonText: String
    },

    data () {
        return {
            menuItems: [
                "Load Data",
                "Filter",
                "Sort",
                "Rename",
                "Delete"
            ]
        }
    },

    methods: {
        performAction(action, datasetName) {
            dataAction(action, datasetName);
        }
    }
}
</script>