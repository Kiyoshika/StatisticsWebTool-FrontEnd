<template>
  <div id="app">
    <v-app>
      <!-- Navigation menu and drawer -->
    <v-app-bar app
      color="indigo darken-4"
      dense
      dark
    >
    <v-app-bar-nav-icon @click="navbarDrawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title class="px-3">Statistics Web Tool</v-toolbar-title>

    </v-app-bar>

    <v-navigation-drawer
      class="px-3"
      color="indigo darken-4"
      v-model="navbarDrawer"
      absolute
      temporary>
      <center><br><b style="color: white">Options:</b></center><br>
        <drop-down-menu menuText="Data" :dropDownItems="dataDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Analysis" :dropDownItems="analysisDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Tests" :dropDownItems="testsDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Pre-Processing" :dropDownItems="preprocessingDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Visualization" :dropDownItems="visualizationDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Models" :dropDownItems="modelsDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <v-btn block dark color="indigo darken-1">About</v-btn><br>
        <v-btn block dark color="indigo darken-1">Github</v-btn><br>
    </v-navigation-drawer>

    <!-- Main Body of Application -->
    <br><br><br>

        <v-container>
          <v-row>
            <v-col md="3">
              <data-set-list :key="this.$store.getters.getDatasetListKey"></data-set-list>
            </v-col>

            <v-col md="9">
              <v-card color="indigo darken-4" style="color: white" class="px-3 pb-3">
                <center><b :key="this.$store.getters.getCurrentDatasetKey">Current Dataset: {{ this.$store.getters.getCurrentSelectedDatasetName }}</b></center>
                <table-data :key="this.$store.getters.getTableDataKey" id="tableData"></table-data>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-app>

    <!-- Modals and popups -->
    <import-file-dialog ref="importFileDialogKey"></import-file-dialog>
    <rename-data-set-dialog ref="renameDatasetKey"></rename-data-set-dialog>
    <delete-dataset-dialog></delete-dataset-dialog>
  </div>
</template>

<script>
import DataSetList from './components/DataSetList.vue';
import DeleteDatasetDialog from './components/DeleteDatasetDialog.vue';
import DropDownMenu from './components/DropDownMenu.vue';
import ImportFileDialog from './components/ImportFileDialog.vue';
import RenameDataSetDialog from './components/RenameDataSetDialog.vue';
import TableData from './components/TableData.vue';
import performAction from './js/NavbarActions.js';

export default {
  components: { DropDownMenu, DataSetList, ImportFileDialog, RenameDataSetDialog, DeleteDatasetDialog, TableData },

  name: 'App',

  data: () => ({
    // show nav bar drawer
    navbarDrawer: false,

    // dropdown menu items in navigation bar
    dataDropDown: [
      "Import CSV File",
      "Select Columns",
      "Filter Table",
      "Sort Table",
      "Rename Dataset",
      "Delete Dataset"
    ],

    analysisDropDown: [
      "Descriptive Statistics",
      "Correlation",
      "Confidence Interval"
    ],

    testsDropDown: [
      "T-Test [Means]",
      "Levene's Test [Variance]",
      "One-Way ANOVA [Means]",
      "KS-Test (Lilliefor) [Distributions]",
      "Chi-Squared Test [Counts/Expectation]"
    ],

    preprocessingDropDown: [
      "Standard Scaling [Numerical]",
      "Label Encoding [Categorical]",
      "One-Hot Encoding [Categorical]"
    ],

    visualizationDropDown: [
      "Scatter Plot",
      "Histogram",
      "Line Chart",
      "Bar Chart",
      "Pie Chart"
    ],

    modelsDropDown: [
      "Linear Regression",
      "Polynomial Regression",
      "Logistic Regression",
      "K-Nearest Neighbors",
      "K-Means Clustering",
      "Decision Tree Classifier",
      "Random Forest Classifier",
      "Support Vector Machine Classifier",
      "Naive Bayes Classifier"
    ]
  }),

  methods: {
    // hide navigation drawer when clicking an option
    hideNavDrawer: function(clickedItem) {
      this.navbarDrawer = false;
      // NavbarActions.js --> performAction(clickedItem)
      performAction(clickedItem, this.$refs);

    }
  }
};
</script>

<style scoped>
#app {
  background-color: #d6d6d6;
}

#tableData {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
