/*
    WebWindow - Windowing system for the web
    Created By: Sean Lum 
    GitHub: seanlum
*/
var WebWindow = function() {}
WebWindow.desktopID = 'web-window-desktop';
WebWindow.beforeElementID = 'before-node';
WebWindow.taskAssistantID = 'web-window-taskbar';
WebWindow.classes = {
    TAGUI : {
        contextMenu : 'web-window-tagui-contextmenu',
        list : 'web-window-tagui-list',
        row : 'web-window-tagui-row'
    },
    mainMenu : 'web-window-main-menu',
    mainMenuContainer : 'web-window-main-menu-container',
    mainMenuItem : 'web-window-main-menu-item',
    menuMinimize : 'web-window-main-menu-minimize',
    task : 'web-window-task-item',
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
    taskFrameContentBorder : 'task-frame-content-border',
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
    debug : {
        enabled : true
    },
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
                /*

                */
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
    var taskFrameWindowTitle = document.createElement('div');
        taskFrameWindowTitle.className = WebWindow.classes.taskFrameWindowTitle;
    var taskFrameHeader = document.createElement('div');
        taskFrameHeader.className = WebWindow.classes.taskFrameHeader;
    var taskFrameButtons = document.createElement('ul');
        taskFrameButtons.className = WebWindow.classes.taskFrameButtons;
    var taskFrameContent = document.createElement('div');
        taskFrameContent.className = WebWindow.classes.taskFrameContent;
    var taskFrameContentBorder = document.createElement('div');
        taskFrameContentBorder.className = WebWindow.classes.taskFrameContentBorder;
    var taskFrameDragbar = document.createElement('div');
        taskFrameDragbar.className = WebWindow.classes.taskFrameDragbar;
    var taskFrameResize = document.createElement('div');
        taskFrameResize.className = WebWindow.classes.taskFrameResize;


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
            WebWindow.Util.CSS.removeClass(_taskFrameWindow, WebWindow.classes.maximizeAnimation);
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
            taskAssistant.removeTaskById(taskFrameWindow.id);
            if (null !== document.getElementById(taskFrameWindow.id)) {
                document.getElementById(taskFrameWindow.id).parentElement.removeChild(taskFrameWindow);
            }
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
            currentTaskButton.onclick =  function(event) {
                taskButton.action();
            }
            currentTaskButton.innerText = taskButton.title;
            taskFrameButtons.appendChild(currentTaskButton);
            currentTaskButton = undefined;
        });
        taskFrameHeader.appendChild(taskFrameButtons);
        taskFrameContentBorder.appendChild(taskFrameHeader);
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

        setTaskFrameHandlers();
        (function() {
            if (!data.content) {
                taskFrameContent.innerHTML = 'No content supplied';
            } else if (typeof data.content !== 'string' && data.content.tagName) {
                taskFrameContent.appendChild(data.content);
            } else if (typeof data.content === 'string') {
                taskFrameContent.innerHTML = data.content;
            }
        })();
        if (data.height) {
            taskFrameWindow.style.height = data.height;
        }
        if (data.width) {
            taskFrameWindow.style.width = data.width;
        }
        taskFrameContentBorder.appendChild(taskFrameContent);
        taskFrameWindow.appendChild(taskFrameContentBorder);

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
            if (typeof updateContent !== 'string' && updateContent.tagName) {
                taskFrameContent.innerHTML = '';
                taskFrameContent.appendChild(updateContent);
            } else {
                taskFrameContent.innerHTML = updateContent;
            }
        },
        updateTitle : function(newTitle) {
            taskFrameWindowTitle.innerText = newTitle;
        },
        setSize : function(newX, newY) {
            var _taskFrameWindow = document.getElementById(taskFrameWindow.id);
            _taskFrameWindow.style.height = String(Number(newY)) + 'px';
            _taskFrameWindow.style.width = String(Number(newX)) + 'px';
        },
        getWindow : function() {
            return document.getElementById(taskFrameWindow.id);
        },
        getTitle : function() {
            return taskFrameWindowTitle.innerText;
        },
        focus : function() {
            var _taskFrameWindow = document.getElementById(taskFrameWindow.id);
            _taskFrameWindow.focus();
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
/* Task object for TaskAssistant, this is where the window is managed
by the TaskAssistant, and where the task information is stored with the 
window. */
WebWindow.Task = function(data, taskAssistant) {
    this.taskWindow = new WebWindow.TaskFrame(data, taskAssistant);
    var self = this;
    self.getTitle = function() {
        return self.taskWindow.getTitle();
    }

    self.getID = function() {
        return self.taskWindow.getWindow().id;
    }
    self.updateContent = function(contentToSet) {
        self.taskWindow.updateContent(contentToSet);
    }
    self.getWindow = function() { 
        return self.taskWindow;
    }
    self.minimize = function() {
        self.taskWindow.minimize();
    }
    self.maximize = function() {
        self.taskWindow.maximize();
    }
    self.close = function() {
        return self.taskWindow.close();
    }
    self.toggleWindow = function() {
        self.taskWindow.toggleVisibility();
    }
    return self;
}
/* TaskAsisstant, which manages tasks and their TaskFrames */
WebWindow.TaskAssistant = function() {
    if (!WebWindow.TaskAssistant.instance) {
        WebWindow.TaskAssistant.instance = {
            Tasks : [],
            GUI : {
                task : new WebWindow.Task({
                    title : "TaskAssistant",
                    content : "This will be populated when there are tasks"
                })
            },
            addTask : function(taskToAdd) {
                this.Tasks.push(taskToAdd);
            },
            removeTaskById : function(taskID, callback) {
                this.Tasks = this.Tasks.filter(function(task) {
                    if (task.getID() === taskID) {
                        task.close();
                        setTimeout(callback,0);
                        return false;
                    } else {
                        return true;
                    }
                });

                this.refreshTasks();
            },
            closeAll : function() {
                var current;
                while(current = this.Tasks.pop()) {
                    current.close();
                }
            },
            getTasks : function(toRetrieve) {
                var filteredTasks;
                if (typeof toRetrieve === "string") {
                    filteredTasks = this.Tasks.filter(function(task) {
                        if (task.getID() == toRetrieve) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                } else if (toRetrieve.length && toRetrieve.pop) {
                    filteredTasks = this.Tasks.filter(function(task) {
                        if (toRetrieve.indexOf(task.getID()) !== -1) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                } else {
                   WebWindow.Util.debug.enabled ? console.error("Invalid type '" + typeof toRetrieve + "' supplied") : false
                }
                return filteredTasks;
            },
            getTasksContextMenu : function(suppliedTask) {
                this.task = suppliedTask;
                var __context_menu_this = this;
                return function(contextEvent) {
                    var contextDiv = document.createElement('div');
                    contextDiv.className = WebWindow.classes.TAGUI.contextMenu;
                    this.taguiid = 'TAGUI' + String(Date.now());
                    contextDiv.id = this.taguiid;
                    var __tagui_cm_this = this;
                    contextDiv.innerText = "Close it??";
                    contextDiv.focus();
                    contextDiv.style.top = String(contextEvent.clientY) + 'px';
                    contextDiv.style.left = String(contextEvent.clientX) + 'px';
                    document.body.appendChild(contextDiv);
                    window.onmousedown = function(blurEvent) {
                        window.onmousedown = undefined;
                        setTimeout(function() {
                            __context_menu_this.task.close();
                            if (null !== document.getElementById(__tagui_cm_this.taguiid)) {
                                document.getElementById(__tagui_cm_this.taguiid).parentElement.removeChild(contextDiv);
                            }
                        }, 0);
                    }
                    contextDiv.onmousedown = function(mouseDownEvent) {
                        return false;
                    }
                    contextEvent.preventDefault();
                    return false;
                }
            },
            refreshTasks : function() {
                var bar = document.getElementById(WebWindow.taskAssistantID);
                var tasks = document.createElement("ul");
                tasks.className = WebWindow.classes.TAGUI.list;
                bar.innerHTML = '';
                var __tagui_cm_this = this;
                if (this.Tasks.length == 0) {
                    this.GUI.task.updateContent("<h1 style='color: #fff; background: #000;'>This will be populated when there are tasks</h1>");
                } else {
                    this.Tasks.map(function(task) {
                        var taskItem = document.createElement('li');
                        var guiItem = document.createElement('li');
                        guiItem.className = WebWindow.classes.TAGUI.row;
                        guiItem.innerText = task.getTitle();
                        taskItem.className = WebWindow.classes.task;
                        taskItem.onclick = task.minimize;
                        guiItem.oncontextmenu = __tagui_cm_this.getTasksContextMenu(task);
                        taskItem.innerText = task.getTitle();
                        tasks.appendChild(guiItem);
                        bar.appendChild(taskItem);
                    });
                    this.GUI.task.updateContent(tasks);
                }
            },
            createTask : function(taskData) {
                var newTask = new WebWindow.Task(taskData, this);
                this.addTask(newTask);
                this.refreshTasks();
                return newTask;
            }
        }
    }
    return WebWindow.TaskAssistant.instance;
}
/* MainMenu element where tasks are launched */
WebWindow.MainMenu = function(menuConfig, taskAssistant) {
    if (!WebWindow.MainMenu.instance) {
        WebWindow.MainMenu.instance = {
            menuID : menuConfig.id,
            menuItems : menuConfig.menuData,
            getMenu : function() {

            },
            menuData : function() {

            },
            toggleVisibility : function() {

            },
            loadBaseMenu : function() {

            },
            configMenu : function() {
                var _menu = document.getElementById(WebWindow.classes.mainMenuContainer);
                var _mainMenu = document.getElementById(WebWindow.classes.mainMenu);
                _mainMenu.onclick = function(event) {
                    WebWindow.Util.CSS.toggleClass(_menu, WebWindow.classes.menuMinimize);
                }
                var _this = this;
                _this.menuItems.map(function(menuItemData) {
                    var _menuItem = document.createElement('li');
                    _menuItem.onclick = function(clickEvent) {
                        taskAssistant.createTask(menuItemData);
                    }
                    _menuItem.innerText = menuItemData.title;
                    _menuItem.className = WebWindow.classes.mainMenuItem;
                    _menu.appendChild(_menuItem);
                });
            }
        }
        WebWindow.MainMenu.instance.configMenu();
    }
    return WebWindow.MainMenu.instance;
}
/* Board is where the MainMenu, TaskAssistant, and Tasks have instances */
WebWindow.Board = function(boardConfig) {
    if (!WebWindow.Board.instance) {
        var _taskAssistant = new WebWindow.TaskAssistant();
        WebWindow.Board.instance = {
            taskAssistant : _taskAssistant,
            mainMenu : new WebWindow.MainMenu(boardConfig.menuConfig, _taskAssistant),
            minimizeAll : function() {},
            maximizeAll : function() {},
            closeAll : function() {}, 
            setBoardSize : function(newLength, newHeight) {},
            setTaskFrameStyles : function(cssData) {}
        }
    }
    return WebWindow.Board.instance;
};

WebWindow.TaskData = {};
