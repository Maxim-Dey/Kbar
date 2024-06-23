app.beginUndoGroup("Add Auxiliary Rectangle");

    function auxiliaryRect() {
        
        //если композиция не существует, то показать сообщение и остановить выполнение кода
        var comp = app.project.activeItem;
        if (!comp) {alert("COMP "); return;} 
        
        var exp = 
        "var menu = effect('Anchor Corner')('Menu');" +"\n"+
        "var temp = thisProperty.propertyGroup(1)(2)/(2);"+"\n"+
        "if(menu == 1) {value;} else if(menu == 3) {[temp[0], temp[1]];} else if(menu == 4) {[-temp[0], temp[1]];} else if(menu == 5) {[temp[0], -temp[1]];} else if(menu == 6) {[-temp[0], -temp[1]];}";
                   
        //добавляем шейп со всеми свойсвами
        var shape = comp.layers.addShape();
        shape.property("Contents").addProperty("ADBE Vector Shape - Rect").property("Position").expression = exp;
        shape.property("Contents").addProperty("ADBE Vector Graphic - Fill").property("Color").setValue([0,0.59,1]);;
        shape.name = "Auxiliary Rectangle";

        //добавляем меню выбора якорного угла
        var dropdownItems = ["OFF", "(-", "LEFT TOP", "RIGHT TOP", "LEFT BOTTOM", "RIGHT DOWN"];
        shape.Effects.addProperty("Dropdown Menu Control").property(1).setPropertyParameters(dropdownItems);
        shape.Effects("Dropdown Menu Control").name = "Anchor Corner";
  
    }

    auxiliaryRect();

app.endUndoGroup();