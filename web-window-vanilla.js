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
    fadeOut : 'web-window-fade-out'
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
            var classes = (element.className ? element.className : '')
                .split('\ ')
                .filter(function(tempClassName, tempClassIndex, classesOrigin) {
                    if (tempClassName === className) {
                        found = true;
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
    function create() {

    }
    function dispose() {

    }
    function setDragBar() {
    
    }
    function setResizeButtons() {
        function resizeTop(event) {}
        function resizeLeft(event) {}
        function resizeRight(event) {}
        function resizeBottom(event) {}
        function resizeTopLeft(event) {}
        function resizeTopRight(event) {}
        function resizeBottomLeft(event) {}
        function resizeBottomRight(event) {}
    }
    function setTaskFrame() {

    }
    function setTaskFrameTitle() {

    }
    function setTaskButtons() {

    }
    function getContent() {

    }
    function setTaskFrameHandlers() {

    }
    function toggleVisibility() {

    }
    return {
        getData : function() {},
        getButtons : function() {},
        getWindow : function() {},
        toggleWindow : function() {},
        getDragBar : function() {},
        minimize : function() {},
        maximize : function() {},
        close : function() {}
    }
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