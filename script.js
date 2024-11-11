const columnsToMap = ['Title', 'Subtitle', 'Image', 'Text1', 'Text2']
const htmlReferences = ['title', 'subtitle', 'image', 'text1', 'text2']
  
grist.ready({columns: columnsToMap, requiredAccess: 'read table'});

grist.onRecord(async (record, mappings) => {
  console.log("record = " + JSON.stringify(mapped))

  
  const mapped = grist.mapColumnNames(record);
  console.log("mapped = " + JSON.stringify(mapped))
    
  // First check if all columns were mapped by user
  if (Object.keys(mapped).length !== 0) {
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
  }
});
