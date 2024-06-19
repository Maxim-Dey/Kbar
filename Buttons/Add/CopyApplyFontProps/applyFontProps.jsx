(function() {
    
    var fontProps;

    function loadFontProps() {
        var file = new File(Folder.temp.absoluteURI + "/fontProps.json");
        if (file.exists) {
            file.open("r");
            var content = file.read();
            fontProps = JSON.parse(content);
            
            alert(fontProps.font);
            
            file.close();
        } else {
            alert("No font properties found. Please run the copyFontProps script first.");
        }
    }

    function applyFontProps() {
        if (app.project.activeItem /*&& app.project.activeItem.selectedLayers.length > 0*/) {
            if (!fontProps) {
                loadFontProps();
            }
            for (var i = 0; i < app.project.activeItem.selectedLayers.length; i++) {
                var selectedLayer = app.project.activeItem.selectedLayers[i];
                if (selectedLayer instanceof TextLayer) {
                    var textDoc = selectedLayer.property("Source Text").value;
                    textDoc.font = fontProps.font;
                    /*
                    textDoc.fontSize = fontProps.fontSize;
                    textDoc.fillColor = fontProps.fillColor;
                    textDoc.strokeColor = fontProps.strokeColor;
                    textDoc.strokeWidth = fontProps.strokeWidth;
                    textDoc.fauxBold = fontProps.fauxBold;
                    textDoc.fauxItalic = fontProps.fauxItalic;
                    textDoc.allCaps = fontProps.allCaps;
                    textDoc.smallCaps = fontProps.smallCaps;
                    textDoc.tracking = fontProps.tracking;
                    textDoc.baselineShift = fontProps.baselineShift;
                    textDoc.tsume = fontProps.tsume;
                    textDoc.leading = fontProps.leading;
                    textDoc.justification = fontProps.justification;
                    textDoc.applyFill = fontProps.applyFill;
                    textDoc.applyStroke = fontProps.applyStroke;
                    selectedLayer.property("Source Text").setValue(textDoc);
                    */
                }
            }
            alert("Font properties applied to selected layers.");
        } else {
            alert("No layer selected.");
        }
    }

        applyFontProps();
    
})();