// Проверяем, есть ли активная композиция
var activeComp = app.project.activeItem;
if (activeComp && activeComp instanceof CompItem) {
    app.beginUndoGroup("Reverse Layer Order by Index");

    // Получаем все выделенные слои
    var selectedLayers = activeComp.selectedLayers;
    var numSelectedLayers = selectedLayers.length;

    if (numSelectedLayers > 1) {
        // Сортируем массив слоев по индексу в порядке убывания
        selectedLayers.sort(function(a, b) {
            return b.index - a.index;
        });

        // Перемещаем слои в порядке убывания индексов
        for (var i = 0; i < numSelectedLayers; i++) {
            var layer = selectedLayers[i];
            // Перемещаем слой в конец, чтобы он оказался выше остальных
            layer.moveToEnd();
        }
    } else {
        alert("Select more than one layer.");
    }

    app.endUndoGroup();
} else {
    alert("Select a composition.");
}