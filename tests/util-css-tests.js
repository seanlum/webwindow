function UtilCSSTests() {
    var testDiv = document.createElement('div');
    
    testDiv.id = 'test-util-css-test';
    
    document.body.appendChild(testDiv);

    function getDiv() {
        return document.getElementById(testDiv.id);
    }

    var CSS = WebWindow.Util.CSS;
    var pass = false;

    CSS.toggleClass(getDiv(), 'test-class-1');
    if (/(test-class-1)/.test(getDiv().className)) {
        pass = true;
    } else {
        pass = false;
        console.error('Class was not applied');
        return;
    }

    CSS.fadeIn(getDiv());

    if (CSS.hasClass(getDiv(), WebWindow.classes.fadeIn)) {
        pass = true;
    } else {
        pass = false;
        console.error('Could not fade in');
        console.error({elem : getDiv().className});
        return;
    }

    CSS.fadeOut(getDiv());

    if (CSS.hasClass(getDiv(), WebWindow.classes.fadeOut)) {
        pass = true;
    } else {
        pass = false;
        console.error('Could not fade out');
        console.error(getDiv());
        return;
    }

    CSS.toggleFade(getDiv());

    if (!CSS.hasClass(getDiv(), WebWindow.classes.fadeOut) &&
         CSS.hasClass(getDiv(), WebWindow.classes.fadeIn)) {
        pass = true;
    } else {
        pass = false;
        console.error('Could not toggle fade');
        console.error(getDiv());
        return;
    }

    testDiv.onmousedown = function(event) {
        CSS.dragdrop(event, 'dragstart', getDiv());
    }
    testDiv.onmousedown(null);
    window.onmousemove({
        movementX : 100,
        movementY : 200
    });
    if (Number(/(\d+)/.exec(getDiv().style.left)[0]) >= 100) {
        pass = true;
    } else {
        pass = false;
        console.error({ left : getDiv().style.left, top : getDiv().style.top });
        return;
    }
    if (Number(/(\d+)/.exec(getDiv().style.top)[0]) >= 200) {
        pass = true;
    } else {
        pass = false;
        console.error({ top : getDiv().style.top, left : getDiv().style.left});
        return;
    }
    window.onmousemove = null;
    if(pass) {
        getDiv().innerHTML = 'Util.CSS tests passed';
    } else {
        getDiv().innerHTML = 'Util.CSC tests failed';
    }
}

UtilCSSTests(); 