
// import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import * as fabric from 'fabric';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//     selector: 'app-root',
//     templateUrl: './app.component.html',
//     imports: [CommonModule, FormsModule],
//     styleUrls: ['./app.component.css']

// })

// export class AppComponent implements AfterViewInit {

//     @ViewChild('canvasElement', { static: true })
//     canvasElement!: ElementRef<HTMLCanvasElement>;
//     canvas!: fabric.Canvas;

//     isDrawingMode: boolean = true;
//     isLassoMode: boolean = false;
//     isStrictLassoMode: boolean = false;
//     showpendiv: boolean = false;
//     ispen: boolean = true;
//     isHighlighted: boolean = false;
//     brushWidth: number = 2;
//     colors: string[] = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF', '#FFA500', '#00FF00'];
//     selectedColor: string = '#000000'; // Track selected color
//     iscolour: boolean = true; // Track selected color

//     ngAfterViewInit(): void {
//         this.initializeCanvas();
//     }

//     initializeCanvas() {
//         this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
//             width: window.innerWidth,
//             height: window.innerHeight,
//             backgroundColor: 'white',

//         });

//         // Set selection styles
//         this.canvas.selectionColor = 'rgba(0, 0, 255, 0.1)';
//         this.canvas.selectionBorderColor = 'blue';
//         this.canvas.selectionLineWidth = 1;
//         this.canvas.selectionDashArray = [5, 5];

//         // ✅ Initialize the drawing brush
//         this.canvas.isDrawingMode = true;
//         this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
//         this.canvas.freeDrawingBrush.width = this.brushWidth;
//         this.canvas.freeDrawingBrush.color = this.selectedColor;

//         console.log('✅ Canvas ready with drawing mode ON');
//     }

//     clearCanvas() {
//         if (this.canvas) {
//             this.canvas.clear();
//         }

//     }

//     pentoggle() {
//         this.showpendiv = !this.showpendiv;
//         this.canvas.isDrawingMode = !this.showpendiv;

//     }

//     select() {
//         this.isLassoMode = false;
//         this.isDrawingMode = false;
//         this.isLassoMode = false;
//         this.canvas.isDrawingMode = false;
//         this.canvas.getObjects().forEach((obj) => {
//             obj.selectable = true;
//         });
//     }

//     onDivClick() {
//         this.showpendiv = false;
//         if (this.canvas.isDrawingMode) {
//             this.canvas.isDrawingMode = true;
//             this.isLassoMode = false;
//         }
//         if (!this.canvas.isDrawingMode) {
//             this.canvas.isDrawingMode = false;

//         }
//     }

//     highlighter() {
//         if (!this.canvas.freeDrawingBrush) return;

//         this.isHighlighted = true;
//         this.ispen = false;
//         const lighterColor = this.lightenColor(this.selectedColor, 0.5);
//         this.canvas.freeDrawingBrush.width = 12;
//         this.brushWidth = this.canvas.freeDrawingBrush.width;
//         this.canvas.freeDrawingBrush.color = lighterColor;
//     }

//     lightenColor(color: string, factor: number): string {
//         let hex = color.replace('#', '');
//         let r = parseInt(hex.substring(0, 2), 16);
//         let g = parseInt(hex.substring(2, 4), 16);
//         let b = parseInt(hex.substring(4, 6), 16);

//         r = Math.round(r + (255 - r) * factor);
//         g = Math.round(g + (255 - g) * factor);
//         b = Math.round(b + (255 - b) * factor);

//         let lighterHex = '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
//         return lighterHex;
//     }

//     componentToHex(c: number): string {
//         let hex = c.toString(16);
//         return hex.length == 1 ? '0' + hex : hex;
//     }

//     pen() {
//         if (!this.canvas.freeDrawingBrush) return;

//         this.isDrawingMode = true;
//         this.isLassoMode = false;
//         this.canvas.isDrawingMode = true;
//         this.canvas.freeDrawingBrush.width = 2;
//         this.brushWidth = this.canvas.freeDrawingBrush.width;
//         this.canvas.freeDrawingBrush.color = this.selectedColor;
//         this.ispen = true;
//         this.isHighlighted = false;
//     }

//     onChangeBrushWidth(event: Event): void {
//         if (!this.canvas.freeDrawingBrush) return;

//         const value = (event.target as HTMLInputElement).valueAsNumber;
//         this.brushWidth = value;
//         this.canvas.freeDrawingBrush.width = this.brushWidth;
//     }

//     changeColor(color: string): void {
//         if (!this.canvas.freeDrawingBrush) return;

//         this.selectedColor = color;
//         this.canvas.freeDrawingBrush.color = color;
//     }

//     isSelected(color: string) {
//         return color === this.selectedColor;
//     }

//     addRectangle() {
//         const rect = new fabric.Rect({
//             left: 100,
//             top: 100,
//             fill: 'red',
//             width: 100,
//             height: 100,
//             selectable: true,
//             evented: true
//         });
//         this.canvas.add(rect);
//     }

// }



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as fabric from 'fabric';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [CommonModule, FormsModule],
    styleUrls: ['./app.component.css']

})

export class AppComponent implements AfterViewInit {

    @ViewChild('canvasElement', { static: true })
    canvasElement!: ElementRef<HTMLCanvasElement>;
    canvas!: fabric.Canvas;

    isDrawingMode: boolean = true;
    isLassoMode: boolean = false;
    isStrictLassoMode: boolean = false;
    showpendiv: boolean = false;
    ispen: boolean = true;
    isHighlighted: boolean = false;
    brushWidth: number = 2;
    colors: string[] = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF', '#FFA500', '#00FF00'];
    selectedColor: string = '#000000'; // Track selected color
    iscolour: boolean = true; // Track selected color
    socket!: WebSocket;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


    ngAfterViewInit(): void {
        // Run only on browser
        if (isPlatformBrowser(this.platformId)) {
            this.initializeCanvas();
            this.setupWebSocket();
        }
    }



    // initializeCanvas() {
    //     const canvasEl = this.canvasElement.nativeElement;

    //     // Safe fallback size
    //     const width = canvasEl.offsetWidth || 800;
    //     const height = canvasEl.offsetHeight || 600;

    //     this.canvas = new fabric.Canvas(canvasEl, {
    //         width,
    //         height,
    //         backgroundColor: 'white',
    //     });

    //     this.canvas.isDrawingMode = true;
    //     this.canvas.selectionColor = 'rgba(0, 0, 255, 0.1)';
    //     this.canvas.selectionBorderColor = 'blue';
    //     this.canvas.selectionLineWidth = 1;
    //     this.canvas.selectionDashArray = [5, 5];

    //     // ✅ Initialize the brush
    //     const brush = new fabric.PencilBrush(this.canvas);
    //     brush.width = this.brushWidth;
    //     brush.color = this.selectedColor;
    //     this.canvas.freeDrawingBrush = brush;

    //     console.log('✅ Canvas initialized in browser');

    //     this.canvas.on('path:created', (e) => {
    //         const json = e.path.toJSON();
    //         this.socket?.send(JSON.stringify({ type: 'add', object: json }));
    //     });

    //     this.canvas.on('object:modified', (e) => {
    //         const json = e.target?.toJSON();
    //         this.socket?.send(JSON.stringify({ type: 'modify', object: json }));
    //     });
    // }

    initializeCanvas() {
        const canvasEl = this.canvasElement.nativeElement;
        const width = canvasEl.offsetWidth || 800;
        const height = canvasEl.offsetHeight || 600;

        this.canvas = new fabric.Canvas(canvasEl, {
            width,
            height,
            backgroundColor: 'white',
            isDrawingMode: true,
        });

        const brush = new fabric.PencilBrush(this.canvas);
        brush.width = this.brushWidth;
        brush.color = this.selectedColor;
        this.canvas.freeDrawingBrush = brush;

        // 🔹 Listen for drawing events and broadcast them
        this.canvas.on('path:created', (e) => {
            const path = e.path;
            (path as any).id = Date.now().toString(); // give each path a unique id
            const json = path.toJSON();
            console.log('🟢 Sending path to server:', json);
            this.socket?.send(JSON.stringify({ type: 'add', object: json }));
        });


        this.canvas.on('object:modified', (e) => {
            const json = e.target?.toJSON();
            this.socket?.send(JSON.stringify({ type: 'modify', object: json }));
        });

        console.log('✅ Canvas initialized and ready to draw');
    }


    clearCanvas() {
        if (this.canvas) {
            this.canvas.clear();
        }
    }

    setupWebSocket() {
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.onopen = () => console.log('🟢 Connected to WebSocket');
        this.socket.onclose = () => console.log('🔴 Disconnected');
        this.socket.onerror = (err) => console.error('WebSocket error:', err);

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleRemoteUpdate(data);
        };
    }

    handleRemoteUpdate(data: any) {
        if (!this.canvas) return;

        console.log('📩 Incoming WebSocket data:', data);

        if (data.type === 'add' && data.object) {
            fabric.util.enlivenObjects([data.object]).then((objs: any[]) => {
                objs.forEach((obj: any) => this.canvas.add(obj));
                this.canvas.renderAll();
            });
        }

        if (data.type === 'modify' && data.object) {
            const existing = this.canvas
                .getObjects()
                .find((o: any) => o.id === data.object.id);

            if (existing) {
                existing.set(data.object);
                this.canvas.renderAll();
            }
        }
    }




    pentoggle() {
        this.showpendiv = !this.showpendiv;
        this.canvas.isDrawingMode = !this.showpendiv;

    }

    select() {
        this.isLassoMode = false;
        this.isDrawingMode = false;
        this.isLassoMode = false;
        this.canvas.isDrawingMode = false;
        this.canvas.getObjects().forEach((obj) => {
            obj.selectable = true;
        });
    }

    onDivClick() {
        this.showpendiv = false;
        if (this.canvas.isDrawingMode) {
            this.canvas.isDrawingMode = true;
            this.isLassoMode = false;
        }
        if (!this.canvas.isDrawingMode) {
            this.canvas.isDrawingMode = false;

        }
    }

    highlighter() {
        if (!this.canvas.freeDrawingBrush) return;

        this.isHighlighted = true;
        this.ispen = false;
        const lighterColor = this.lightenColor(this.selectedColor, 0.5);
        this.canvas.freeDrawingBrush.width = 12;
        this.brushWidth = this.canvas.freeDrawingBrush.width;
        this.canvas.freeDrawingBrush.color = lighterColor;
    }

    lightenColor(color: string, factor: number): string {
        let hex = color.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.round(r + (255 - r) * factor);
        g = Math.round(g + (255 - g) * factor);
        b = Math.round(b + (255 - b) * factor);

        let lighterHex = '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        return lighterHex;
    }

    componentToHex(c: number): string {
        let hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }

    pen() {
        if (!this.canvas.freeDrawingBrush) return;

        this.isDrawingMode = true;
        this.isLassoMode = false;
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.width = 2;
        this.brushWidth = this.canvas.freeDrawingBrush.width;
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        this.ispen = true;
        this.isHighlighted = false;
    }

    text() {
        const pointer = { x: 100, y: 100 }; // Set the coordinates to (100, 100)
        this.addTextToCanvas('', pointer.x, pointer.y, {
            fontSize: 20,
            fill: 'black',
            width: 0,
            height: 0,
            selectable: true,
            evented: false,
            editable: true
        });
    }

    addTextToCanvas(text: string, left: number, top: number, options?: any) {
        const textObject = new fabric.Textbox(text, {
            left: left,
            top: top,
        });

        this.canvas.add(textObject);
        this.canvas.setActiveObject(textObject);
        textObject.enterEditing();
        this.canvas.renderAll();
    }// TEXT FUNCTION

    onChangeBrushWidth(event: Event): void {
        if (!this.canvas.freeDrawingBrush) return;

        const value = (event.target as HTMLInputElement).valueAsNumber;
        this.brushWidth = value;
        this.canvas.freeDrawingBrush.width = this.brushWidth;
    }

    changeColor(color: string): void {
        if (!this.canvas.freeDrawingBrush) return;

        this.selectedColor = color;
        this.canvas.freeDrawingBrush.color = color;
    }

    isSelected(color: string) {
        return color === this.selectedColor;
    }

    addRectangle() {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 100,
            height: 100,
            selectable: true,
            evented: true
        });
        this.canvas.add(rect);
    }

}
