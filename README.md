# webwindow

# (New) React - test screenshots from three different operating systems
## 
![Webwindow on an Android tablet Firefox](https://github.com/seanlum/webwindow/raw/react-1.0.0/React/screenshots/Running-on-Firefox-in-Android-Tablet.png "Android Tablet Browser")

![Webwindow on an Manjaro desktop Firefox](https://github.com/seanlum/webwindow/raw/react-1.0.0/React/screenshots/Running-on-Firefox-in-Manjaro-Desktop.png "Manjaro Desktop Browser")

![Webwindow on an iPhone Safari](https://github.com/seanlum/webwindow/raw/react-1.0.0/React/screenshots/Running-on-Firefox-in-Manjaro-Desktop.png "Manjaro Desktop Browser")


# (New) ES6 is being worked on in tandem with React now

# Vanilla JavaScript
An HTML5 DOM based windowing system written in JavaScript

So far there are a few things that you can do with this framework. 

# Create just a TaskFrame (a window object with a base API):
```javascript
var window = new WebWindow.TaskFrame({
  title : "Window frame title",
  content : 'Text content, which can also contain things like <div id="cool-content"></div>',
  height : '300px',
  width: '250px'
}, taskAssistant);
```
An instance of TaskFrame has properties like: 
  - moveTo(x,y): reposition the TaskFrame
  - updateContent(updateContent): update the innerHTML attribute. This will eventually be DOM compatible.
  - updateTitle(newTitle): change the title of the TaskFrame
  - setSize(newX,newY): change the height of the page
  - getWindow(): returns the root node of the TaskFrame.
  - getTitle(): gets the current TaskFrame title
  - focus(): focuses on the root node of the TaskFrame.
  - toggleWindow(): toggles the window in and out of view 
  - minimize(): toggles the window in and out of view
  - maximize(): maximizes the window to the size of the Board
  - close(): disposes of the window

# Create a Task which ecapsulates a WebWindow.TaskFrame
```javascript
var task = new WebWindow.Task({
  title : "TaskFrame Title",
  content : 'this will eventually be DOM compatible, so you can insert an HTMLElement into the window',
  height : '300px',
  width : '250px'
}, taskAssistant);
```
An instance of Task has properties like (in progress):
  - getTitle(): gets task title
  - getID(): gets the instance ID of the TaskFrame inside it
  - updateContent(contentToSet): update the innerHTML content
  - toggleWindow(): will hold event objects to send off events when the task is interacted with.
  Has TaskFrame features of:
    getWindow(), minimize(), maximize(), close()

# Create a TaskAssistant, which manages Tasks
```javascript
var taskAssistant = new WebWindow.TaskAssistant();
```
A TaskAssistant instance has properties like:
  - addTask(Task): add a task to the monitored tasks
  - removeTaskById(taskID, callback): removes a Task instance, by its instance ID
  - closeAll(): closes all running tasks
  - getTasks(toRetrieve): returns multiple or a singular task(s) by supplied instance IDs 
  - refreshTasks(): recreates the items in the id of WebWindow.taskAssistantID (currently treated as a ul list element)
  - createTask(taskData): creates a new task and adds it to the monitored tasks, and calls refreshTasks()
  
 WebWindow.MainMenu and WebWindow.Board is currently in progress.
