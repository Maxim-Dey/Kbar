function addParentOpacityExpression() {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {alert("Please select a composition."); return;}
    if (!comp.selectedLayers[0]) {alert("Please select a layer."); return;}
    for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];
        if (layer.parent !== null) {layer.opacity.expression = "parent.transform.opacity";}
    }
}
app.beginUndoGroup("Add Parent Opacity Expression");
    addParentOpacityExpression();
app.endUndoGroup();