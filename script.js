

function openTab(tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    selectedTab = document.getElementById(tabName)
    selectedTab.style.display = "block";
    element.classList.add("active");
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
grist.ready(
    {requiredAccess: 'read table'});

grist.onRecord(async (record, mappings) => {
    console.log("record = " + JSON.stringify(record))


    // const mapped = grist.mapColumnNames(record);
    // console.log("mapped = " + JSON.stringify(mapped))

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
    // Set the first tab ("home") active
    const homeTab = document.getElementById("home")
    homeTab.style.display = "block";
    homeTab.classList.add("active");



    console.log("record = " + JSON.stringify(record))


   // const mapped = grist.mapColumnNames(record);
   // console.log("mapped = " + JSON.stringify(mapped))

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



