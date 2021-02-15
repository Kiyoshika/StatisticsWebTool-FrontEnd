import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      currentUsername: 'zach',

      // booleans to show/hide dialogs
      renameDialog: false,
      importFileDialog: false,
      deleteDatasetDialog: false,
      filterDataDialog: false,
      sortDataDialog: false,

      // when renaming a dataset, need to pass the current selected datset name
      currentSelectedDatasetName: '',

      // keys to "refresh" components globally
      datasetListKey: 0,
      currentDatasetKey: 0,
      tableDataKey: 0,

      // table data populated from DataSetListButtonActions.js
      tableColumns: [],
      tableData: [[]],

      // if dataset is filtered, use this flag to append a "(filtered)" on the current selected data set text
      // (but don't actually modify the text as it's used in API calls)
      dataIsFiltered: false
    },
    
    getters: {
      getUsername: (state) => {
        return state.currentUsername;
      },

      getCurrentSelectedDatasetName: (state) => {
        return state.currentSelectedDatasetName;
      },

      getDatasetListKey: (state) => {
          return state.datasetListKey;
      },

      getRenameDialog: (state) => {
        return state.renameDialog;
      },

      getImportFileDialog: (state) => {
        return state.importFileDialog;
      },

      getDeleteDatasetDialog: (state) => {
        return state.deleteDatasetDialog;
      },

      getCurrentDatasetKey: (state) => {
        return state.currentDatasetKey;
      },

      getTableColumns: (state) => {
        return state.tableColumns;
      },

      getTableData: (state) => {
        return state.tableData;
      },

      getTableDataKey: (state) => {
        return state.tableDataKey;
      },

      getFilterDataDialog: (state) => {
        return state.filterDataDialog;
      },

      getDataIsFiltered: (state) => {
        return state.dataIsFiltered;
      },

      getSortDataDialog: (state) => {
        return state.sortDataDialog;
      }
    },
  
    mutations: {
        setUsername(state, username) {
        state.currentUsername = username;
      },

      setCurrentSelectedDatasetName(state, datasetName) {
        state.currentSelectedDatasetName = datasetName;
      },

      refreshDatasetList(state) {
          state.datasetListKey += 0.001;
      },

      setRenameDialog(state, bool) {
        state.renameDialog = bool;
      },

      setImportFileDialog(state, bool) {
        state.importFileDialog = bool;
      },

      setDeleteDatasetDialog(state, bool) {
        state.deleteDatasetDialog = bool;
      },

      refreshCurrentDatasetText(state) {
        state.currentDatasetKey += 0.001;
      },

      setTableColumns(state, data) {
        state.tableColumns = data;
      },

      setTableData(state, data) {
        state.tableData = data;
      },

      refreshDataTable(state) {
        state.tableDataKey += 0.001;
      },

      setFilterDataDialog(state, bool) {
        state.filterDataDialog = bool;
      },

      setSortDataDialog(state, bool) {
        state.sortDataDialog = bool;
      },

      setDataIsFiltered(state, bool) {
        state.dataIsFiltered = bool;
      }
    }
  });

  export default store;