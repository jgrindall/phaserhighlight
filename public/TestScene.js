
class TestScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'test',
            active: true
        });
        this._time = 0;
        this._objects = [];
    }
    preload () {
    	this._highlighter = new Highlighter(this);
        this.load.image('star', 'assets/star.png');
		this.load.image('sky', 'assets/sky.jpg');
		this.load.image('moon', 'assets/moon.png');
    }
    select(obj){
    	this._highlighter.unhighlight(this._objects).highlight(obj);
    }
    makeObj(){
    	var obj0, obj1, obj2, obj3;
		obj0 = this.physics.add.sprite(400, 250, 'star');
		obj0.body.setAllowGravity(false);
		obj1 = this.physics.add.sprite(800, 350, 'moon');
		obj1.body.setAllowGravity(false);
		obj0.scaleX = obj0.scaleY = 1.5;
	    obj0.setDebug(false);
	    obj1.setDebug(false);
	    obj0.setInteractive();
		obj1.setInteractive();
		this._objects.push(obj0);
		this._objects.push(obj1);
		const polygon = new Phaser.Geom.Polygon([
            0, 0,
            50, 20,
            100, 50,
            70, 120,
            30, 80
        ]);
		const graphics = this.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 3,
                color: 0x660099,
                alpha: 1
            },
            fillStyle: {
                color: 0x2266ff,
                alpha: 1
            }
        });
		graphics.fillPoints(polygon.points, true);
		const bounds = Phaser.Geom.Polygon.GetAABB(polygon);
        graphics.generateTexture('shape', bounds.width, bounds.height);
		obj2 = this.add.sprite(400, 400, 'shape');
		obj2.setInteractive();
		this._objects.push(obj2);
		obj3 = this.add.text(100,100, "This is my label", {fontSize: '26px', fill: '#fff'});
		this._objects.push(obj3);
		obj3.setInteractive();
		this.input.setDraggable(obj0, true);
		this.input.setDraggable(obj1, true);
		this.input.setDraggable(obj2, true);
		this.input.setDraggable(obj3, true);
		graphics.destroy();
		this.input.on('gameobjectdown',(p, obj) => {
	        this.select(obj);
		});
		this.input.on('drag', (pointer, obj, dragX, dragY) => {
            obj.x = parseInt(dragX);
            obj.y = parseInt(dragY);
        });

    }
    create(){
		this.add.image(400, 300, 'sky');
		this.makeObj();
    }

    update(){
    	this._objects[1].angle += 0.1;
        this._highlighter.update();
    }
}
