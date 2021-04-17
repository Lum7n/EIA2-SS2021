"use strict";
var EventInspector;
(function (EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        document.addEventListener("mousemove", setinfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.addEventListener("bubble", bubble);
        let body = document.querySelector("body");
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        let div0 = document.getElementById("div0");
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        let div1 = document.getElementById("div1");
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);
        let buttonOfDiv0 = document.getElementById("buttonDiv0");
        buttonOfDiv0.addEventListener("click", getCustomEvent);
        let buttonOfDiv1 = document.getElementById("buttonDiv1");
        buttonOfDiv1.addEventListener("click", getCustomEvent);
    }
    function setinfoBox(_event) {
        let spanAtMouse = document.querySelector("span");
        let x = _event.clientX;
        let y = _event.clientY;
        let mouseCoordinates = "X-Coordinates: " + x + ", Y-Coordinates: " + y;
        let displayTarget = _event.target;
        spanAtMouse.style.left = x + 20 + "px";
        spanAtMouse.style.top = y + 20 + "px";
        spanAtMouse.innerHTML = "Mouse-Position: " + "<br>" + mouseCoordinates + "<br><br>" + "Target: " + displayTarget;
    }
    function logInfo(_event) {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    }
    function getCustomEvent(_event) {
        let event = new CustomEvent("bubble", { bubbles: true });
        let theDiv = _event.currentTarget;
        theDiv.dispatchEvent(event);
    }
    function bubble(_event) {
        console.log(_event);
    }
})(EventInspector || (EventInspector = {}));
//# sourceMappingURL=script.js.map