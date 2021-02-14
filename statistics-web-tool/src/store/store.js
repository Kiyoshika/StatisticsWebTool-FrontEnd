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

      // when renaming a dataset, need to pass the current selected datset name
      currentSelectedDatasetName: '',

      // keys to "refresh" components globally
      datasetListKey: 0,
      currentDatasetKey: 0,
      tableDataKey: 0,

      // table data populated from DataSetListButtonActions.js
      tableColumns: [],
      tableData: [[]]
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
      }
    }
  });

  export default store;