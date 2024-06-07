{
    function duplicateLayersWithMasks() {
        var comp = app.project.activeItem; // Получаем активную композицию
        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        app.beginUndoGroup("Duplicate Layers with Masks");

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            alert("Please select at least one layer.");
            return;
        }

        for (var i = selectedLayers.length - 1; i >= 0; i--) {
            var layer = selectedLayers[i];

            // Проверяем, есть ли у слоя маски
            if (layer.property("Masks").numProperties > 0) {
                var numMasks = layer.property("Masks").numProperties;

                for (var j = numMasks; j >= 1; j--) {
                    var duplicateLayer = layer.duplicate();
                    
                    // Удаляем все маски, кроме одной
                    for (var k = numMasks; k >= 1; k--) {
                        if (k != j) {
                            duplicateLayer.property("Masks").property(k).remove();
                        }
                    }
                }

                // Удаляем оригинальный слой
                layer.remove();
            }
        }

        app.endUndoGroup();
    }

    duplicateLayersWithMasks();
}
