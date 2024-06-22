function exportFontStyles() {
    var selectedLayer = app.project.activeItem.selectedLayers[0];

    if (selectedLayer instanceof TextLayer) {
        var textDocument = selectedLayer.property("Source Text").value;
        try {
            var fontStyles = {
                font: textDocument.font,
                fontSize: textDocument.fontSize,
                //allCaps: textDocument.allCaps,
                //smallCaps: textDocument.smallCaps,
                fauxBold: textDocument.fauxBold,
                fauxItalic: textDocument.fauxItalic,
                tracking: textDocument.tracking,
                leading: textDocument.leading,
                justification: textDocument.justification,
                ligature: textDocument.ligature
            }
            /*
            if (textDocument.applyFill) {
                fontStyles.fill = {
                    applyFill: textDocument.applyFill,
                    fillColor: textDocument.fillColor
                }
            } else {
                fontStyles.fill = {
                    applyFill: textDocument.applyFill
                }
            }

            if (textDocument.applyStroke) {
                fontStyles.strokeFill = {
                    applyStroke: textDocument.applyStroke,
                    strokeColor: textDocument.strokeColor,
                    strokeWidth: textDocument.strokeWidth
                }
            } else {
                fontStyles.strokeFill = {
                    applyStroke: textDocument.applyStroke
                }
            }
            */
        } catch (error) {alert(error);}

        var fontStylesString = JSON.stringify(fontStyles);
        var tempFolder = Folder.temp;
        var file = new File(tempFolder.fsName + "/fontStyles.json");
        file.open("w");
        file.write(fontStylesString);
        file.close();

    } else {alert("Please select a text layer.");}
};

exportFontStyles();