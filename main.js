/*
This is not production level code, please look no further.
*/

//Entry point
window.onload = function(){
    //Element variables
    taskbarElement = document.getElementsByTagName("footer")[0];
    desktopElement = document.getElementById("desktop");
    startMenuElem  = document.getElementById("startMenu");

    //Mouse hooks
    document.onmouseup = onmouseup;
    document.onmousedown = onmousedown;
    document.onmousemove = onmousemove;

    //enter/leave CSS updates
    var startMenuOptions = document.getElementsByClassName("startMenuOption");
    for (var i = 0; i< startMenuOptions.length; i++)
    {
        var startMenuOption = startMenuOptions[i];
        startMenuOption.onpointerover = function(e){
            startMenuOption = e.target;
            startMenuOption.style.backgroundColor = "#000082";
            startMenuOption.style.color = "white";
        }
        startMenuOption.onpointerleave = function(e){
            startMenuOption = e.target;
            startMenuOption.style.backgroundColor = "#c3c3c3";
            startMenuOption.style.color = "black";
        }
    }

    //desktopIcon test code
    document.getElementById("terminalIcon").onclick = function()
    {
        //Create a window
        createWindow("Terminal", "File Edit View Help<br><div class=\"console\">C:\\>_<br><br><br></div>");
    }

    //desktopIcon test code
    document.getElementById("virusIcon").onclick = function()
    {
        //Create a window
        var window = createWindow("Virus Alert!", "Hi, I am a foreign virus but because of poor technology in my country unfortunately I am not able to harm your computer. Please be so kind to delete one of your important files yourself and then forward me to other users. Many thanks for your cooperation! Best regards, foreign virus");
        
        var flexButtons = document.createElement("div");
        flexButtons.style.display = "flex";
        
        var okButton = document.createElement("div");
        okButton.className = "button";
        okButton.innerText = "Yes";
        okButton.style.flexGrow = 1;
        okButton.style.flexShrink = 1;
        flexButtons.appendChild(okButton);

        var noButton = document.createElement("div");
        noButton.className = "button";
        noButton.innerText = "No";
        noButton.style.flexGrow = 1;
        noButton.style.flexShrink = 1;
        flexButtons.appendChild(noButton);

        var cancelButton = document.createElement("div");
        cancelButton.className = "button";
        cancelButton.innerText = "Cancel";
        cancelButton.style.flexGrow = 1;
        cancelButton.style.flexShrink = 1;
        flexButtons.appendChild(cancelButton);

        okButton.onclick = function() {closeWindow(window);}
        noButton.onclick = function() {closeWindow(window);}
        cancelButton.onclick = function() {closeWindow(window);}

        window.appendChild(flexButtons);
    }

    
    //desktopIcon test code
    document.getElementById("programmingFolder").onclick = function()
    {
        //Create a window
        var window = createWindow("Programming", "File Edit View Help");

        var fileViewer = document.createElement("div");
        fileViewer.className = "fileViewer";

        var fileIconContainer = document.createElement("div");
        fileIconContainer.className = "fileIconContainer";

        var fileIcon = document.createElement("div");
        fileIcon.className = "fileIcon folderIcon";
        fileIcon.innerText = "it's";

        var fileIcon2 = document.createElement("div");
        fileIcon2.className = "fileIcon folderIcon";
        fileIcon2.innerText = "not";

        var fileIcon3 = document.createElement("div");
        fileIcon3.className = "fileIcon folderIcon";
        fileIcon3.innerText = "finished";

        fileIconContainer.appendChild(fileIcon);
        fileIconContainer.appendChild(fileIcon2);
        fileIconContainer.appendChild(fileIcon3);
        fileViewer.appendChild(fileIconContainer);
        window.appendChild(fileViewer);
    }
}


function onmouseup()
{
    //Release grabbed window
    windowGrabbed = null;
}

function onmousedown(args)
{
    var path = args.composedPath();
    //For every item in the path
    for(var i = 0; i < path.length - 5; i++)
    {
        //Switch on each element's class type
        var element = path[i];
        switch(element.className)
        {
            case "desktop":
                //Only if the desktop was the first item in path
                if (i==0)
                {
                    //TODO UNFOCUS FUNCTION
                    //This technically works for now
                    closeWindow(createWindow("",""));
                }
                break;
            case "windowHeader":
                //Grab the window
                windowGrabbed = element.parentElement;
                
                //Store where on the header it was clicked
                var rect = element.getBoundingClientRect();
                dragOffsetX = rect.right - args.x;
                dragOffsetY = args.y - rect.y;

                //Ensure focus
                bringToFocus(windowGrabbed);

                //TODO: Redo
                //Hardcoded detection for clicking the "X"
                if (dragOffsetX > 2 && dragOffsetY > 2 && dragOffsetX < 2 + 16 && dragOffsetY < 2 + 15)
                {
                    //Close on "X"
                    closeWindow(windowGrabbed);
                    return;
                }
                break;

            case "taskbarButton":
                //Special case for startButton
                if (element.id == "startButton")
                {
                    //TODO
                    toggleStartMenu();
                    break;
                }

                //Either minimize or restore window
                //Depending on whether it's already in focus
                if (isInFocus(element.window))
                    minimize(element.window);
                else
                    restore(element.window);
                break;

            case "window":
                //Bring a window into focus when it is clicked in
                bringToFocus(element);
                break;
        }
    }
}

var isStatMenuUp = false;
var startMenuElem;
function toggleStartMenu()
{
    isStatMenuUp = !isStatMenuUp;

    if(isStatMenuUp)
    {
        startMenuElem.style.display = "block";
    }
    else
    {
        startMenuElem.style.display = "none";
    }
}

function onmousemove(args)
{
    //If a window is grabbed, do monkey math to move it
    //OOO OOO AAA AAA
    if(windowGrabbed)
    {
        windowGrabbed.style.left = (dragOffsetX + args.x - windowGrabbed.getBoundingClientRect().width + windowPadding) + "px";
        windowGrabbed.style.top = (args.y - dragOffsetY - windowPadding) + "px";
    }
}

//Desktop
//Desktop Variables
var taskbarElement;
var desktopElement;
//I don't know why i bothered with this one, it doesn't even work
var windowPadding = 3;

//Windows
//Window Variables
//Drag
var windowGrabbed = null;
var dragOffsetX = 0;
var dragOffsetY = 0;

//Window functions
function minimize(window)
{
    setWindowZ(window, -1);
    refreshCSS();
}

function restore(window)
{
    setWindowZ(window, 1);
    bringToFocus(window);
    refreshCSS();
}

function refreshCSS()
{
    //Oh Boy
    //todo redo
    var taskbarButtonSelectedBackgroundCSS = "url(img/taskbarButtonIcon.png) no-repeat top left, url(img/taskbarButtonSelectedLeft.png) no-repeat left, url(img/taskbarButtonSelectedRight.png) no-repeat right, url(img/taskbarButtonSelected.png) repeat-x";
    var taskbarButtonUnselectedBackgroundCSS = "url(img/taskbarButtonIcon.png) no-repeat top left, url(img/taskbarButtonLeft.png) no-repeat left, url(img/taskbarButtonRight.png) no-repeat right, url(img/taskbarButton.png) repeat-x";

    //Set header color to blue on focused window
    var windowHeaders = document.getElementsByClassName("windowHeader");
    for(var i = 0; i < windowHeaders.length; i++)
    {
        var windowHeader = windowHeaders[i];
        windowHeader.window = getWindows()[i];

        if (isInFocus(windowHeader.window))
        {
            windowHeader.style.backgroundColor = "#000082";
            windowHeader.window.taskbarButton.style.background = taskbarButtonSelectedBackgroundCSS;
        }
        else
        {
            windowHeader.style.backgroundColor = "#808080";
            windowHeader.window.taskbarButton.style.background = taskbarButtonUnselectedBackgroundCSS;
        }
    }

    //Set display to none on minimized windows
    var windows = getWindows();
    for(var i = 0; i < windows.length; i++)
    {
        var window = windows[i];

        if(getWindowZ(window) == -1)
            window.style.display = "none";
        else
            window.style.display = "";
    }
}

function isInFocus(window)
{
    return window.style.zIndex == getWindowCount();
}

function getWindows()
{
    return document.getElementsByClassName("window");
}

function getWindowCount()
{
    return getWindows().length;
}

function getWindowZ(window)
{
    return parseInt(window.style.zIndex);
}

function setWindowZ(window, z)
{
    window.style.zIndex = z;
}

function bringToFocus(contextWindow)
{
    //The Z index management system was written by an ape
    //But it works

    //List of all windows
    var windows = getWindows();

    //Highest Z-Index any window may have
    var maxZ = getWindowCount();

    //The old Z-Index of the window which will be brought to front
    var oldZ = getWindowZ(contextWindow);

    //Iterate for each window
    for(var i = 0; i < getWindowCount(); i++)
    {
        var window = windows[i];

        //Do not compare to the context window
        if (window != contextWindow)
        {
            var z = getWindowZ(window);

            //If it's in front of the window, move it back
            if (z > oldZ)
                z--;

            //Set z index
            setWindowZ(window, z);
        }
    }

    //Bring to front
    setWindowZ(contextWindow, maxZ);

    //For now, this is a good time to call this
    refreshCSS();
}

function closeWindow(window)
{
    //Fail-safe for z-index management
    bringToFocus(window);

    //Remove window and taskbarButton elements
    taskbarElement.removeChild(window.taskbarButton);
    desktopElement.removeChild(window);
}

function createWindow(title, content, x = "", y = "", width = "", height = "")
{
    //Create window element
    var window = document.createElement("div");
    window.className = "window";

    //Create windowHeader element
    var windowHeader = document.createElement("div");
    windowHeader.className = "windowHeader";

    //Create cross references between the window and windowHeader
    window.windowHeader = windowHeader;
    windowHeader.window = window;

    //Append the windowHeader to the window
    window.appendChild(windowHeader);

    //Set the windowHeader text to the window title    
    windowHeader.innerText = title;

    //Set the inner content of the window
    window.innerHTML += content;

    //Creat the taskbarButton
    var taskbarButton = document.createElement("div");
    taskbarButton.className = "taskbarButton";

    //Set the taskbarButton text to the window title
    taskbarButton.innerText = title;

    //Create cross references between the taskbarButton and window
    window.windowHeader = windowHeader;
    windowHeader.window = window;
    window.taskbarButton = taskbarButton;
    taskbarButton.window = window;

    //Add the window and taskbarButton to the document
    taskbarElement.appendChild(taskbarButton);
    desktopElement.appendChild(window);

    //Set the position of the window
    if(x!="")
        window.style.left = x + "px";
    else
        window.style.left = getWindowCount() * 16 + "px";

    if(y!="")
        window.style.top = y + "px";
    else
        window.style.top = 32 + getWindowCount() * 16 + "px";

    if(width!="")
        window.style.width = width + "px";
    if(height!="")
        window.style.height = height + "px";

    //Bring the window to front
    bringToFocus(window);

    return window;
}