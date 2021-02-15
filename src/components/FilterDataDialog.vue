<template>
  <v-dialog persistent v-model="showDialog" max-width="600">
    <v-card>
      <v-card-title id="cardTitle" class="headline indigo darken-4">
        Filter Dataset
      </v-card-title>

      <br />

      <center>
        <p>Use options below to add/edit/remove filter conditions.</p>
        <p style="color: red;" v-show="hasError"> {{ errorText }}</p>
      </center>
      <v-list :key="listKey" dense style="max-height: 250px; overflow-y: auto">
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(cond, index) in filterConditions" :key="index">
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
              v-model="conditionModel"
              class="px-1 pt-1"
              solo
              label="Condition"
              :items="conditionList"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
          </v-col>

          <v-col>
            <v-text-field v-model="valueModel" class="px-1 pt-1" solo label="Value"></v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="logicalModel"
              class="px-1 pt-1"
              solo
              label="Logical"
              :items="logicalList"
              :menu-props="{ top: true, offsetY: true }"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn color="primary" class="px-1 pt-1" @click="addBeginGroup">Begin Group ( </v-btn>
          </v-col>

          <v-col>
            <v-btn color="primary" class="px-1 pt-1" @click="addEndGroup"> ) End Group </v-btn>
          </v-col>

          <v-col>
            <v-btn color="success" class="px-1 pt-1" @click="addCondition"> Add </v-btn>
          </v-col>

          <v-col>
            <v-btn color="error" class="px-1 pt-1" @click="overwriteCondition"> Overwrite </v-btn>
          </v-col>

          <v-col>
            <v-btn color="error" class="px-1 pt-1" @click="removeCondition"> Remove </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" text @click="clearAllConditions"> Clear All </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> Cancel </v-btn>
        <v-btn color="primary" text @click="filterData"
        :disabled="filterConditions.length === 0"> Filter </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    showDialog() {
      return this.$store.getters.getFilterDataDialog;
    },

    tableColumns() {
      return this.$store.getters.getTableColumns;
      //return ["column 1", "column 2", "column 3"]
    },
  },

  data() {
    return {
      conditionList: [
        ">=",
        "<=",
        "=",
        "!=",
        ">",
        "<",
        "contains",
        "begins with",
        "ends with",
      ],
      logicalList: ["AND", "OR", "END"],

      filterConditions: [],

      // models for inputs
      columnModel: null,
      conditionModel: null,
      valueModel: null,
      logicalModel: null,

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
        // clear any errors
        this.hasError = false;
        this.errorText = '';

        this.$store.commit('setFilterDataDialog', false);
    },

    filterData: function () {
        // parse the this.filterConditions array to pass to filter API
        let finalConditionArray = [];
        let currentConditionArray = [];
        //let columnIndex = -1;

        this.filterConditions.forEach(cond => {
            // check begin/end groups first
            if (cond === "(") {
                finalConditionArray.push(["", "GROUP BEGIN", ""]);
            } else if (cond === ") AND" || cond === ") OR" || cond === ") END") {
                let endCond = cond.split(" ")[1];
                finalConditionArray.push(["", "GROUP END", endCond]);
            } else { // other conditions
                currentConditionArray = cond.split(" | ");
                // need actual index instead of column name
                currentConditionArray[0] = this.tableColumns.indexOf(currentConditionArray[0]).toString();
                finalConditionArray.push(currentConditionArray);
            }
        });

        this.$http({
            method: 'post',
            url: 'http://localhost:2020/filterData/'+this.$store.getters.getCurrentSelectedDatasetName,
            headers: {
                'client-username': this.$store.getters.getUsername,
                'Content-Type': 'application/json'
            },
            data: finalConditionArray
        }).then(response => {
            // update current table with filtered data
            this.$store.commit('setTableColumns', response.data.columns);
            this.$store.commit('setTableData', response.data.data);
            // toggle a flag which appends "(filtered)" to the end of current selected dataset name
            this.$store.commit('setDataIsFiltered', true);
            this.$store.commit('refreshCurrentDatasetText');
            // refresh data table and close dialog
            this.$store.commit('refreshDataTable');
            this.$store.commit('setFilterDataDialog', false);

            // remove any potential syntax error messages from before
            this.hasError = false;
            this.errorText = '';
        }).catch(() => {
            this.hasError = true;
            this.errorText = "There's a syntax error in your filter conditions!";
        })
    },

    addBeginGroup: function() {
        if (this.selectedItem != null) {
            this.filterConditions.splice(this.selectedItem, 0, "(");
            this.listKey += 0.001;
        } else {
            this.filterConditions.push("(");
            this.listKey += 0.001;
        }
    },

    addEndGroup: function() {
        if (this.logicalModel != null) {
            if (this.selectedItem != null) {
                this.filterConditions.splice(this.selectedItem, 0, ") " + this.logicalModel);
                this.listKey += 0.001;
            } else {
                this.filterConditions.push(") " + this.logicalModel);
                this.listKey += 0.001;
            }
        }
    },

    addCondition: function() {
        // validate all four fields are not null
        if (
            this.columnModel != null
            && this.conditionModel != null
            && this.valueModel != null
            && this.logicalModel != null
            ) {
                let newCond = (
                    this.columnModel + " | " 
                    + this.conditionModel
                    + this.valueModel + " | "
                    + this.logicalModel)

                if (this.selectedItem != null) {
                    // insert above selected item
                    this.filterConditions.splice(this.selectedItem, 0, newCond);
                    this.listKey += 0.001;
                } else {
                    this.filterConditions.push(newCond);
                    this.listKey += 0.001;
                }
            }
    },

    overwriteCondition: function() {
        
        if (this.selectedItem != null) {
            if (
            this.columnModel != null
            && this.conditionModel != null
            && this.valueModel != null
            && this.logicalModel != null
            ) {
                let newCondition = (
                    this.columnModel + " | " 
                    + this.conditionModel
                    + this.valueModel + " | "
                    + this.logicalModel)

                this.filterConditions[this.selectedItem] = newCondition;
                this.listKey += 0.001;
            }
        }
    },

    removeCondition: function() {
        if (this.selectedItem != null) {
            this.filterConditions.splice(this.selectedItem,1);
            this.listKey += 0.001;
            this.selectedItem = null;
        }
    },

    clearAllConditions: function() {
        this.selectedItem = null;
        this.filterConditions = [];
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