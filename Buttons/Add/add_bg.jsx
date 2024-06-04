app.beginUndoGroup("Add BG");

    function addBG() {
        
        //если композиция не существует, то показать сообщение и остановить выполнение кода
        var comp = app.project.activeItem;
        if (!comp) {alert("COMP "); return;} 
        
        //экспрешены
        var exp1 ="[thisComp.width, thisComp.height]/2;";
        var exp2 ="[thisComp.width*thisComp.pixelAspect, thisComp.height];";
        
        //добавляем шейп со всеми свойсвами
        var shape = comp.layers.addShape();
        shape.property("Transform").property("Position").expression = exp1;
        shape.property("Contents").addProperty("ADBE Vector Shape - Rect").property("Size").expression = exp2;
        shape.property("Contents").addProperty("ADBE Vector Graphic - Fill").property("Color").setValue([0,0,0]);
        shape.name = "BG";
   
    }

    addBG();
    
app.endUndoGroup();