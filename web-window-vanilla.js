/*
    WebWindow - Windowing system for the web
    Created By: Sean Lum 
    GitHub: seanlum
*/
var WebWindow = function() {}
WebWindow.Util = {
    CSS : {
        toggleClass : function(element, className) {

        },
        dragdrop : function(event, type, element) {

        },
        fadeIn : function(element) {

        },
        fadeOut : function(element) {

        },
        toggleFade : function(element) {

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