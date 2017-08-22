var _ta = new WebWindow.TaskAssistant();
var newWindow = _ta.createTask({
    title : 'Hello window',
    content : '<h1>It Works</h1>'
});
var newWindow2 = _ta.createTask({
    title : 'Window number 2',
    content : '<h1>This also works</h1>'
});

newWindow2.updateContent('<div><code><pre>Content modified</pre></code></div>');
var newWindowUI = newWindow2.getWindow();

function automatedWindowTest() {
    newWindowUI.moveTo(300, 100);
    setTimeout(function() { 
        newWindowUI.maximize();
        setTimeout(function() {
            newWindowUI.maximize();
            setTimeout(function() {
                newWindowUI.minimize();
                console.log(newWindow2.getWindow());
                setTimeout(function() {
                    newWindowUI.minimize();
                    console.log(newWindowUI.getWindow());
                    setTimeout(function() {
                        newWindowUI.close();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 2000);
}

automatedWindowTest();

newWindow3 = _ta.createTask({
    title : 'Third window',
    content: '<p>Here is the third window</p>'
});