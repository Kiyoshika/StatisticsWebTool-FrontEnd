import store from '../store/store.js'
import axios from 'axios'

function dataAction(action, datasetName) {
    switch(action) {
        case "Load Data":
            store.commit('setCurrentSelectedDatasetName', datasetName);
            // loading original dataset, so disable flag for filtered data
            store.commit('setDataIsFiltered', false);
            axios({
                method: 'get',
                url: 'http://localhost:2020/getData/'+datasetName,
                headers: {
                    'client-username': store.getters.getUsername
                }
            }).then(response => {
                store.commit('setTableColumns', response.data[datasetName].columns);
                store.commit('setTableData', response.data[datasetName].data);
                store.commit('refreshDataTable');
            })
            break;

        case "Rename":
            store.commit('setRenameDialog', true);
            store.commit('setCurrentSelectedDatasetName', datasetName);
            break;

        case "Delete":
            store.commit('setDeleteDatasetDialog', true);
            store.commit('setCurrentSelectedDatasetName', datasetName);
            store.commit('refreshCurrentDatasetText');
            break;
    }
}

export default dataAction;