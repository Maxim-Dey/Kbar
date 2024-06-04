function createFolderIfNotExist(parentFolder, folderName) {
    var folderExists = false;

    for (var i = 1; i <= parentFolder.numItems; i++) {
        if (parentFolder.item(i) instanceof FolderItem && parentFolder.item(i).name === folderName) {
            folderExists = true;
            break;
        }
    }

    if (!folderExists) {
        return parentFolder.items.addFolder(folderName);
    }

    for (var i = 1; i <= parentFolder.numItems; i++) {
        if (parentFolder.item(i) instanceof FolderItem && parentFolder.item(i).name === folderName) {
            return parentFolder.item(i);
        }
    }
}

app.beginUndoGroup("Create Folders");

    var proj = app.project;
    var rootFolder = proj.rootFolder;
    var assetsFolder = createFolderIfNotExist(rootFolder, "1. ASSETS");
    createFolderIfNotExist(rootFolder, "2. SUPP COMP");
    createFolderIfNotExist(rootFolder, "3. DONE");
    createFolderIfNotExist(assetsFolder, "Images");
    createFolderIfNotExist(assetsFolder, "Sequences");
    createFolderIfNotExist(assetsFolder, "Videos");
    createFolderIfNotExist(assetsFolder, "Sounds");

app.endUndoGroup();