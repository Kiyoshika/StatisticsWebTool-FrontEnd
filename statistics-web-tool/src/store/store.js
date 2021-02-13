import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      showImportFileDialogBool: false
    },
    
    getters: {
      showImportFileDialog: (state) => {
        return state.showImportFileDialogBool;
      }
    },
  
    mutations: {
        setImportFileDialog(state, showOrHideBool) {
        state.showImportFileDialogBool = showOrHideBool;
      }
    }
  });

  export default store;