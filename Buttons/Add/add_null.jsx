function createNullAndParentLayers() {
    // Проверка активного проекта
    if (app.project === null) {
        alert("Open your project in After Effects.");
        return;
    }

    // Проверка активной композиции
    var activeComp = app.project.activeItem;
    if (!(activeComp instanceof CompItem)) {
        alert("Activate a composition.");
        return;
    }

    // Получение выделенных слоев
    var selectedLayers = activeComp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("Select layers.");
        return;
    }

    var totalX = 0, totalY = 0, totalZ = 0;
    var numLayersWithPosition = 0;
    var minInPoint = Number.MAX_VALUE;
    var maxOutPoint = Number.MIN_VALUE;
    var minIndex = Number.MAX_VALUE;
    var is3D = false;

    // Проход по выделенным слоям
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];

        layer.parent = null;
        // Проверка наличия свойства "Position"
        if (layer.property("Position")) {
            var position = layer.position.value;
            totalX += position[0];
            totalY += position[1];
            if (layer.threeDLayer) {
                totalZ += position[2];
                is3D = true;
            }
            numLayersWithPosition++;
        }

        // Нахождение минимального и максимального времени
        if (layer.inPoint < minInPoint) {
            minInPoint = layer.inPoint;
        }
        if (layer.outPoint > maxOutPoint) {
            maxOutPoint = layer.outPoint;
        }

        // Нахождение минимального индекса
        if (layer.index < minIndex) {
            minIndex = layer.index;
        }
    }

    // Вычисление средних координат
    var avgX = totalX / numLayersWithPosition;
    var avgY = totalY / numLayersWithPosition;
    var avgZ = totalZ / numLayersWithPosition;

    // Создание нулевого объекта
    var nullLayer = activeComp.layers.addNull();
    nullLayer.name = "Parent Null";
    nullLayer.moveToBeginning();
    nullLayer.startTime = minInPoint;
    nullLayer.inPoint = minInPoint;
    nullLayer.outPoint = maxOutPoint;
    nullLayer.position.setValue([avgX, avgY, avgZ]);

    if (is3D) {
        nullLayer.threeDLayer = true;
    }

    // Перемещение нулевого объекта над самым нижним из выделенных слоев
    nullLayer.moveBefore(activeComp.layer(minIndex+1));

    // Установка нулевого объекта родительским для выделенных слоев
    for (var j = 0; j < selectedLayers.length; j++) {
       selectedLayers[j].parent = nullLayer;
    }
}

app.beginUndoGroup("Create Parent Null and Link Layers");
    createNullAndParentLayers();
app.endUndoGroup();