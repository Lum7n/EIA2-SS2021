namespace EventInspector {

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        document.addEventListener("mousemove", setinfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);

        let body: HTMLBodyElement = <HTMLBodyElement>document.querySelector("body");
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);

        let div0: HTMLDivElement = <HTMLDivElement>document.getElementById("div0");
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);

        let div1: HTMLDivElement = <HTMLDivElement>document.getElementById("div1");
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);

        let buttonOfDiv0: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDiv0");
        buttonOfDiv0.addEventListener("click", bubble);

        let buttonOfDiv1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDiv1");
        buttonOfDiv1.addEventListener("click", bubble);
    }

    function setinfoBox(_event: MouseEvent): void {

        let spanAtMouse: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");

        let x: number = _event.clientX;
        let y: number = _event.clientY;

        let mouseCoordinates: string = "X-Coordinates: " + x + ", Y-Coordinates: " + y;

        let displayTarget: EventTarget = <EventTarget>_event.target;

        spanAtMouse.style.left = x + 20 + "px";
        spanAtMouse.style.top = y + 20 + "px";

        spanAtMouse.innerHTML = "Mouse-Position: " + "<br>" + mouseCoordinates + "<br><br>" + "Target: " + displayTarget;
    }

    function logInfo(_event: Event): void {

        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.composedPath());
    }

    function bubble(): void {

        let buttonOfDiv0: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDiv0");
        let buttonOfDiv1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDiv1");

        let event: CustomEvent = new CustomEvent("bubble", { bubbles: true});

        buttonOfDiv0.dispatchEvent(event);
        buttonOfDiv1.dispatchEvent(event);
        
//es soll ausgegeben werden wenn bei document ankommt
        
        console.log(event);
    }


}