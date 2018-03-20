var defenderOne;
var playerOnBall;
var defenceSone;



function setup() {
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "black";
    createCanvas(480, 400);
    defenderOne = new Player(280,280);
    playerOnBall = createVector(200,200);
    defenceSone = createVector (280,280);
    defenceSmartPoint = createVector(260,260);
}

function draw() {
    background(51);
    //line(240,0,240,400);

    stroke('black');
    strokeWeight(4);
    point(playerOnBall.x,playerOnBall.y);
    
    stroke('gray');
    noFill();
    point(defenceSmartPoint.x,defenceSmartPoint.y);
    ellipse(defenceSone.x, defenceSone.y,100);
    
    stroke('blue');
    defenderOne.coverPoint(playerOnBall,1);
    defenderOne.coverPoint(defenceSmartPoint,1);
    defenderOne.update();
    defenderOne.show();
    defenderOne.resetMovement();
}


function Player(x,y){
   this.location = createVector(x,y);
   this.velocity = createVector();
   this.acceleration = createVector();


    this.show = function () {
        stroke(255);
        strokeWeight(4);
        ellipse(this.location.x,this.location.y,5);
    }
    
    this.coverPoint = function(target,type) {
        let attractionStrength = 1;

        if(type == 1) {
            attractionStrength = 6.67408; //The actual gravitational contant irl :)
        } else {
            attractionStrength = 17; //Not the actual gravitational contant irl :)
        }
        
        // Define the vector / angle that the Player should move (target - this.location)
        let force = p5.Vector.sub(target, this.location);
        let distance = force.mag();
        console.log(distance +' ' +type);
        distance = constrain(distance,1,50);
        let forceStrength = (distance/attractionStrength);
        force.setMag(forceStrength);
        this.acceleration = p5.Vector.add(this.acceleration, force);
        this.velocity.limit(5);
    }
 
    this.resetMovement = function(){
        this.acceleration.set(0,0);
//        this.velocity.add(this.acceleration);
    }

    this.update = function(){
        this.location.add(this.velocity);
        this.velocity.add(this.acceleration);
//        player.acceleration.x = 60;
//        player.acceleration.y = 60;
//        player.velocity.limit(5);
    }
}    