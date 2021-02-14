<template>
    <v-menu
        offset-x="true"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            block
            dark
            color="indigo darken-1"
            v-bind="attrs"
            v-on="on"
            v-text="menuText"
          >
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="items in dropDownItems"
            :key="items"
            @click="hideNavDrawer(items)"
          >
            <v-list-item-title>{{ items }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
</template>

<script>
export default {
    props: {
        menuText: String,
        dropDownItems: Array
    },

    data () {
        return {
            
        }
    },

    methods: {
        hideNavDrawer: function(clickedItem) {
            this.$emit('clicked', clickedItem);
        }
    }
}
</script>