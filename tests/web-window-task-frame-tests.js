var newWindow = new WebWindow.TaskFrame({
    title : 'Hello window',
    content : '<h1>It Works</h1>'
}, {
    deleteTaskById : function(taskID) {

    }
});
var newWindow2 = new WebWindow.TaskFrame({
    title : 'Window number 2',
    content : '<h1>This also works</h1>'
});

newWindow2.updateContent('<div><code><pre>Content modified</pre></code></div>');

function automatedWindowTest() {
    newWindow2.moveTo(300, 100);
    setTimeout(function() { 
        newWindow2.maximize();
        setTimeout(function() {
            newWindow2.maximize();
            setTimeout(function() {
                newWindow2.minimize();
                console.log(newWindow2.getWindow());
                setTimeout(function() {
                    newWindow2.minimize();
                    console.log(newWindow2.getWindow());
                    setTimeout(function() {
                        newWindow2.close();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 2000);
}

automatedWindowTest();

newWindow3 = new WebWindow.TaskFrame({
    title : 'Third window',
    content: '<p>Here is the third window</p>'
});