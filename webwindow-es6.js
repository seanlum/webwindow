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
    constructor(name) {
        this.state = {}
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
}

class WebWindowResizer extends WebWindowControl {
    constructor(windowID) {
        super('Resizer');
        this.state.parentWindow = windowID;
        this.setClassName(WebWindowEnum.taskFrameResize);
    }
}

class WebWindowHeader extends WebWindowControl {
    constructor(windowID) {
        super('Header');
        this.state.parentWindow = windowID;
        this.setClassName(WebWindowEnum.taskFrameHeader);
    }
}

class WebWindowContent extends WebWindowControl {
    constructor(windowID) {
        super('Content');
        this.state.parentWindow = windowID;
        this.setClassName(WebWindowEnum.taskFrameContent);
    }
}

class WebWindowContentBorder extends WebWindowControl {
    constructor(windowID) {
        super('Content Border');
        this.state.parentWindow = windowID;
        this.setClassName(WebWindowEnum.taskFrameContentBorder);
    }
}

class WebWindow extends WebWindowControl {
    constructor(taskID, taskTitle, initStyles={}) {
        super();
        this.state = {
            id : taskID,
            title : taskTitle,
            style : {
                height: initStyles.height ? initStyles.height : '200px', 
                width: initStyles.width ? initStyles.width : '300px',
                top: initStyles.top ? initStyles.top : '200px',
                left: initStyles.left ? initStyles.left : '200px'
            }
        }
        this.resizer = new WebWindowResizer(this.state.id);
        this.header = new WebWindowHeader(this.state.id);
        this.content = new WebWindowContent(this.state.id);
        this.border = new WebWindowContentBorder(this.state.id);
        this.addControl(this.resizer);
        this.border.addControl(this.header);
        this.border.addControl(this.content);
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

}

webwindow = new WebWindow('test-task');
console.log(webwindow.getElement().innerHTML);