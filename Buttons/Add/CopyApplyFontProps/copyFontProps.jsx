function exportFontStyles() {
    var selectedLayer = app.project.activeItem.selectedLayers[0];

    if (selectedLayer instanceof TextLayer) {
        var textDocument = selectedLayer.property("Source Text").value;
        try {
            ///////// Main
            var fontStyles = {
                font: textDocument.font,
                fontSize: textDocument.fontSize,
                allCaps: textDocument.allCaps,
                smallCaps: textDocument.smallCaps,
                fauxBold: textDocument.fauxBold,
                fauxItalic: textDocument.fauxItalic,
                tracking: textDocument.tracking,
                leading: textDocument.leading,
                justification: textDocument.justification,
                ligature: textDocument.ligature
            }
            ///////// Fill
            if (textDocument.applyFill) {
                if (textDocument.characterRange(0, textDocument.text.length).fillColor !== undefined) {
                    fontStyles.fill = {
                        applyFill: textDocument.applyFill, 
                        fillColor: textDocument.fillColor
                    }
                } else {
                    fontStyles.fill = {
                        applyFill: textDocument.applyFill, 
                        fillColor: null
                    }
                }
            } else {
                fontStyles.fill = {
                    applyFill: textDocument.applyFill, 
                    fillColor: null
                }
            }
            ///////// Stroke
            if (textDocument.applyStroke) {
                if (textDocument.characterRange(0, textDocument.text.length).strokeColor !== undefined) {
                    fontStyles.strokeFill = {
                        applyStroke: textDocument.applyStroke, 
                        strokeColor: textDocument.strokeColor, 
                    }
                } else {
                    fontStyles.strokeFill = {
                        applyStroke: textDocument.applyStroke, 
                        strokeColor: null, 
                    }
                }
                if (textDocument.characterRange(0, textDocument.text.length).strokeWidth !== undefined) {
                    fontStyles.strokeFill.strokeWidth = textDocument.strokeWidth;
                } else {
                    fontStyles.strokeFill.strokeWidth = null;
                }
            } else {
                fontStyles.strokeFill = {
                    applyStroke: textDocument.applyStroke, 
                    strokeColor: null, 
                    strokeWidth: textDocument.strokeWidth
                }
            }
            ///////// End
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