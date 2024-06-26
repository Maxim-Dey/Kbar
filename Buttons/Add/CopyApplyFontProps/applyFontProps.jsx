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
                var len =  textDocument.text.length;
                try {
                    //textDocument.resetCharStyle();
                    ///////// Font
                    if (textDocument.characterRange(0, len).font !== undefined && fontStyles.font !== null) {textDocument.font = fontStyles.font;}
                    ///////// Font Size
                    if (textDocument.characterRange(0, len).fontSize !== undefined && fontStyles.fontSize !== null) {textDocument.fontSize = fontStyles.fontSize;}
                    ///////// Leading
                    if (textDocument.characterRange(0, len).leading !== undefined && fontStyles.leading !== null) {textDocument.leading = fontStyles.leading;}
                    ///////// Auto Kern Type
                    if (textDocument.characterRange(0, len).autoKernType !== undefined && fontStyles.autoKernType !== null) {textDocument.autoKernType = fontStyles.autoKernType;}
                    ///////// Tracking
                    if (textDocument.characterRange(0, len).tracking !== undefined && fontStyles.tracking !== null) {textDocument.tracking = fontStyles.tracking;}
                    ///////// Fill
                    if (textDocument.characterRange(0, len).applyFill !== undefined && fontStyles.applyFill !== null) {
                        if (fontStyles.applyFill == true) {
                            textDocument.applyFill = fontStyles.applyFill;
                            if (textDocument.characterRange(0, len).fillColor !== undefined && fontStyles.fillColor !== null) {textDocument.fillColor = fontStyles.fillColor;}
                        } else if (fontStyles.applyFill == false) {
                            textDocument.applyFill = fontStyles.applyFill;
                        }
                    }
                    ///////// Stroke
                    if (textDocument.characterRange(0, len).applyStroke !== undefined && fontStyles.applyStroke !== null) {
                        if (fontStyles.applyStroke == true) {
                            textDocument.applyStroke = fontStyles.applyStroke;
                            if (textDocument.characterRange(0, len).strokeColor !== undefined && fontStyles.strokeColor !== null) {textDocument.strokeColor = fontStyles.strokeColor;}
                            if (textDocument.characterRange(0, len).strokeWidth !== undefined && fontStyles.strokeWidth !== null) {textDocument.strokeWidth = fontStyles.strokeWidth;}
                            if (textDocument.characterRange(0, len).lineJoinType !== undefined && fontStyles.lineJoinType !== null) {textDocument.lineJoinType = fontStyles.lineJoinType;}
                            if (textDocument.characterRange(0, len).strokeOverFill !== undefined && fontStyles.strokeOverFill !== null) {textDocument.strokeOverFill = fontStyles.strokeOverFill;}
                        } else if (fontStyles.applyStroke == false) {
                            textDocument.applyStroke = fontStyles.applyStroke;
                        }
                    }
                    ///////// Vertical Scale
                    if (textDocument.characterRange(0, len).verticalScale !== undefined && fontStyles.verticalScale !== null) {textDocument.verticalScale = fontStyles.verticalScale;}
                    ///////// Horizontal Scale
                    if (textDocument.characterRange(0, len).horizontalScale !== undefined && fontStyles.horizontalScale !== null) {textDocument.horizontalScale = fontStyles.horizontalScale;}
                    ///////// Baseline Shift
                    if (textDocument.characterRange(0, len).baselineShift !== undefined && fontStyles.baselineShift !== null) {textDocument.baselineShift = fontStyles.baselineShift;}
                    ///////// Tsume
                    if (textDocument.characterRange(0, len).tsume !== undefined && fontStyles.tsume !== null) {textDocument.tsume = fontStyles.tsume;}
                    ///////// All Caps / Small Caps
                    if (textDocument.characterRange(0, len).allCaps !== undefined && fontStyles.allCaps && fontStyles.allCaps !== null) {
                        textDocument.fontCapsOption = FontCapsOption.FONT_ALL_CAPS;
                    } else if (textDocument.characterRange(0, len).smallCaps !== undefined && fontStyles.smallCaps && fontStyles.smallCaps !== null) {
                        textDocument.fontCapsOption = FontCapsOption.FONT_SMALL_CAPS;
                    } else if (fontStyles.allCaps !== null && fontStyles.smallCaps !== null) {
                        //textDocument.fontCapsOption = FontCapsOption.FONT_NORMAL_CAPS;
                    }
                    ///////// Superscript / Subscript
                    if (textDocument.characterRange(0, len).superscript !== undefined && fontStyles.superscript && fontStyles.superscript !== null) {
                        textDocument.fontBaselineOption = FontBaselineOption.FONT_FAUXED_SUPERSCRIPT;
                    } else if (textDocument.characterRange(0, len).subscript !== undefined && fontStyles.subscript && fontStyles.subscript !== null) {
                        textDocument.fontBaselineOption = FontBaselineOption.FONT_FAUXED_SUBSCRIPT;
                    } else if (fontStyles.superscript !== null && fontStyles.subscript !== null) {
                        //textDocument.fontBaselineOption = FontBaselineOption.FONT_NORMAL_BASELINE;
                    }         
                    ///////// Ligature
                    if (textDocument.characterRange(0, len).ligature !== undefined && fontStyles.ligature !== null) {textDocument.ligature = fontStyles.ligature;} 
                    ///////// Digit Set
                    if (textDocument.characterRange(0, len).digitSet !== undefined && fontStyles.digitSet !== null) {textDocument.ligature = fontStyles.digitSet;} 
                    ///////// Justification
                    if (textDocument.characterRange(0, len).justification !== undefined && fontStyles.justification !== null) {textDocument.justification = fontStyles.justification;}
                    ///////// Direction
                    if (textDocument.characterRange(0, len).direction !== undefined && fontStyles.direction !== null) {textDocument.direction = fontStyles.direction;}
                    ///////// Faux Bold
                    if (textDocument.characterRange(0, len).fauxBold !== undefined && fontStyles.fauxBold !== null) {textDocument.fauxBold = fontStyles.fauxBold;}
                    ///////// Faux Italic
                    if (textDocument.characterRange(0, len).fauxItalic !== undefined && fontStyles.fauxItalic !== null) {textDocument.fauxItalic = fontStyles.fauxItalic;} 
                    ///////// End
                    layer.property("Source Text").setValue(textDocument);

                } catch (error) {alert(error);}
            }
        }

    app.endUndoGroup();
};

importFontStyles();