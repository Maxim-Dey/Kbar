function exportFontStyles() {
    var selectedLayer = app.project.activeItem.selectedLayers[0];

    if (selectedLayer instanceof TextLayer) {
        var textDocument = selectedLayer.property("Source Text").value;
        var len =  textDocument.text.length;
        try {
            ///////// Main
            var fontStyles = {
                font: null, 
                fontSize: null, 
                leading: null, 
                autoKernType: null, 
                tracking: null, 
                applyFill: null, 
                fillColor: null, 
                applyStroke: null, 
                strokeColor: null, 
                strokeWidth: null, 
                lineJoinType: null, 
                strokeOverFill: null, 
                verticalScale: null, 
                horizontalScale: null, 
                baselineShift: null,
                tsume: null,
                allCaps: null, 
                smallCaps: null, 
                superscript: null,
                subscript: null,
                ligature: null, 
                digitSet: null, 
                justification: null,
                direction: null,
                fauxBold: null,
                fauxItalic: null,
            }
            ///////// Font
            if (textDocument.characterRange(0, len).font !== undefined) {fontStyles.font = textDocument.font;}
            ///////// Font Size
            if (textDocument.characterRange(0, len).fontSize !== undefined) {fontStyles.fontSize = textDocument.fontSize;}
            ///////// Leading
            if (textDocument.characterRange(0, len).leading !== undefined) {fontStyles.leading = textDocument.leading;} 
            ///////// Auto Kern Type
            if (textDocument.characterRange(0, len).autoKernType !== undefined) {fontStyles.autoKernType = textDocument.autoKernType;}
            ///////// Tracking
            if (textDocument.characterRange(0, len).tracking !== undefined) {fontStyles.tracking = textDocument.tracking;} 
            ///////// Fill
            if (textDocument.characterRange(0, len).applyFill !== undefined) {
                if (textDocument.applyFill == true) {
                    fontStyles.applyFill = textDocument.applyFill;
                    if (textDocument.characterRange(0, len).fillColor !== undefined) {fontStyles.fillColor = textDocument.fillColor;}
                } else if (textDocument.applyFill == false) {
                    fontStyles.applyFill = textDocument.applyFill;
                }
            }
            ///////// Stroke
            if (textDocument.characterRange(0, len).applyStroke !== undefined) {
                if (textDocument.applyStroke == true) {
                    fontStyles.applyStroke = textDocument.applyStroke;
                    if (textDocument.characterRange(0, len).strokeColor !== undefined) {fontStyles.strokeColor = textDocument.strokeColor;}
                    if (textDocument.characterRange(0, len).strokeWidth !== undefined) {fontStyles.strokeWidth = textDocument.strokeWidth;}
                    if (textDocument.characterRange(0, len).lineJoinType !== undefined) {fontStyles.lineJoinType = textDocument.lineJoinType;}
                    if (textDocument.characterRange(0, len).strokeOverFill !== undefined) {fontStyles.strokeOverFill = textDocument.strokeOverFill;}
                } else if (textDocument.applyStroke == false) {
                    fontStyles.applyStroke = textDocument.applyStroke;
                }
            }
            ///////// Vertical Scale
            if (textDocument.characterRange(0, len).verticalScale !== undefined) {fontStyles.verticalScale = textDocument.verticalScale;}
            ///////// Horizontal Scale
            if (textDocument.characterRange(0, len).horizontalScale !== undefined) {fontStyles.horizontalScale = textDocument.horizontalScale;}
            ///////// Baseline Shift
            if (textDocument.characterRange(0, len).baselineShift !== undefined) {fontStyles.baselineShift = textDocument.baselineShift;}
            ///////// Tsume
            if (textDocument.characterRange(0, len).tsume !== undefined) {fontStyles.tsume = textDocument.tsume;}
            ///////// All Caps
            if (textDocument.characterRange(0, len).allCaps !== undefined) {fontStyles.allCaps = textDocument.allCaps;}
            ///////// Small Caps
            if (textDocument.characterRange(0, len).smallCaps !== undefined) {fontStyles.smallCaps = textDocument.smallCaps;}
            ///////// Superscript
            if (textDocument.characterRange(0, len).superscript !== undefined) {fontStyles.superscript = textDocument.superscript;}
            ///////// subscript
            if (textDocument.characterRange(0, len).subscript !== undefined) {fontStyles.subscript = textDocument.subscript;}
            ///////// Ligature
            if (textDocument.characterRange(0, len).ligature !== undefined) {fontStyles.ligature = textDocument.ligature;} 
            ///////// Digit Set
            if (textDocument.characterRange(0, len).digitSet !== undefined) {fontStyles.ligature = textDocument.digitSet;} 
            ///////// Justification
            if (textDocument.characterRange(0, len).justification !== undefined) {fontStyles.justification = textDocument.justification;}
            ///////// Direction
            if (textDocument.characterRange(0, len).direction !== undefined) {fontStyles.direction = textDocument.direction;}
            ///////// Faux Bold
            if (textDocument.characterRange(0, len).fauxBold !== undefined) {fontStyles.fauxBold = textDocument.fauxBold;}
            ///////// Faux Italic
            if (textDocument.characterRange(0, len).fauxItalic !== undefined) {fontStyles.fauxItalic = textDocument.fauxItalic;}             
        } catch (error) {alert(error);}

        var fontStylesString = JSON.stringify(fontStyles);
        var tempFolder = Folder.temp;
        var file = new File(tempFolder.fsName + "/fontStyles.json");
        file.open("w");
        file.write(fontStylesString);
        file.close();
    } else {alert("Please select a text layer.");}
}

exportFontStyles();