try {
     // Принимает аргументы от кнопки и делит их собирая в массив
    var kBarArg = kbar.button.argument.split(', ');
} catch (error) {
    // Для дебагинга
    var kBarArg = ["75", "75"];
}

function main() {
    
    var comp = app.project.activeItem;
    if (comp == undefined) {alert("SELECT COMP"); return;} // Если композиция не активна, то показывает сообщение и останавливает выполнение кода 
    
    var props = comp.selectedProperties;
    if (props[0] == undefined) {alert("SELECT PROPERTY OR KEY"); return;} // Если свойство не выделенно, то показывает сообщение и останавливает выполнение кода

    // Проверяет массив на безопасное преобразование из строковых значений в числовые
    if (isNaN(kBarArg[0])==true) {alert("INCORRECT FIRST ARGUMENT"); return;}
    if (isNaN(kBarArg[1])==true) {alert("INCORRECT SECOND ARGUMENT"); return;}

    // Заменяет строковые значения на числовые
    var numArg = [];
    for (var n = 0; n < kBarArg.length; n++) {
        numArg.push(Number(kBarArg[n]));
    }

    app.beginUndoGroup("Add Ease");  
    
    // Формирует значения воздействия ускорений
    var easeIn = new KeyframeEase(0, numArg[0]);
    var easeOut = new KeyframeEase(0, numArg[1]); 
    
    for (i=0; i<props.length; i++) { // Цикл по выделенным свойствам

        if (props[i].propertyType === PropertyType.PROPERTY && props[i].canVaryOverTime == true) { // Пропускает свойства в которых не может быть ключевых кадров
            var keys = props[i].selectedKeys; // Массив выбранных ключей в свойстве
            for (j=0; j<keys.length; j++) { // Цикл по выделенным ключам в свойстве
                var inInterp = props[i].keyInInterpolationType(keys[j]);
                var outInterp = props[i].keyOutInterpolationType(keys[j]);
                if (outInterp === KeyframeInterpolationType.HOLD || inInterp === KeyframeInterpolationType.HOLD) { // Проверка возможности изменения ускорений
                    try { // Пропускает спецефичные ключевые кадры
                        props[i].setInterpolationTypeAtKey(keys[j], KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR); // Проверка имеет ли ключевой кадр возможность измениться
                        easy_peasy(props[i], keys[j], easeIn, easeOut); // Вызывает функцию добавления ускорений
                    } catch(error) {/*alert("The script cannot be applied to the property «" + props[i].name + "»");*/}               
                } else {
                    easy_peasy(props[i], keys[j], easeIn, easeOut); // Вызывает функцию добавления ускорений
                }
            }
        }
        
    }
    
    app.endUndoGroup();

}
    
function easy_peasy(prop, key, easeIn, easeOut) { // Функция добавления ускорений
        if (prop.propertyValueType === PropertyValueType.ThreeD) { // Проверяет количество измерений
            prop.setTemporalEaseAtKey(key, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]); 
        } else if (prop.propertyValueType === PropertyValueType.TwoD) {
            prop.setTemporalEaseAtKey(key, [easeIn, easeIn], [easeOut, easeOut]);
        } else {
            // Проверка на критичную ошибку для свойства Colors
            if (prop.name === "Colors" && prop.parentProperty.parentProperty.matchName !== "ADBE Root Vectors Group" && prop.parentProperty.parentProperty.name === "Contents") {
                alert("The «Colors» property in the Gradient Fill, which is located in a subgroup, cannot be correctly modified by the script. This leads to a crash of After Effects without returning any error. The Colors property was restricted for security reasons. Taking this opportunity, I would like to say hello to the developers at Adobe.");
            } else {
                prop.setTemporalEaseAtKey(key, [easeIn], [easeOut]);
            }
        }
}

main();