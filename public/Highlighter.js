const PIPELINE_NAME = "Custom";

class Highlighter {
    constructor(scene){
        this.scene = scene;
        this.customPipeline = scene.sys.game.renderer.addPipeline(PIPELINE_NAME, new CustomPipeline(scene.sys.game));
		this.customPipeline.setFloat2('uResolution', scene.sys.game.config.width, scene.sys.game.config.height);
		this._time = 0;
    }
   update(){
        this.customPipeline.setFloat1('uTime', this._time);
		this._time += 0.002;
		if(this._time > 1){
			this._time = 0;
		}
    }
    unhighlight(objs){
		_.each(objs, ob => {
			ob.resetPipeline();
		});
		if(this.tween){
			this.tween.stop();
			this.tween = null;
		}
		return this;
    }
    highlight (obj) {
		this.customPipeline.setFloat1('textureHeight', obj.displayHeight);
	    this.customPipeline.setFloat1('textureWidth', obj.displayWidth);
	    obj.setPipeline(PIPELINE_NAME);
		this.tween = this.scene.tweens.add({
			targets     : [obj],
			scaleX		: obj.scaleX * 1.025,
			scaleY		: obj.scaleY * 1.025,
			ease        : 'Linear',
			duration    : 100,
			yoyo        : true,
			repeat      : 0
		});
		return this;
    }
}
