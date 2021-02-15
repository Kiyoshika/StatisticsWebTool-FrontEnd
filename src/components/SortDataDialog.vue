<template>
  <v-dialog persistent v-model="showDialog" max-width="600">
    <v-card>
      <v-card-title id="cardTitle" class="headline indigo darken-4">
        Sort Dataset
      </v-card-title>

      <br />

      <center>
        <p>Use options below to add/edit/remove sort conditions.</p>
        <p style="color: red;" v-show="hasError"> {{ errorText }}</p>
      </center>
      <v-list :key="listKey" dense style="max-height: 250px; overflow-y: auto">
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(cond, index) in sortConditions" :key="index">
            <v-list-item-content>
              <v-list-item-title v-text="cond"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="columnModel"
              class="px-1 pt-1"
              solo
              label="Column"
              :items="tableColumns"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
          </v-col>

          <v-col>
            <v-select
              v-model="sortTypeModel"
              class="px-1 pt-1"
              solo
              label="Sort Type"
              :items="sortTypeList"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
          </v-col>

          <v-col>
            <v-select
              v-model="sortAsModel"
              class="px-1 pt-1"
              solo
              label="Sort As"
              :items="sortAsList"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col offset-md="1">
            <v-btn width="100" color="success" class="px-1 pt-1" @click="addCondition"> Add </v-btn>
          </v-col>

          <v-col offset-md="1">
            <v-btn width="100" color="error" class="px-1 pt-1" @click="overwriteCondition"> Overwrite </v-btn>
          </v-col>

          <v-col offset-md="1">
            <v-btn width="100" color="error" class="px-1 pt-1" @click="removeCondition"> Remove </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" text @click="clearAllConditions"> Clear All </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> Cancel </v-btn>
        <v-btn color="primary" text @click="sortData"
        :disabled="sortConditions.length === 0"> Sort </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    showDialog() {
      return this.$store.getters.getSortDataDialog;
    },

    tableColumns() {
      return this.$store.getters.getTableColumns;
      //return ["column 1", "column 2", "column 3"]
    },
  },

  data() {
    return {
      sortTypeList: ["ASCENDING", "DESCENDING"],
      sortAsList: ["TEXT", "NUMBER"],

      sortConditions: [],

      // models for inputs
      columnModel: null,
      sortTypeModel: null,
      sortAsModel: null,

      selectedItem: null,

      // key to "refresh" the condition list when removing/overwriting items
      listKey: 0,

      // if there's a syntax error, toggle error text
      hasError: false,
      errorText: ''
    };
  },

  methods: {
    closeDialog: function () {
        this.$store.commit('setSortDataDialog', false);
        // clear any errors
        this.hasError = false;
        this.errorText = '';
    },

    sortData: function () {
        // parse the this.sortConditions array to pass to filter API
        let finalConditionArray = [];
        let currentConditionArray = [];
        //let columnIndex = -1;

        this.sortConditions.forEach(cond => {
            currentConditionArray = cond.split(" | ");
            // need actual index instead of column name
            currentConditionArray[0] = this.tableColumns.indexOf(currentConditionArray[0]).toString();
            finalConditionArray.push(currentConditionArray);
        });

        this.$http({
            method: 'post',
            url: 'http://localhost:2020/sortData/'+this.$store.getters.getCurrentSelectedDatasetName,
            headers: {
                'client-username': this.$store.getters.getUsername,
                'Content-Type': 'application/json'
            },
            data: finalConditionArray
        }).then(response => {
            // update current table with filtered data
            this.$store.commit('setTableColumns', response.data.columns);
            this.$store.commit('setTableData', response.data.data);

            // refresh data table and close dialog
            this.$store.commit('refreshDataTable');
            this.$store.commit('setSortDataDialog', false);

            // clear any errors
            this.hasError = false;
            this.errorText = '';
        }).catch(() => {
            this.hasError = true;
            this.errorText = 'There was an issue trying to sort your data. Check your "Sort As" conditions.';
        });
    },

    addCondition: function() {
        // validate all four fields are not null
        if (
            this.columnModel != null
            && this.sortTypeModel != null
            && this.sortAsModel != null
            ) {
                let newCond = (
                    this.columnModel + " | " 
                    + this.sortTypeModel + " | "
                    + this.sortAsModel)

                if (this.selectedItem != null) {
                    // insert above selected item
                    this.sortConditions.splice(this.selectedItem, 0, newCond);
                    this.listKey += 0.001;
                } else {
                    this.sortConditions.push(newCond);
                    this.listKey += 0.001;
                }
            }
    },

    overwriteCondition: function() {
        
        if (this.selectedItem != null) {
            if (
            this.columnModel != null
            && this.sortTypeModel != null
            && this.sortAsModel != null
            ) {
                let newCondition = (
                    this.columnModel + " | " 
                    + this.sortTypeModel + " | "
                    + this.sortAsModel + " | "
                    )

                this.sortConditions[this.selectedItem] = newCondition;
                this.listKey += 0.001;
            }
        }
    },

    removeCondition: function() {
        if (this.selectedItem != null) {
            this.sortConditions.splice(this.selectedItem,1);
            this.listKey += 0.001;
            this.selectedItem = null;
        }
    },

    clearAllConditions: function() {
        this.selectedItem = null;
        this.sortConditions = [];
        this.listKey += 0.001;
    }
  },
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