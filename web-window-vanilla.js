/*
    WebWindow - Windowing system for the web
    Created By: Sean Lum 
    GitHub: seanlum
*/
var WebWindow = function() {}
WebWindow.desktopID = 'foreground';
WebWindow.beforeElementID = 'before-node';
WebWindow.classes = {
    fadeIn : 'web-window-fade-in',
    fadeOut : 'web-window-fade-out',
    invisible : 'web-window-invisible',
    minimize : 'web-window-minimize',
    maximize : 'web-window-maximize',
    minimizeAnimation : 'web-window-minimize-animation',
    maximizeAnimation : 'web-window-maximize-animation',
    taskFrameWindow : 'task-frame-window-border',
    taskFrameHeader : 'task-frame-header',
    taskFrameButtons : 'task-frame-buttons',
    taskFrameContent : 'task-frame-content',
    taskFrameDragbar : 'task-frame-dragbar',
    taskFrameResize : 'task-frame-resize',
    taskFrameWindowTitle : 'task-frame-window-title',
    resizer : 'web-window-resizer',
    resizeTop : 'web-window-resize-top',
    resizeBottom : 'web-window-resize-bottom',
    resizeRight : 'web-window-resize-right',
    resizeLeft : 'web-window-resize-left',
    resizeTopRight : 'web-window-resize-top-right',
    resizeTopLeft : 'web-window-resize-top-left',
    resizeBottomRight : 'web-window-resize-bottom-right',
    resizeBottomLeft : 'web-window-resize-bottom-left'
};
WebWindow.Util = {
    CSS : {
        hasClass : function(element, className) {
            var result = new RegExp('\w{0,}' + className + '\w{0,}').test(element.className);
            return result;
        },
        addClass : function(element, className) {
            if (WebWindow.Util.CSS.hasClass(element, className)) {
                return;
            } else {
                WebWindow.Util.CSS.toggleClass(element, className);
            }
        },
        removeClass : function(element, className) {
            if (!WebWindow.Util.CSS.hasClass(element, className)) {
                return;
            } else {
                WebWindow.Util.CSS.toggleClass(element, className);
            }
        },
        toggleClass : function(element, className) {
            var found = false;
            /* - if the class does not exist, supply an empty string.
               - If the class does exist, then supply the class name.
               - Break up the scentence into words, begin filtering.
               - If the class name is found, set found to true, and
                 remove it from the next step. Remove undefined items.
               - Place all the words back into the scentence. then
                 remove empty space. If the class was found, put it
                 back at the end of the scentence, otherwise, return
                 the cleaned up class list.
                */
            var classes = (element.className ? element.className : '')
                .split('\ ')
                .filter(function(tempClassName, tempClassIndex, classesOrigin) {
                    if (tempClassName === className) {
                        found = true;
                        return false;
                    } else if (tempClassName === 'undefined') {
                        return false;
                    } else {
                        return true;
                    }
                })
                .join('\ ')
                .trimLeft()
                .trimRight();
                if (found === false) {
                    element.className = classes + ' ' + className;
                } else {
                    element.className = classes;
                }
        },
        dragdrop : function(event, type, element) {
            if (/dragstart/.test(type)) {
                WebWindow.Util.CSS.dragdrop.element = element;
                window.onmousemove = function(mouseMoveEvent) {
                    WebWindow.Util.CSS.dragdrop.element = document.getElementById(WebWindow.Util.CSS.dragdrop.element.id);
                    if (!(WebWindow.Util.CSS.dragdrop.element.style.left)) {
                        WebWindow.Util.CSS.dragdrop.element.style.left = (WebWindow.Util.CSS.dragdrop.element.offsetLeft > 0 ? WebWindow.Util.CSS.dragdrop.element.offsetLeft : 0) + 'px';
                    }
                    if (!(WebWindow.Util.CSS.dragdrop.element.style.top)) {
                        WebWindow.Util.CSS.dragdrop.element.style.top = (WebWindow.Util.CSS.dragdrop.element.offsetTop > 0 ? WebWindow.Util.CSS.dragdrop.element.offsetTop : 0) + 'px';
                    }
                    var newX = (Number(/(\d+)/.exec(WebWindow.Util.CSS.dragdrop.element.style.left)[0]) + mouseMoveEvent.movementX) + 'px';
                    var newY = (Number(/(\d+)/.exec(WebWindow.Util.CSS.dragdrop.element.style.top)[0]) + mouseMoveEvent.movementY) + 'px';
                    WebWindow.Util.CSS.dragdrop.element.style.left = newX;
                    WebWindow.Util.CSS.dragdrop.element.style.top = newY;
                };
                window.onmouseup = function() {
                    WebWindow.Util.CSS.dragdrop.element = null;
                    window.onmousemove = null;
                }
                var desktop = document.getElementById(WebWindow.desktopID);
                var beforeNode = document.getElementById(WebWindow.beforeElementID);
                desktop.insertBefore(WebWindow.Util.CSS.dragdrop.element, beforeNode);
            } else if (/dragend/.test(type)) {
                window.onmousemove = null;
                WebWindow.Util.CSS.dragdrop.element = null;
            }
        },
        fadeIn : function(element) {
            WebWindow.Util.CSS.removeClass(element, WebWindow.classes.fadeOut);
            WebWindow.Util.CSS.addClass(element, WebWindow.classes.fadeIn);
        },
        fadeOut : function(element) {
            WebWindow.Util.CSS.removeClass(element, WebWindow.classes.fadeIn);
            WebWindow.Util.CSS.addClass(element, WebWindow.classes.fadeOut);
        },
        toggleFade : function(element) {
            if (WebWindow.Util.CSS.hasClass(element, WebWindow.classes.fadeIn)) {
                WebWindow.Util.CSS.fadeOut(element);
            } else if (WebWindow.Util.CSS.hasClass(element, WebWindow.classes.fadeOut)) {
                WebWindow.Util.CSS.fadeIn(element);
            }
        }
    }
}
/* DOM Elements for Task object */
WebWindow.TaskFrame = function(data, taskAssistant) {
    var self = this;

    var taskFrameWindow = document.createElement('div');
        taskFrameWindow.className = WebWindow.classes.taskFrameWindow;
        taskFrameWindow.id = Date.now();
        taskFrameWindow.addEventListener('click', function(event) {
            document.getElementById(WebWindow.desktopID)
                .insertBefore(document.getElementById(taskFrameWindow.id),
                              document.getElementById(WebWindow.beforeElementID));
        });
    var taskFrameWindowTitle = document.createElement('div');
        taskFrameWindowTitle.className = WebWindow.classes.taskFrameWindowTitle + ' noselect';
    var taskFrameHeader = document.createElement('div');
        taskFrameHeader.className = WebWindow.classes.taskFrameHeader + ' noselect';
    var taskFrameButtons = document.createElement('ul');
        taskFrameButtons.className = WebWindow.classes.taskFrameButtons + ' noselect';
    var taskFrameContent = document.createElement('div');
        taskFrameContent.className = WebWindow.classes.taskFrameContent + ' noselect';
    var taskFrameDragbar = document.createElement('div');
        taskFrameDragbar.className = WebWindow.classes.taskFrameDragbar + ' noselect';
    var taskFrameResize = document.createElement('div');
        taskFrameResize.className = WebWindow.classes.taskFrameResize + ' noselect';


        /* Resizing control DOM elements, all sides and corners */
    var resizeTop = document.createElement('div');
        resizeTop.className = WebWindow.classes.resizeTop + ' ' + WebWindow.classes.resizer;
    var resizeLeft = document.createElement('div');
        resizeLeft.className = WebWindow.classes.resizeLeft + ' ' + WebWindow.classes.resizer;
    var resizeRight = document.createElement('div');
        resizeRight.className = WebWindow.classes.resizeRight + ' ' + WebWindow.classes.resizer;
    var resizeBottom = document.createElement('div');
        resizeBottom.className = WebWindow.classes.resizeBottom + ' ' + WebWindow.classes.resizer;
    var resizeTopLeft = document.createElement('div');
        resizeTopLeft.className = WebWindow.classes.resizeTopLeft + ' ' + WebWindow.classes.resizer;
    var resizeTopRight = document.createElement('div');
        resizeTopRight.className = WebWindow.classes.resizeTopRight + ' ' + WebWindow.classes.resizer;
    var resizeBottomLeft = document.createElement('div');
        resizeBottomLeft.className = WebWindow.classes.resizeBottomLeft + ' ' + WebWindow.classes.resizer;
    var resizeBottomRight = document.createElement('div');
        resizeBottomRight.className = WebWindow.classes.resizeBottomRight + ' ' + WebWindow.classes.resizer;


    /* Sets up the resize controls with onclick handlers, and has utility functions.
       Utilities:
            - firstNumber : extracts the first occuring continuing section of numbers
                            within a string.
            - ifSizes : if the task frame does not have style (left, top), and
                        size (width, height), then it uses the properties of
                        doucment.getElement, to assign the respective values.
            - getWindow : returns the window with the id it was created with.
            - mouseMove : called normally when the mousedown event occurs, it
                          returns a function which when called will call ifSizes,
                          and then assigns the callback supplied, which is
                          triggered when the mouse moves within the window, and
                          the mouse is still down. When the mouseup event fires,
                          the onmousemove event is then removed from the window.
     */
    function setResizeButtons() {

        function firstNumber(inputStr) {
            return Number(/^(\d+)/.exec(inputStr)[0]);
        }

        function ifSizes(elem) {
            if (!(elem.style.left)) {
                elem.style.left = elem.clientLeft + 'px';
            }
            if (!(elem.style.top)) {
                elem.style.top = elem.clientTop + 'px';
            }
            if (!(elem.style.width)) {
                elem.style.width = elem.clientWidth + 'px';
            }
            if (!(elem.style.height)) {
                elem.style.height = elem.clientHeight + 'px';
            }
        }

        function getWindow(windowID) {
            return document.getElementById(taskFrameWindow.id);
        }

        function mouseMove(callback) {
            return function() {
                ifSizes(getWindow());
                window.onmousemove = callback;
                window.onmouseup = function() { window.onmousemove = null; }
            }
        }

        resizeTop.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.top = (firstNumber(elem.style.top) + event.movementY) + 'px';
            elem.style.height = (firstNumber(elem.style.height) - event.movementY) + 'px';
        });

        resizeLeft.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.left = (firstNumber(elem.style.left) + event.movementX) + 'px';
            elem.style.width = (firstNumber(elem.style.width) - event.movementX) + 'px';
        });

        resizeRight.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.width = (firstNumber(elem.style.width) + event.movementX) + 'px';
        });
        resizeBottom.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.height = (firstNumber(elem.style.height) + event.movementY) + 'px';
        });

        resizeTopLeft.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.top = (firstNumber(elem.style.top) + event.movementY) + 'px';
            elem.style.height = (firstNumber(elem.style.height) - event.movementY) + 'px';
            elem.style.left = (firstNumber(elem.style.left) + event.movementX) + 'px';
            elem.style.width = (firstNumber(elem.style.width) - event.movementX) + 'px';
        });
        resizeTopRight.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.top = (firstNumber(elem.style.top) + event.movementY) + 'px';
            elem.style.height = (firstNumber(elem.style.height) - event.movementY) + 'px';
            elem.style.width = (firstNumber(elem.style.width) + event.movementX) + 'px';
        });
        resizeBottomLeft.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.height = (firstNumber(elem.style.height) + event.movementY) + 'px';
            elem.style.left = (firstNumber(elem.style.left) + event.movementX) + 'px';
            elem.style.width = (firstNumber(elem.style.width) - event.movementX) + 'px';
        });
        resizeBottomRight.onmousedown = mouseMove(function(event) {
            var elem = getWindow();
            elem.style.width = (firstNumber(elem.style.width) + event.movementX) + 'px';
            elem.style.height = (firstNumber(elem.style.height) + event.movementY) + 'px';
        });
        taskFrameResize.appendChild(resizeLeft);
        taskFrameResize.appendChild(resizeTop);
        taskFrameResize.appendChild(resizeBottom);
        taskFrameResize.appendChild(resizeRight);
        taskFrameResize.appendChild(resizeTopLeft);
        taskFrameResize.appendChild(resizeTopRight);
        taskFrameResize.appendChild(resizeBottomLeft);
        taskFrameResize.appendChild(resizeBottomRight);
        taskFrameWindow.appendChild(taskFrameResize);
    }

    /* Sets the title for the window, and then appends the title element
       to the window header, which will later be appended to the window
       itself.
    */
    function setTaskFrameTitle() {
        taskFrameWindowTitle.innerText = data.title;
        taskFrameHeader.appendChild(taskFrameWindowTitle);
    }

    /* Sets the draggable area of the window (the header, including the
       title, and space around the window buttons.), and then the element
       is appended to the window header.
    */
    function setDragBar() {
        taskFrameDragbar.onmousedown = function(event) {
            _taskFrameWindow = document.getElementById(taskFrameWindow.id);
            WebWindow.Util.CSS.dragdrop(event, 'dragstart', _taskFrameWindow);
        }
        taskFrameHeader.appendChild(taskFrameDragbar);
    }

    /* Temporarily assigns a transition animation for the window, then toggles
       a class, and then waits the appropriate time to remove the animation from
       the element.
    */
    function maximizeWindow() {
        var _taskFrameWindow = document.getElementById(taskFrameWindow.id);
        WebWindow.Util.CSS.addClass(_taskFrameWindow, WebWindow.classes.maximizeAnimation);
        WebWindow.Util.CSS.toggleClass(_taskFrameWindow, WebWindow.classes.maximize);
        setTimeout(function() {
            console.log(_taskFrameWindow);
            WebWindow.Util.CSS.removeClass(_taskFrameWindow, WebWindow.classes.maximizeAnimation);
            console.log(_taskFrameWindow);
        }, 250);
    }

    /* Temporarily assigns a transition animation for the window, then toggles
       a class, and then waits the appropriate time to remove the animation
       from the element.
    */
    function minimizeWindow() {
        var _taskFrameWindow = document.getElementById(taskFrameWindow.id);
        WebWindow.Util.CSS.addClass(_taskFrameWindow, WebWindow.classes.minimizeAnimation);
        WebWindow.Util.CSS.toggleClass(_taskFrameWindow, WebWindow.classes.minimize);
        console.log({ classes :  _taskFrameWindow.className, name : WebWindow.classes.minimize });
        setTimeout(function() {
            /* WebWindow.Util.CSS.toggleClass(_taskFrameWindow, WebWindow.classes.invisible); */
            WebWindow.Util.CSS.removeClass(_taskFrameWindow, WebWindow.classes.minimizeAnimation);
        }, 350);
    }

    /* Using a setTimeout() to isolate the removal of the task window from it's
       parentElement. parentElement is used to ensure that removeChild will work.
    */
    function closeWindow() {
        setTimeout(function() {
            document.getElementById(taskFrameWindow.id).parentElement.removeChild(taskFrameWindow);
        });
    }

    /* Using an initializer array, the items of JSON data are then iterated over,
       and turned into a task frame button, and then appended to the task window header.
    */
    function setTaskButtons() {
        var currentTaskButton;
        [
            { title : 'O', action : maximizeWindow },
            { title : '-', action : minimizeWindow },
            { title : 'X', action : closeWindow }
        ].forEach(function(taskButton, taskButtonIndex, taskButtonArray) {
            currentTaskButton = document.createElement('li');
            currentTaskButton.onclick = taskButton.action;
            currentTaskButton.innerText = taskButton.title;
            taskFrameButtons.appendChild(currentTaskButton);
            currentTaskButton = undefined;
        });
        taskFrameHeader.appendChild(taskFrameButtons);
        taskFrameWindow.appendChild(taskFrameHeader);
    }

    /*

    */
    function getContent() {
        return taskFrameContent;
    }
    function setTaskFrameHandlers() {
        /*
        task assistant signal listeners.

        taskAssistant.addListeners(taskFrameWindow.id, {
            'closeall' : function() {},
            'close' : function() {},
            'maximize' : function() {},
            'minimize' : function() {},
            'resize' : function() {},
            'move' : function() {}
        });

        Event handlers for window events will be made soon
        */
    }
    function toggleVisibility() {
        var _taskFrameWindow = document.getElementById(taskFrameWindow.id);
        WebWindow.Util.CSS.toggleFade(_taskFrameWindow);
    }
    function create() {
        /* Appends window resizing tools to the window frame,
        and over extends the frame boundaries by using CSS */
        setResizeButtons();
        /* Sets the title of the window */
        setTaskFrameTitle();
        /* Sets the draggable area which is used
        to move windows in the board */
        setDragBar();
        /* Sets the familiar window management buttons on
        the window in the header */
        setTaskButtons();
        /* Adds event handlers to the TaskFrame object, and will
           respond to Board events such as 'closeall' or 'close'.
        */
        setTaskFrameHandlers();
        taskFrameContent.innerHTML = data.content;
        taskFrameWindow.appendChild(taskFrameContent);
        document.getElementById(WebWindow.desktopID)
            .insertBefore(taskFrameWindow, document.getElementById(WebWindow.beforeElementID));
        toggleVisibility();
    }

    /* API created for use of the window. Maximizing, minimizing, moving, closing,
       content updating, and toggling.

       TODO: add appendChild to updateContent so other elements can be pulled in
       from the page, and put into a window.
    */
    var TaskFrameAPI = {
        moveTo : function(x, y) {
            var _taskFrameWindow = document.getElementById(taskFrameWindow.id);
            _taskFrameWindow.style.left = x + 'px';
            _taskFrameWindow.style.top = y + 'px';
        },
        updateContent : function(updateContent) {
            taskFrameContent.innerHTML = updateContent;
        },
        getWindow : function() {
            return document.getElementById(taskFrameWindow.id);
        },
        toggleWindow : toggleVisibility,
        minimize : minimizeWindow,
        maximize : maximizeWindow,
        close : closeWindow
    }
    /* calls the bootstrap, and then returns the api. */
    create();
    return TaskFrameAPI;
}
/* Task object for TaskAssistant */
WebWindow.Task = function(data, taskAssistant) {
    var self = this;
    self.getTitle = function() {

    }
    self.getID = function() {

    }
    self.getWindow = function() { 

    }
    self.minimize = function() {

    }
    self.maximize = function() {

    }
    self.close = function() {

    }
    self.toggleWindow = function() {

    }
}
/* TaskAsisstant, which manages tasks and their TaskFrames */
WebWindow.TaskAssistant = function() {
    if (!WebWindow.TaskAssistant.instance) {
        WebWindow.TaskAssistant.instance = {
            Tasks : [],
            oncontextmenu : function(event, task) {

            }, 
            renderTaskList : function() {

            },
            deleteTaskByID : function(taskID) {

            },
            deleteTaskByName : function(taskName) {

            },
            getTasks : function() {

            },
            getGroup : function(groupID) {

            },
            getTasks : function() {

            }
        }
    }
    return WebWindow.TaskAssistant.instance;
}
/* MainMenu element where tasks are launched */
WebWindow.MainMenu = function(menuConfig) {
    if (!WebWindow.MainMenu.instance) {
        WebWindow.MainMenu.instance = {
            menuID : menuConfig.menuID,
            getMenu : function() {

            },
            menuData : function() {

            },
            toggleVisibility : function() {

            }, 
            loadBaseMenu : function() {

            }
        }
    }
    return WebWindow.MainMenu.instance;
}
/* Board is where the MainMenu, TaskAssistant, and Tasks have instances */
WebWindow.Board = function(boardConfig) {
    if (!WebWindow.Board.instance) {
        WebWindow.Board.instance = {
            taskAssistant : boardConfig.taskAssistant,
            minimizeAll : function() {},
            maximizeAll : function() {},
            closeAll : function() {}, 
            setBoardSize : function(newLength, newHeight) {},
            setTaskFrameStyles : function(cssData) {}
        }
    }
};

WebWindow.TaskData = {};