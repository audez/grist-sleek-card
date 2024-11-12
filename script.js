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
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    selectedTab = document.getElementById(tabName)
    selectedTab.style.display = "block";
}

function changeFont() {
    const fonts = document.getElementById("fontList");
    var selectedFont = fonts.options[fonts.selectedIndex].text;

    document.getElementById("home").style.fontFamily = selectedFont
    document.getElementById("fontList").style.fontFamily = selectedFont

}


function changeBackground() {
    const colors = document.getElementById("colorList");
    const selectedColor = colors.options[colors.selectedIndex].text;

    let bg;
    if (selectedColor === "Blue")
        bg = "#DFEBF0"
    else if (selectedColor === "Green")
        bg = "#E0ECEA"
    else if (selectedColor === "Pink")
        bg = "#E9E4F1"
    else if (selectedColor === "Grey") bg = "#EBECED"
    else bg = "#000"

    document.getElementById("home").style.background = bg;
}


‎index.css
+1-5
Original file line number	Diff line number	Diff line change
@@ -7,11 +7,7 @@ body {
    #configuration {
        background: #dbe2e9;
        color: #333;
position: fixed;
top: 0;
right: -520px;
width: 500px;
height: 100%;
display: none;
-webkit-transition-duration: 0.3s;
-moz-transition-duration: 0.3s;
-o-transition-duration: 0.3s;
‎index.html
+22-25
Original file line number	Diff line number	Diff line change
@@ -12,7 +12,7 @@

<body>

<div id="home" >
    <div id="home">
    <button onclick="toggleConfigurationPanel()">Open Configuration</button>

<div id="title"></div>
@@ -24,30 +24,27 @@


<div id="configuration">
    <b> Font: </b>
<select id="fontList" onchange="changeFont()">
    <option> ---Choose ---</option>
    <option>Helvetica</option>
    <option>Roboto</option>
    <option>Geist</option>
    <option>Satoshi</option>
    <option>Open Sans</option>
    <option>Nunito</option>
    <option>Lato</option>
    <option>Beanco</option>
</select>
<table>
    <tr>
        <td>Option1</td>
        <td><input type="text" id="setOption1"></td>
    </tr>
    <tr>
        <td>Option2</td>
        <td><input type="text" id="setOption2"></td>
    </tr>
</table>
<button onclick="saveOptions()">Save</button>
<form>
    <label>Font</label>
    <select id="fontList" class="dropdown" onchange="changeFont()">
        <option>Helvetica</option>
        <option>Futura</option>
        <option>Andale Mono</option>
        <option>Geneva</option>
        <option>Courier New</option>
        <option>Tahoma</option>
        <option>Impact</option>
        <option>Arial</option>
        <option>Arial Black</option>
        <option>Arial Rounded MT Bold</option>
        <option>Open Sans</option>
        <option>Georgia</option>
        <option>Rockwell</option>
    </select>

    <input type="submit" value="Submit" onclick="saveOptions()"/>
</form>
</div>

</body>
‎script.js
+8-4
Original file line number	Diff line number	Diff line change
@@ -1,45 +1,49 @@
    function toggleConfigurationPanel() {
        const element = document.getElementById("configuration");
        element.classList.toggle("on");
        const panel = document.getElementById("configuration");
        //panel.classList.toggle("on");
        panel.style.display = 'block';
    }

function changeFont() {
    var fonts = document.getElementById("fontList");
    document.getElementById("home").style.fontFamily = fonts.options[mylist.selectedIndex].text;
    const fonts = document.getElementById("fontList");
    var selectedFont = fonts.options[fonts.selectedIndex].text;
    document.getElementById("home").style.fontFamily = selectedFont
    document.getElementById("fontList").style.fontFamily = selectedFont
}



const columnsToMap = ['Title', 'Subtitle', 'Image', 'Text1', 'Text2']
const htmlReferences = ['title', 'subtitle', 'image', 'text1', 'text2']

grist.ready({columns: columnsToMap, requiredAccess: 'read table'});

grist.onRecord(async (record, mappings) => {
    console.log("record = " + JSON.stringify(record))


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

