function addKeyframes() {
    var inputArray = kbar.button.argument.split(', ');
    var timeValue = parseFloat(inputArray[0]);
    var timeType = inputArray[1];
    var property = inputArray[2];

    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {alert("Please select a composition."); return;}
    if (!comp.selectedLayers[0]) {alert("Please select a layer."); return;}

    app.beginUndoGroup("Add Keyframes");

    var selectedLayers = comp.selectedLayers;
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        var props = [];

        if (property === "Select Property") {
            props = layer.selectedProperties;
        } else {
            var prop = getProperty(layer, property);
            if (prop) props.push(prop);
        }

        for (var j = 0; j < props.length; j++) {
            var prop = props[j];
            var currentTime = comp.time;
            var timeOffset = (timeType === "sec") ? timeValue : timeValue / comp.frameRate;

            if (prop.canSetExpression || prop.isTimeVarying) {
                addKeyframe(prop, currentTime);
                addKeyframe(prop, currentTime + timeOffset);
            }
        }
    }

    app.endUndoGroup();
}

function getProperty(layer, propertyName) {
    switch (propertyName) {
        case "Opacity": return layer.opacity;
        case "Position": return layer.position;
        case "Scale": return layer.scale;
        case "Anchor Point": return layer.anchorPoint;
        case "Rotation": return layer.rotation;
        default: return null;
    }
}

function addKeyframe(prop, time) {
    prop.setValueAtTime(time, prop.valueAtTime(time, false));
}

addKeyframes();