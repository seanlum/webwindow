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

    ifSizes(elem) {
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

    removeClass(element, toRemove) {
        element.className = element.className.replace(new RegExp(toRemove,'g'), '').replace(/\s+/g, ' ').trim()
    }

    hasClass(element, toCheck) {
        return element.className.split(/\s{1,}/).indexOf(toCheck) >= 0
    }
}

class WebWindowEventControl extends WebWindowControl {
    constructor(windowID, name) {
        super(windowID, name);
        this.actionFinishHandler = this.actionFinish.bind(this);
        this.actionStartHandler = this.actionStart.bind(this);
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

    setParentWindow(newID) {
        super.setParentWindow(newID);
    }
}

class WebWindowResizer extends WebWindowEventControl {
    constructor(windowID, direction, className) {
        super(windowID, 'Resizer ' + direction);
        this.setClassName(className);
        this.direction = direction;
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

    handleResize(onClickEvent) {
        this.onClickEvent = onClickEvent;
        this.ifSizes(this.getParentWindow())
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

    setParentWindow(newID) {
        super.setParentWindow(newID);
        [
            'top', 'bottom', 'left', 'right',
            'topleft', 'bottomleft', 'bottomright'
        ].map((control) => {
            this[control].setParentWindow(newID)
        })
    }
}

class WebWindowDragBar extends WebWindowEventControl {
    constructor(windowID) {
        super(windowID, 'Drag bar');
        this.setClassName(WebWindowEnum.taskFrameDragbar);
        this.moveHandler = this.handleMove.bind(this);
        this.rootElement.addEventListener('click', this.moveHandler);
    }

    finalCallback(finalEvent) {
        let currentWindow = this.getParentWindow()
        let relX = finalEvent.pageX -  this.onClickEvent.pageX
        let relY = finalEvent.pageY - this.onClickEvent.pageY
        let newTop = (this.firstNumber(currentWindow.style.top) + relY);
        let newLeft = (this.firstNumber(currentWindow.style.left) + relX);
        currentWindow.style.top = (newTop <= 0 ? 30 : ((newTop >= window.clientHeight) ? window.clientHeight - 40 : newTop)) + 'px'
        currentWindow.style.left = (newLeft <= 0 ? 30 : ((newLeft >= window.clientWidth) ? window.clientWidh - 40 : newLeft)) + 'px'
        window.removeEventListener('click', this.actionFinishHandler)
    }

    handleMove(onClickEvent) {
        this.onClickEvent = onClickEvent;
        this.ifSizes(this.getParentWindow());
        window.addEventListener('click', this.actionStartHandler)
    }

    setParentWindow(newID) {
        super.setParentWindow(newID);
    }
}

class WebWindowControlAction extends WebWindowControl {
    constructor(windowID, action, className, handler, symbol) {
        super(windowID, action);
        this.rootElement = document.createElement('li');
        this.rootElement.className = className;
        if (handler) {
            this.rootElement.addEventListener('click', handler);
        }
        if (symbol) {
            this.setSymbol(symbol);
        }
    }

    setSymbol(content) {
        this.rootElement.innerHTML = content;
    }
}

class WebWindowControls extends WebWindowControl {

    doRollup() {
        let currentWindow = this.getParentWindow();
        if (!this.hasClass(currentWindow, WebWindowEnum.taskFrameCollapsed)) {
            currentWindow.className += ' ' + WebWindowEnum.taskFrameCollapsed;
        } else if (this.hasClass(currentWindow, WebWindowEnum.taskFrameCollapsed)) {
            this.removeClass(currentWindow, WebWindowEnum.taskFrameCollapsed);
        }
    }

    doMaximize() {
        let currentWindow = this.getParentWindow();
        if (!this.hasClass(currentWindow, WebWindowEnum.taskFrameWindowBorderMaximized)) {
            currentWindow.className += ' ' + WebWindowEnum.taskFrameWindowBorderMaximized
        } else if (this.hasClass(currentWindow, WebWindowEnum.taskFrameWindowBorderMaximized)) {
            this.removeClass(currentWindow, WebWindowEnum.taskFrameWindowBorderMaximized)
        }
    }

    doMinimize() {
        let currentWindow = this.getParentWindow();
        if (!this.hasClass(currentWindow, WebWindowEnum.minimize)) {
            currentWindow.className += ' ' + WebWindowEnum.minimize
        } else if (this.hasClass(currentWindow, WebWindowEnum.minimize)) {
            this.removeClass(currentWindow, WebWindowEnum.minimize)
        }
    }

    doClose() {
        let currentWindow = this.getParentWindow();
        setTimeout(() => {
            document.body.removeChild(currentWindow);
            if (this.closeHandler) {
                this.closeHandler();
            }
        }, 0)
    }

    constructor(windowID, closeHandler) {
        super(windowID, 'Window Controls');
        if (closeHandler) {
            this.closeHandler = closeHandler;
        }
        this.rootElement = document.createElement('ul');
        this.rollup = new WebWindowControlAction(
            windowID,
            'rollup',
            WebWindowEnum.actionRollUp,
            this.doRollup.bind(this),
            '&#x2195');

        this.minimize = new WebWindowControlAction(
            windowID,
            'minimize',
            WebWindowEnum.actionMinimize,
            this.doMinimize.bind(this),
            '&#8722;');

        this.maximize = new WebWindowControlAction(
            windowID,
            'maximize',
            WebWindowEnum.actionMaximize,
            this.doMaximize.bind(this),
            '&#9744'
        );

        this.close = new WebWindowControlAction(
            windowID,
            'close',
            WebWindowEnum.actionClose,
            this.doClose.bind(this),
            '&times;'
        );

        this.addControl(this.rollup);
        this.addControl(this.minimize);
        this.addControl(this.maximize);
        this.addControl(this.close);
        this.setClassName(WebWindowEnum.taskFrameButtons);
    }
}

class WebWindowTitle extends WebWindowControl {
    constructor(windowID, windowTitle) {
        super(windowID, 'Window Title');
        this.rootElement.innerText = windowTitle;
        this.setClassName(WebWindowEnum.taskFrameWindowTitle);
        this.actionsElement = document.createElement('ul');

    }

    setTitle(newTitle) {
        this.rootElement.innerText = newTitle;
    }
}

class WebWindowHeader extends WebWindowControl {
    constructor(windowID, windowTitle, closeHandler) {
        super(windowID, 'Header');
        this.dragbar = new WebWindowDragBar(windowID);
        this.controls = new WebWindowControls(windowID, closeHandler);
        this.title = new WebWindowTitle(windowID, windowTitle);
        this.addControl(this.title);
        this.addControl(this.dragbar);
        this.addControl(this.controls);
        this.setClassName(WebWindowEnum.taskFrameHeader);
    }

    setParentWindow(newID) {
        super.setParentWindow(newID);
        [
            this.dragbar,
            this.controls,
            this.title,
        ].map((elem) => {
           elem.setParentWindow(newID)
        })
    }
}

class WebWindowContent extends WebWindowControl {
    constructor(windowID, content) {
        super(windowID, 'Content');
        this.setClassName(WebWindowEnum.taskFrameContent);
        this.setContent(content);
    }

    setContent(content) {
        if (content instanceof HTMLElement) {
            this.rootElement.innerHTML = '';
            this.rootElement.appendChild(content);
        } else if (typeof '' === typeof content) {
            this.rootElement.innerHTML = content;
        }
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
    constructor(taskID, content, windowTitle, initStyles={}, closeHandler) {
        super(taskID, 'Main Window');
        this.state.id = taskID;
        this.state.title = windowTitle;
        this.state.style = {
            height: initStyles.height ? initStyles.height : '200px',
            width: initStyles.width ? initStyles.width : '300px',
            top: initStyles.top ? initStyles.top : '200px',
            left: initStyles.left ? initStyles.left : '200px'
        }
        this.resizer = new WebWindowResizers(this.state.id);
        this.header = new WebWindowHeader(this.state.id, windowTitle, closeHandler);
        this.content = new WebWindowContent(this.state.id, content);
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
        this.rootElement.id = newID;
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

    setTitle(newTitle) {
        this.header.title.setTitle(newTitle);
    }

    setContent(content) {
        this.content.setContent(content);
    }
}

header = document.createElement('h2');
header.innerText = 'Welcome to WebWindow';

webwindow = new WebWindow('test-task', header, 'Testing title', {
    width : '400px',
    height: '100px',
    left: ((window.innerWidth / 2) - 200) + 'px',
    top: ((window.innerHeight / 2) - 100) + 'px'
}, function() {
    delete webwindow;
});

