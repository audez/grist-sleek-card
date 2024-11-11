function toggleConfigurationPanel() {
    const panel = document.getElementById("configuration");
    //panel.classList.toggle("on");
    panel.style.display = 'block';
}

function changeFont() {
    const fonts = document.getElementById("fontList");
    var selectedFont = fonts.options[fonts.selectedIndex].text;

    document.getElementById("home").style.fontFamily = selectedFont
    document.getElementById("fontList").style.fontFamily = selectedFont
}



const columnsToMap = ['Title', 'Subtitle', 'Image', 'Text1', 'Text2']
const htmlReferences = ['title', 'subtitle', 'image', 'text1', 'text2']

//columns: columnsToMap, 
grist.ready({requiredAccess: 'read table'});

grist.onRecord(async (record, mappings) => {
    console.log("record = " + JSON.stringify(record))


   // const mapped = grist.mapColumnNames(record);
   // console.log("mapped = " + JSON.stringify(mapped))

    // First check if all columns were mapped by user
/* if (Object.keys(mapped).length !== 0) {
     // Map columns and html elements  
     columnsToMap.forEach(function (item, index) {
         document.getElementById(htmlReferences[index]).innerText = mapped[item];
     });

     //getting img 
     const tokenInfo = await grist.docApi.getAccessToken({readOnly: true});
     const id = mapped.Image[0];  // only get the first attachment (there could be several)
     const src = `${tokenInfo.baseUrl}/attachments/${id}/download?auth=${tokenInfo.token}`;
     document.getElementById('image').setAttribute('src', src);

 } else {
     // Not all required columns were mapped.
     console.error("Please map at least one column");
 }*/
});



