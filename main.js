class AngleFinder {
    constructor() {



        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext('2d');
        navigator.mediaDevices.getUserMedia(
            {
                video: {
                    facingMode: "environment"
                }
            }
        )
        .then(stream=>{
            document.querySelector("video").srcObject = stream;
            document.querySelector("video").play();

            })

        document.querySelector("video").addEventListener("loadeddata", () => {
            this.canvas.width = document.querySelector("video").videoWidth;
            this.canvas.height = document.querySelector("video").videoHeight;
        })

        requestAnimationFrame(this.render.bind(this))


        this.registerEvent();
    }


    point1 = null;
    poin2 = null;


    registerEvent() {
        this.canvas.addEventListener("mousedown", (event) => {
            if (this.point1 == null) {
                this.point1 = { x: event.x, y: event.y };
            } else if (this.poin2 == null) {
                this.poin2 = { x: event.x, y: event.y };
                console.log(this.calculateAngle(this.point1, this.poin2))
                let calc = this.calculateAngle(this.point1, this.poin2);
                this.values.angle = calc.degree;
                this.values.rad = calc.radians;
                this.values.cos = Math.cos(calc.radians)
                this.values.sin = Math.sin(calc.radians)
                this.values.tan = Math.tan(calc.radians)
                console.log(this.values);
            }
        });

        document.ontouchstart = (evt) => {
            if (this.point1 == null) {
                this.point1 = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
            } else if (this.poin2 == null) {
                this.poin2 = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
                console.log(this.calculateAngle(this.point1, this.poin2))
                let calc = this.calculateAngle(this.point1, this.poin2);
                this.values.angle = calc.degree;
                this.values.rad = calc.radians;
                this.values.cos = -Math.cos(calc.radians)
                this.values.sin = Math.sin(calc.radians)
                this.values.tan = -Math.tan(calc.radians)
                this.values.height = Math.tan(this.values.angle * Math.PI / 180) * parseInt(document.querySelector("#horizontalDistance").value) + parseInt(document.querySelector("#heightThreshold").value)

                console.log(this.values);
            }
        }
    }


    values = {
        angle: 0,
        rad: 0,
        sin: 0,
        cos: 0,
        tan: 0,
//         height: 0,
    }

    calculateAngle(point1, point2) {
        let angleRadians = Math.atan2(point2.y - point1.y, point2.x - point1.x);
        let angleDegrees = Math.round(angleRadians * 180 / Math.PI);
        console.log(point1.y - point2.y);
        return { degree: 180 - angleDegrees, radians: (180 - angleDegrees) * (Math.PI / 180) };
    }

    pythagorasTheo(height, base){
        return parseFloat(Math.sqrt(Math.pow(height, 2) + Math.pow(base, 2))).toFixed(2)
    }

    render(ts) {

        this.ctx.drawImage(document.querySelector("video"), 0, 0, this.canvas.width, this.canvas.height);


        if (this.point1 != null) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.point1.x, this.point1.y, 20, 20);
        }

        if (this.poin2 != null) {

            let height = Math.tan(window.game.values.angle
                * Math.PI / 180) * parseInt(document.querySelector("#horizontalDistance").value) + 2;
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(this.poin2.x, this.poin2.y, 20, 20);

            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.values.angle, 30, 30);


            // drawing line and height

            this.ctx.strokeStyle = "red";

            this.ctx.beginPath()
            this.ctx.moveTo(this.point1.x, this.point1.y);
            this.ctx.lineTo(this.point1.x, this.poin2.y);
            this.ctx.lineWidth = 6;
            this.ctx.stroke();


            this.ctx.beginPath()
            this.ctx.moveTo(this.poin2.x, this.poin2.y);
            this.ctx.lineTo(this.point1.x, this.poin2.y);
            this.ctx.lineWidth = 6;
            this.ctx.stroke();

            this.ctx.beginPath()
            this.ctx.moveTo(this.poin2.x, this.poin2.y);
            this.ctx.lineTo(this.point1.x, this.point1.y);
            this.ctx.lineWidth = 6;
            this.ctx.stroke();

            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(parseFloat(height).toFixed(2), this.point1.x, this.poin2.y);
// HEIGHT AND THRESHOLD CODE HERE
            
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.pythagorasTheo(height, parseInt(document.querySelector("#horizontalDistance").value)), (this.poin2.x + this.point1.x)/2, (this.poin2.y + this.point1.y)/2 - 20);

        }



        requestAnimationFrame(this.render.bind(this))

    }
}


window.onload = () => {
    window.game = new AngleFinder();
}
