import store from '../store/store.js'

// passing text from clicked item on navigation drawer
function performAction(clickedItem) {
    switch(clickedItem) {
        case "Import CSV File":
            //store.state.importFileDialog = true;
            store.commit('setImportFileDialog', true);
            break;
    }
}

export default performAction;