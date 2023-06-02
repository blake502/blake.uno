/*
This is not production level code, please look no further.
*/

//Constants
//CSS
//Borders
const border_button = "url(img/border/button/top_left.png) no-repeat top left, url(img/border/button/top_right.png) no-repeat top right, url(img/border/button/bottom_left.png) no-repeat bottom left, url(img/border/button/bottom_right.png) no-repeat bottom right, url(img/border/button/top.png) repeat-x top, url(img/border/button/bottom.png) repeat-x bottom, url(img/border/button/left.png) repeat-y left, url(img/border/button/right.png) repeat-y right, #c3c3c3";
const border_button_pressed = "url(img/border/button_pressed/top_left.png) no-repeat top left, url(img/border/button_pressed/top_right.png) no-repeat top right, url(img/border/button_pressed/bottom_left.png) no-repeat bottom left, url(img/border/button_pressed/bottom_right.png) no-repeat bottom right, url(img/border/button_pressed/top.png) repeat-x top, url(img/border/button_pressed/bottom.png) repeat-x bottom, url(img/border/button_pressed/left.png) repeat-y left, url(img/border/button_pressed/right.png) repeat-y right, url(img/border/button_pressed/top_left.png) no-repeat top left, url(img/border/button_pressed/background.png) repeat";
const border_button_pressed_selected = "url(img/border/button_pressed_selected/top_left.png) no-repeat top left, url(img/border/button_pressed_selected/top_right.png) no-repeat top right, url(img/border/button_pressed_selected/bottom_left.png) no-repeat bottom left, url(img/border/button_pressed_selected/bottom_right.png) no-repeat bottom right, url(img/border/button_pressed_selected/top.png) repeat-x top, url(img/border/button_pressed_selected/bottom.png) repeat-x bottom, url(img/border/button_pressed_selected/left.png) repeat-y left, url(img/border/button_pressed_selected/right.png) repeat-y right, url(img/border/button_pressed_selected/top_left.png) no-repeat top left, url(img/border/button_pressed_selected/background.png) repeat";
const border_button_selected = "url(img/border/button_selected/top_left.png) no-repeat top left, url(img/border/button_selected/top_right.png) no-repeat top right, url(img/border/button_selected/bottom_left.png) no-repeat bottom left, url(img/border/button_selected/bottom_right.png) no-repeat bottom right, url(img/border/button_selected/top.png) repeat-x top, url(img/border/button_selected/bottom.png) repeat-x bottom, url(img/border/button_selected/left.png) repeat-y left, url(img/border/button_selected/right.png) repeat-y right, url(img/border/button_selected/top_left.png) no-repeat top left, #c3c3c3";
const border_content_thick = "url(img/border/content_thick/top_left.png) no-repeat top left, url(img/border/content_thick/top_right.png) no-repeat top right, url(img/border/content_thick/bottom_left.png) no-repeat bottom left, url(img/border/content_thick/bottom_right.png) no-repeat bottom right, url(img/border/content_thick/top.png) repeat-x top, url(img/border/content_thick/bottom.png) repeat-x bottom, url(img/border/content_thick/left.png) repeat-y left, url(img/border/content_thick/right.png) repeat-y right";
const border_content_thin = "url(img/border/content_thin/top_left.png) no-repeat top left, url(img/border/content_thin/top_right.png) no-repeat top right, url(img/border/content_thin/bottom_left.png) no-repeat bottom left, url(img/border/content_thin/bottom_right.png) no-repeat bottom right, url(img/border/content_thin/top.png) repeat-x top, url(img/border/content_thin/bottom.png) repeat-x bottom, url(img/border/content_thin/left.png) repeat-y left, url(img/border/content_thin/right.png) repeat-y right";
const border_window = "url(img/border/window/top_left.png) no-repeat top left, url(img/border/window/top_right.png) no-repeat top right, url(img/border/window/bottom_left.png) no-repeat bottom left, url(img/border/window/bottom_right.png) no-repeat bottom right, url(img/border/window/top.png) repeat-x top, url(img/border/window/bottom.png) repeat-x bottom, url(img/border/window/left.png) repeat-y left, url(img/border/window/right.png) repeat-y right, #c3c3c3";

var isStatMenuUp = false;

//Desktop
//Desktop Variables
var taskbar_element;
var desktop_element;
var start_menu_element;
var start_button;

//I don't know why i bothered with this one, it doesn't even work
var windowPadding = 3;

//Windows
//Window Variables
//Drag
var windowGrabbed = null;
var dragOffsetX = 0;
var dragOffsetY = 0;

//Entry point
window.onload = function(){
    //Element variables
    taskbarElement = document.getElementsByTagName("footer")[0];
    desktopElement = document.getElementById("desktop");
    startMenuElem  = document.getElementById("start_menu");
    startButton = document.getElementById("start_button");

    //Mouse hooks
    document.onmouseup = onmouseup;
    document.onmousedown = onmousedown;
    document.onmousemove = onmousemove;

    //enter/leave CSS updates
    var startMenuOptions = document.getElementsByClassName("start_menu_option");
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
    document.getElementById("terminal_icon").onclick = function()
    {
        //Create a window
        createWindow("Terminal", "File Edit View Help<br><div class=\"console\">C:\\>_<br><br><br></div>");
    }

    //desktopIcon test code
    document.getElementById("virus_icon").onclick = function()
    {
        //Create a window
        var window = createWindow("Virus Alert!", "<div class=\"file_viewer\">Hi, I am a foreign virus but because of poor technology in my country unfortunately I am not able to harm your computer. Please be so kind to delete one of your important files yourself and then forward me to other users. Many thanks for your cooperation! Best regards, foreign virus</div>");
        
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
    document.getElementById("programming_folder_icon").onclick = function()
    {
        //Create a window
        var window = createWindow("Programming", "File Edit View Help");

        var fileViewer = document.createElement("div");
        fileViewer.className = "file_viewer";

        var fileIconContainer = document.createElement("div");
        fileIconContainer.className = "file_icon_container";

        var fileIcon = document.createElement("div");
        fileIcon.className = "file_icon folder_icon";
        fileIcon.innerText = "C";

        var fileIcon2 = document.createElement("div");
        fileIcon2.className = "file_icon folder_icon";
        fileIcon2.innerText = "C#";

        var fileIcon3 = document.createElement("div");
        fileIcon3.className = "file_icon folder_icon";
        fileIcon3.innerText = "JavaScript";

        var fileIcon4 = document.createElement("div");
        fileIcon4.className = "file_icon folder_icon";
        fileIcon4.innerText = "Web";

        var fileIcon5 = document.createElement("div");
        fileIcon5.className = "file_icon";
        fileIcon5.innerText = "(it's not finished).txt";

        fileIconContainer.appendChild(fileIcon);
        fileIconContainer.appendChild(fileIcon2);
        fileIconContainer.appendChild(fileIcon3);
        fileIconContainer.appendChild(fileIcon4);
        fileIconContainer.appendChild(fileIcon5);
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
            case "window_header":
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

            case "button":
                //element.style.background = border_button_pressed_selected;
                //return true;
                break;

            case "taskbar_button":
                //Special case for start_button
                if (element.id == "start_button")
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

function toggleStartMenu()
{
    isStatMenuUp = !isStatMenuUp;

    if(isStatMenuUp)
    {
        startMenuElem.style.display = "block";
        startButton.style.background = border_button_selected;
    }
    else
    {
        startMenuElem.style.display = "none";
        startButton.style.background = border_button;
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

    //Set header color to blue on focused window
    var windowHeaders = document.getElementsByClassName("window_header");
    for(var i = 0; i < windowHeaders.length; i++)
    {
        var windowHeader = windowHeaders[i];
        windowHeader.window = getWindows()[i];

        if (isInFocus(windowHeader.window))
        {
            windowHeader.style.backgroundColor = "#000082";
            windowHeader.window.taskbarButton.style.background = border_button_pressed;
        }
        else
        {
            windowHeader.style.backgroundColor = "#808080";
            windowHeader.window.taskbarButton.style.background = border_button;
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
    windowHeader.className = "window_header";

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
    taskbarButton.className = "taskbar_button";

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