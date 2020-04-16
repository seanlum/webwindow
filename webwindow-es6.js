/*
    WebWindow - Windowing system for the web
    Created By: Sean Lum
    GitHub: seanlum
*/
const WebWindowEnum = {
    desktopID : 'web-window-desktop',
    beforeElementID : 'before-node',
    taskAssistantID : 'web-window-taskbar', 
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
    taskFrameWindowBorder : 'task-frame-window-border',
    taskFrameCollapsed : 'task-frame-collapsed',
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
    resizeBottomLeft : 'web-window-resize-bottom-left',
    actionMinimize : 'web-window-action-minimize',
    actionMaximize : 'web-window-action-maximize',
    actionClose : 'web-window-action-close',
    actionRollUp : 'web-window-action-rollup',
    resizingMessage : 'web-window-resizing-message',
    resizingMessageText : 'resizing',
    modifyingWindows : 'web-window-modifying-windows',
    taskFrameWindowBorderMaximized : 'maximized',
    taskBar : 'web-window-task-bar'
}

class WebWindowControl {
    rootElement = document.createElement('div');
    constructor(parentWindow, name) {
        if (this.state === undefined) {
            this.state = {}
        }
        this.state.parentWindow = parentWindow;
        this.state.name = name;
    }

    updateStyles() {
        for (let propertyName in Object.getOwnPropertyDescriptors(this.state.style)) {
            if (this.rootElement.style[propertyName] === '' ||
                this.rootElement.style[propertyName] === undefined) {
                this.rootElement.style[propertyName] = this.state.style[propertyName]
            }
        }
    }

    getElement() {
        return this.rootElement;
    }

    addControl(control) {
        this.rootElement.appendChild(control.getElement());
    }

    setClassName(className) {
        this.rootElement.className = className;
    }

    setParentWindow(newParentID) {
        this.state.parentWindow = newParentID;
    }

    getParentWindow() {
        return document.getElementById(this.state.parentWindow);
    }

    firstNumber(inputStr) {
        if (inputStr !== null) {
            let num = /^(\d+)/.exec(inputStr)
            if (num) {
                return Number(num[0])
            }
        }
    }
}

class WebWindowResizer extends WebWindowControl {
    constructor(windowID, direction, className) {
        super(windowID, 'Resizer ' + direction);
        this.setClassName(className);
        this.direction = direction;
        this.actionFinishHandler = this.actionFinish.bind(this);
        this.actionStartHandler = this.actionStart.bind(this);
        this.resizeHandler = this.handleResize.bind(this);
        this.rootElement.addEventListener('click', this.resizeHandler);
    }

    finalCallback(finalEvent) {
        let diffY = (finalEvent.pageY - this.onClickEvent.pageY)
        let diffX = (finalEvent.pageX - this.onClickEvent.pageX)
        let currentWindow = this.getParentWindow();
        switch (this.direction) {
            case 'top':
                currentWindow.style.top = (this.firstNumber(currentWindow.style.top) + diffY) + 'px';
                currentWindow.style.height = (this.firstNumber(currentWindow.style.height) - diffY) + 'px';
                break;
            case 'left':
                currentWindow.style.left = (this.firstNumber(currentWindow.style.left) + diffX) + 'px';
                currentWindow.style.width = (this.firstNumber(currentWindow.style.width) - diffX) + 'px';
                break;
            case 'right':
                currentWindow.style.width = (this.firstNumber(currentWindow.style.width) + diffX) + 'px';
                break;
            case 'bottom':
                currentWindow.style.height = (this.firstNumber(currentWindow.style.height) + diffY) + 'px';
                break;
            case 'top-left':
                currentWindow.style.top = (this.firstNumber(currentWindow.style.top) + diffY) + 'px';
                currentWindow.style.height = (this.firstNumber(currentWindow.style.height) - diffY) + 'px';
                currentWindow.style.left = (this.firstNumber(currentWindow.style.left) + diffX) + 'px';
                currentWindow.style.width = (this.firstNumber(currentWindow.style.width) - diffX) + 'px';
                break;
            case 'top-right':
                currentWindow.style.top = (this.firstNumber(currentWindow.style.top) + diffY) + 'px';
                currentWindow.style.height = (this.firstNumber(currentWindow.style.height) - diffY) + 'px';
                currentWindow.style.width = (this.firstNumber(currentWindow.style.width) + diffX) + 'px';
                break;
            case 'bottom-left':
                currentWindow.style.height = (this.firstNumber(currentWindow.style.height) + diffY) + 'px';
                currentWindow.style.left = (this.firstNumber(currentWindow.style.left) + diffX) + 'px';
                currentWindow.style.width = (this.firstNumber(currentWindow.style.width) - diffX) + 'px';
                break;
            case 'bottom-right':
                currentWindow.style.width = (this.firstNumber(currentWindow.style.width) + diffX) + 'px';
                currentWindow.style.height = (this.firstNumber(currentWindow.style.height) + diffY) + 'px';
                break;
            default:
                break;
        }
        window.removeEventListener('click', this.actionFinishHandler)
    }

    actionFinish(finalEvent) {
        if (this.onClickEvent) {
            this.finalCallback(finalEvent)
        }
    }

    actionStart(mouseUpEvent) {
        window.addEventListener('click', this.actionFinishHandler)
        window.removeEventListener('click', this.actionStartHandler)
    }

    handleResize(onClickEvent) {
        this.onClickEvent = onClickEvent;
        window.addEventListener('click', this.actionStartHandler)
    }
}

class WebWindowResizers extends WebWindowControl {
    constructor(windowID) {
        super(windowID, 'Resizer');
        this.setClassName(WebWindowEnum.taskFrameResize);
        [
            { control: 'top', className: WebWindowEnum.resizeTop, direction: 'top' },
            { control: 'bottom', className: WebWindowEnum.resizeBottom, direction: 'bottom' },
            { control: 'left', className: WebWindowEnum.resizeLeft, direction: 'left' },
            { control: 'right', className: WebWindowEnum.resizeRight, direction: 'right' },
            { control: 'topleft', className: WebWindowEnum.resizeTopLeft, direction: 'top-left' },
            { control: 'bottomleft', className: WebWindowEnum.resizeBottomLeft, direction: 'bottom-left' },
            { control: 'topright', className: WebWindowEnum.resizeTopRight, direction: 'top-right' },
            { control: 'bottomright', className: WebWindowEnum.resizeBottomRight, direction: 'bottom-right' },
        ].map((initData) => {
            this[initData.control] = new WebWindowResizer(
                windowID,
                initData.direction,
                WebWindowEnum.resizer + ' ' + initData.className
            );
            this.addControl(this[initData.control]);
        });
    }
}

class WebWindowDragBar extends WebWindowControl {
    constructor(windowID) {
        super(windowID, 'Drag bar');
        this.setClassName(WebWindowEnum.taskFrameDragbar);
    }
}

class WebWindowControls extends WebWindowControl {
    constructor(windowID) {
        super(windowID, 'Window Controls');
        this.setClassName(WebWindowEnum.taskFrameButtons);
    }
}

class WebWindowTitle extends WebWindowControl {
    constructor(windowID) {
        super(windowID, 'Window Title');
        this.setClassName(WebWindowEnum.taskFrameWindowTitle);
    }
}

class WebWindowHeader extends WebWindowControl {
    constructor(windowID) {
        super(windowID, 'Header');
        this.dragbar = new WebWindowDragBar(windowID);
        this.controls = new WebWindowControls(windowID);
        this.title = new WebWindowTitle(windowID);
        this.addControl(this.title);
        this.addControl(this.dragbar);
        this.addControl(this.controls);
        this.setClassName(WebWindowEnum.taskFrameHeader);
    }

    setParentWindow(newID) {
        [
            this,
            this.dragbar,
            this.controls,
            this.title,
        ].map((elem) => {
            super.setParentWindow(newID)
        })
    }
}

class WebWindowContent extends WebWindowControl {
    constructor(windowID) {
        super(windowID, 'Content');
        this.setClassName(WebWindowEnum.taskFrameContent);
    }
}

class WebWindowContentBorder extends WebWindowControl {
    constructor(windowID, header, content) {
        super(windowID, 'Content Border');
        this.setClassName(WebWindowEnum.taskFrameContentBorder);
        this.header = header;
        this.content = content;
        this.addControl(header);
        this.addControl(content);
    }
}

class WebWindow extends WebWindowControl {
    constructor(taskID, taskTitle, initStyles={}) {
        super(taskID, 'Main Window');
        this.state.id = taskID;
        this.state.title = taskTitle;
        this.state.style = {
            height: initStyles.height ? initStyles.height : '200px',
            width: initStyles.width ? initStyles.width : '300px',
            top: initStyles.top ? initStyles.top : '200px',
            left: initStyles.left ? initStyles.left : '200px'
        }
        this.resizer = new WebWindowResizers(this.state.id);
        this.header = new WebWindowHeader(this.state.id);
        this.content = new WebWindowContent(this.state.id);
        this.border = new WebWindowContentBorder(this.state.id, this.header, this.content);
        this.addControl(this.resizer);
        this.addControl(this.border);
        this.rootElement.id = this.state.id;
        this.rootElement.className = WebWindowEnum.taskFrameWindowBorder;
        this.updateStyles();
        document.body.appendChild(this.getElement());
    }

    getResizer() {
        return this.resizer;
    }

    getContent() {
        return this.content;
    }

    getHeader() {
        return this.header;
    }

    setID(newID) {
        [
            this,
            this.resizer,
            this.border,
            this.header,
            this.content
        ].map((elem) => {
            elem.setParentWindow(newID)
        })
    }
}

webwindow = new WebWindow('test-task');
webwindow.setID('New Test!');
console.log(webwindow.border.content.state.parentWindow);
console.log(webwindow.resizer.topright);