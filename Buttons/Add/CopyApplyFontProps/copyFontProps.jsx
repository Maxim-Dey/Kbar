(function() {
    var fontProps = {};

    function copyFontProps() {
        if (app.project.activeItem && app.project.activeItem.selectedLayers.length > 0) {// Исправить так чтобы просило выделить только один слой
            var selectedLayer = app.project.activeItem.selectedLayers[0];
            if (selectedLayer instanceof TextLayer) {
                var textDoc = selectedLayer.property("Source Text").value;
                fontProps = {
                    font: textDoc.font,
                    fontSize: textDoc.fontSize,
                                        /*
                    fillColor: textDoc.fillColor,
                    strokeColor: textDoc.strokeColor,
                    strokeWidth: textDoc.strokeWidth,
                    fauxBold: textDoc.fauxBold,
                    fauxItalic: textDoc.fauxItalic,
                    allCaps: textDoc.allCaps,
                    smallCaps: textDoc.smallCaps,
                    tracking: textDoc.tracking,
                    baselineShift: textDoc.baselineShift,
                    tsume: textDoc.tsume,
                    leading: textDoc.leading,
                    justification: textDoc.justification,
                    applyFill: textDoc.applyFill,
                    applyStroke: textDoc.applyStroke,
                    */
                };

                var file = new File(Folder.temp.absoluteURI + "/fontProps.json");
                file.open("w");
                file.write(JSON.stringify(fontProps));
                file.close();

                alert("Font properties copied successfully.");
            } else {
                alert("Please select a text layer.");
            }
        } else {
            alert("No layer selected.");
        }
    }

    copyFontProps();
})();