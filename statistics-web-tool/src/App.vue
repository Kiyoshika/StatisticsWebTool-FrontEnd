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
      color="indigo darken-4"
      v-model="navbarDrawer"
      absolute
      temporary>
      <center><br><b style="color: white">Options:</b></center><br>
        <drop-down-menu menuText="Data" :analysisDropDown="dataDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Analysis" :analysisDropDown="analysisDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Tests" :analysisDropDown="testsDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Pre-Processing" :analysisDropDown="preprocessingDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Visualization" :analysisDropDown="visualizationDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <drop-down-menu menuText="Models" :analysisDropDown="modelsDropDown" @clicked="hideNavDrawer"></drop-down-menu><br>
        <v-btn block dark color="indigo darken-1">About</v-btn><br>
        <v-btn block dark color="indigo darken-1">Github</v-btn><br>
    </v-navigation-drawer>

    <!-- Main Body of Application -->
    <br><br><br>
    <v-container>
      <v-row>
      <v-col md="3">
        <data-set-list></data-set-list>
      </v-col>

    <v-col md="9">
    </v-col>
      </v-row>
    </v-container>
    </v-app>

    <!-- Modals and popups -->
    <import-file-dialog ref="importFileDialogKey"></import-file-dialog>
  </div>
</template>

<script>
import DataSetList from './components/DataSetList.vue';
import DropDownMenu from './components/DropDownMenu.vue';
import ImportFileDialog from './components/ImportFileDialog.vue';
import performAction from './js/NavbarActions.js';

export default {
  components: { DropDownMenu, DataSetList, ImportFileDialog },

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
  background-color: #454444;
}
</style>
