
var CustomPipeline = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize:
    function CustomPipeline (game){
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;
            uniform sampler2D uMainSampler;
            uniform vec2 uResolution;
            uniform float uTime;
            uniform float textureWidth;
            uniform float textureHeight;
            varying vec2 outTexCoord;
            varying vec4 outTint;
            void main(){
				float segLength = 10.0;
				if(mod(((outTexCoord.y + uTime) * textureHeight) / segLength, 2.0) <= 1.0 && outTexCoord.x <= (2.0/textureWidth)){
				    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.1);
				    gl_FragColor.a = 0.1;
				}
				else if(mod(((outTexCoord.y - uTime ) * textureHeight) / segLength, 2.0) <= 1.0 && outTexCoord.x > 1.0 - (2.0/textureWidth)){
				    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.1);
				}
				else if(mod(((outTexCoord.x - uTime) * textureWidth)/ segLength, 2.0) <= 1.0 && outTexCoord.y < (2.0/textureHeight)){
				    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
				}
				else if(mod(((outTexCoord.x + uTime) * textureWidth)/ segLength, 2.0) <= 1.0 && outTexCoord.y > 1.0 - (2.0/textureHeight)){
				    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
				}
				else{
				    vec4 texel = texture2D(uMainSampler, outTexCoord);
				    gl_FragColor = vec4(texel.r*1.5, texel.g*1.5, texel.b*1.5, texel.a);
				}
			}
			`
		});
    }
});
