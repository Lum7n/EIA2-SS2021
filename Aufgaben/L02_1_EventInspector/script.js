"use strict";
var EventInspector;
(function (EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        document.addEventListener("mousemove", setinfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
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
        buttonOfDiv0.addEventListener("click", bubble);
        let buttonOfDiv1 = document.getElementById("buttonDiv1");
        buttonOfDiv1.addEventListener("click", bubble);
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
        console.log(_event.composedPath());
    }
    function bubble() {
        let buttonOfDiv0 = document.getElementById("buttonDiv0");
        let buttonOfDiv1 = document.getElementById("buttonDiv1");
        let event = new CustomEvent("bubble", { bubbles: true });
        buttonOfDiv0.dispatchEvent(event);
        buttonOfDiv1.dispatchEvent(event);
        //es soll ausgegeben werden wenn bei document ankommt
        console.log(event);
    }
})(EventInspector || (EventInspector = {}));
//# sourceMappingURL=script.js.map