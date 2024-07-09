function reorderLayers() {
    // Check if there is an active composition
    var activeComp = app.project.activeItem;
    if (!(activeComp && activeComp instanceof CompItem)) {
        alert("Активная композиция не найдена. Скрипт остановлен.");
        return;
    }

    // Get the selected layers in the active composition
    var selectedLayers = activeComp.selectedLayers;
    if (selectedLayers.length <= 1) {
        alert("Выделено менее двух слоев. Скрипт остановлен.");
        return;
    }

    // Reverse the order of selected layers
    app.beginUndoGroup("Reverse Layer Order");

    // Sort selected layers by their index in ascending order
    selectedLayers.sort(function(a, b) {
        return a.index - b.index;
    });

    // Move layers to new positions in reverse order
    for (var i = selectedLayers.length - 1; i > 0; i--) {
        var layer = selectedLayers[i];
        layer.moveBefore(activeComp.layer(selectedLayers[0].index));
    }
    
    app.endUndoGroup();
}

try {
    reorderLayers();
} catch (error) {
    alert(error);
}