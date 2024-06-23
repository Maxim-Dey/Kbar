function importFontStyles() {
    var tempFolder = Folder.temp;
    var file = new File(tempFolder.fsName + "/fontStyles.json");

    if (!file.exists) {
        alert("Font styles file not found.");
        return;
    }

    file.open("r");
    var fontStylesString = file.read();
    file.close();

    var fontStyles = JSON.parse(fontStylesString);
    var selectedLayers = app.project.activeItem.selectedLayers;

    if (selectedLayers.length === 0) {
        alert("Please select at least one layer.");
        return;
    } else if (selectedLayers.length === 1 && !(selectedLayers[0] instanceof TextLayer)) {
        alert("The selected layer is not a text layer.");
        return;
    }

    app.beginUndoGroup("Import font styles");

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            if (layer instanceof TextLayer) {
                var textDocument = layer.property("Source Text").value;
                try {
                    ///////// Main
                    //textDocument.resetCharStyle();
                    textDocument.font = fontStyles.font;
                    textDocument.fontSize = fontStyles.fontSize;
                    textDocument.fauxBold = fontStyles.fauxBold;
                    textDocument.fauxItalic = fontStyles.fauxItalic;
                    textDocument.tracking = fontStyles.tracking;
                    textDocument.leading = fontStyles.leading;
                    textDocument.justification = fontStyles.justification;
                    textDocument.ligature = fontStyles.ligature;
                    ///////// allCaps/smallCaps
                    if (fontStyles.allCaps) {
                        textDocument.fontCapsOption = FontCapsOption.FONT_ALL_CAPS;
                    } else if (fontStyles.smallCaps) {
                        textDocument.fontCapsOption = FontCapsOption.FONT_SMALL_CAPS;
                    } else {
                        textDocument.fontCapsOption = FontCapsOption.FONT_NORMAL_CAPS;
                    }
                    ///////// Fill
                    if (fontStyles.fill.applyFill) {
                        textDocument.applyFill = true;
                        if (fontStyles.fill.fillColor !== null && textDocument.characterRange(0, textDocument.text.length).fillColor !== undefined) {
                            textDocument.fillColor = fontStyles.fill.fillColor;
                        }
                    } else {
                        textDocument.applyFill = false;
                    }
                    ///////// Stroke
                    if (fontStyles.strokeFill.applyStroke) {
                        textDocument.applyStroke = true;
                        if (fontStyles.strokeFill.strokeColor !== null && textDocument.characterRange(0, textDocument.text.length).strokeColor !== undefined) {
                            textDocument.strokeColor = fontStyles.strokeFill.strokeColor;
                        }
                        if (fontStyles.strokeFill.strokeWidth !== null && textDocument.characterRange(0, textDocument.text.length).strokeWidth !== undefined) {
                            textDocument.strokeWidth = fontStyles.strokeFill.strokeWidth;
                        }
                    } else {
                        textDocument.applyStroke = false;
                    }
                    ///////// End
                    layer.property("Source Text").setValue(textDocument);

                } catch (error) {alert(error);}
            }
        }

    app.endUndoGroup();
};

importFontStyles();