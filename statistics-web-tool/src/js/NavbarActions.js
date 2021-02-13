// passing text from clicked item on navigation drawer
/*
* clickedItem = text from menu item clicked in navigation drawer
* refs = reference object to access different modals
*/
function performAction(clickedItem, refs) {
    switch(clickedItem) {
        case "Import CSV File":
            //store.commit('setImportFileDialog', true);
            refs.importFileDialogKey.showDialog = true;
            break;
    }
}

export default performAction;