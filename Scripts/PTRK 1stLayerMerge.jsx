// c2019 PTRK Websolutions All rights reserved.
// Written by Patrik Walter

/*
@@@BUILDINFO@@@ PTRK 1stLayerMerge.jsx 1.0.0.1
*/


/* Special properties for a JavaScript to enable it to behave like an automation plug-in, the variable name must be exactly
   as the following example and the variables must be defined in the top 1000 characters of the file

// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
    <name>$$$/JavaScripts/PTRKMerge/Menu=PTRK 1stLayerMerge...</name>
    <category>scriptexport</category>
    <menu>export</menu>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

//PROMPT WINDOW FOR USER INPUT "LAYER SET NAME"
var layerSetName = prompt("Enter layer-set name","");

//TRY TO GET THE LAYER SET BY LAYER SET NAME
try{
    var myLayerSet = app.activeDocument.layerSets.getByName(layerSetName);
}catch(e){
    alert("There is no layer-set called '" + layerSetName + "'!");
}

//IF THE LAYER SET WAS FOUND, DO THE STUFF
if(myLayerSet){

    //GET THE FIRST LAYER FROM LAYER SET
    var topLayer = myLayerSet.layers[0];

    var startDisplayDialogs = app.displayDialogs
    app.displayDialogs = DialogModes.NO

    //PROMPT WINDOWS TO GET USER INPUT FOR FILES PREFIX
    var namePrefix = prompt("Please enter a file prefix","");
    if(namePrefix == ""){
        namePrefix = topLayer.name;
    }

    //FILE DIALOG FOR OUTPUT FOLDER
    var outputFolder = Folder.selectDialog("Select a folder for the output files");

    //
    for(var i = 1; i < myLayerSet.layers.length; i++){

        var currentLayer = myLayerSet.layers[i];
    
        currentLayer.move(topLayer,ElementPlacement.PLACEAFTER);
        saveJPEG( app.activeDocument, new File(outputFolder + '/' + namePrefix + "_" + i + '.jpg'), 10 );  
    }
    
    app.displayDialogs = startDisplayDialogs;
    
    alert("Export finished!\n\nAwesome? www.paypal.me/ptrk");


}else{
    
}

function saveJPEG( doc, saveFile, qty ) {  
    var saveOptions = new JPEGSaveOptions( );  
    saveOptions.embedColorProfile = true;  
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
    saveOptions.matte = MatteType.NONE;  
    saveOptions.quality = qty;   
    doc.saveAs( saveFile, saveOptions, true );  
}  
