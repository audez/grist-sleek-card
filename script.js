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
    const selectedFont = fonts.options[fonts.selectedIndex].text;

    document.getElementById("home").style.fontFamily = selectedFont;
    document.getElementById("fontList").style.fontFamily = selectedFont;
}

function setFont(fontName) {
    document.getElementById("fontList").value = fontName;

    document.getElementById("home").style.fontFamily = fontName;
    document.getElementById("fontList").style.fontFamily = fontName;
}

function changeBackground() {
    const colors = document.getElementById("colorList");
    const selectedColor = colors.options[colors.selectedIndex].text;

    let bg;
    if (selectedColor === "Blue")
        bg = "#DDEBF8"
    else if (selectedColor === "Green")
        bg = "#E0ECEA"
    else if (selectedColor === "Violet")
        bg = "#E6E4F6"
    else if (selectedColor === "Grey") bg = "#EBECED"
    else bg = "#fff"

    document.getElementById("home").style.background = bg;
    return bg;
}

function setBackground(color) {
    document.getElementById("colorList").value = color;
    document.getElementById("home").style.background = color;
}

function addNewGroup() {
    let i = 0;
    const original = document.getElementById("group");
    const clone = original.cloneNode(true);
    clone.id = "group" + ++i;
    original.parentNode.appendChild(clone);
}

const columnsToMap = ['Title', 'Subtitle', 'Image', 'Text1', 'Text2']
const htmlReferences = ['title', 'subtitle', 'image', 'text1', 'text2']


grist.ready({
    columns: columnsToMap,
    // Register configuration handler to show configuration panel.
    onEditOptions() {
        document.getElementById("tab").style.display = 'block';
    },
    // Inform about required access level.
    requiredAccess: 'read table'
});

grist.onOptions(function (options, interaction) {
    if (options) {
        setFont(options.font)
        setBackground(options.backgroundColor)
    } else {
        // No widget options were saved, fallback to default ones.
    }
});


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


// Define handler for the Save button.
async function saveOptions() {
    const fonts = document.getElementById("fontList");
    const selectedFont = fonts.options[fonts.selectedIndex].text;
    await grist.widgetApi.setOption('font', selectedFont);

    const bgColor = changeBackground()
    await grist.widgetApi.setOption('backgroundColor', bgColor);
    // There is no need to update visible options, as Grist will send us a new message that will
    // be handled by the onOptions handler.
    showPanel('main');
}