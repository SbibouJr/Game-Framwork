export default class {

	constructor(p_title = "Projet Corporate"){
		this.title = p_title;
		this.canvasElt  = document.querySelector('#screen');
		this.consoleElt  = document.querySelector('#console');
		this.contextElt = this.canvasElt.getContext('2d');
		this.moveX = 0;
		this.moveY = 0;
		this.FONT_TYPE_DEFAULT = 'serif';
		this.FONT_SIZE_SM ='40px';
		this.FONT_SIZE_MD ='60px';
		this.FONT_SIZE_LG ='80px';

		let exempleAnime ={
			x:40,
			y:550,
			width:20,
			height:20,
			right:true
		};
		this.callbackLoop = () => {
			this.drawRect("yellow", 20, 20, this.canvasElt.width-40, this.canvasElt.height-40, 10, 10);
			this.drawRect("black", 40, 40, this.canvasElt.width-80, this.canvasElt.height-80);
			this.drawRect("yellow", 40, this.canvasElt.height-140 , this.canvasElt.width-80, 20);

			if(exempleAnime.right){
				if(exempleAnime.x+exempleAnime.width > this.canvasElt.width-80){
					exempleAnime.right = false;
				}
				else{
					exempleAnime.x += 20;
				}
			}
			else{
				if(exempleAnime.x < 80){
					exempleAnime.right = true;
				}
				else{
					exempleAnime.x -= 20;
				}
			}
			this.drawRect("red", exempleAnime.x, exempleAnime.y , exempleAnime.width, exempleAnime.height);
			let imgExemple = this.createImage("../../assets/img/marsattakStudioGame.png");
			//imgExemple.width -= 80;
			//imgExemple.height -= 300;
			imgExemple.scale(0.55);
			this.drawImage(imgExemple, this.canvasElt.width/2 - imgExemple.width/2, 40);
			this.drawText("Game exemple", this.canvasElt.width/2+200, this.canvasElt.height-120,"white", this.FONT_SIZE_MD);
		};
	}

	_mainLoop(){
		this.contextElt.save();
		this.contextElt.clearRect(0,0,this.canvasElt.width, this.canvasElt.height);
		this.callbackLoop();
		this.contextElt.restore();
		window.requestAnimFrame(() => { this._mainLoop(this.callbackLoop); } );
	}

	createImage(p_src, p_x=false, p_y=false){

		let img = p_x && p_y ? new Image(p_x, p_y) : p_x ? new Image(p_x): new Image();
		img.src = p_src;
		img.scale = (p_value) =>{
			let lastWidth = img.width;
			let lastHeight = img.height;
			//let multiple = initialHeight/initialWidth;
			img.width = lastWidth*p_value;
			img.height = lastHeight*p_value;

		};
		return img;
	}

	load(){
		this.contextElt.textBaseline ="top";
		console.log("loading");
	}

	drawText(p_text="Exemple text", p_x=50, p_y=50, p_color="black", p_size=this.FONT_SIZE_SM, p_alpha=1, p_offsetXShadow=0, p_offsetYShadow=0, p_colorShadow = "black", p_font=this.FONT_TYPE_DEFAULT){
		this.contextElt.shadowColor = p_colorShadow;
		this.contextElt.shadowOffsetX = p_offsetXShadow;
		this.contextElt.shadowOffsetY = p_offsetYShadow;
		this.contextElt.globalAlpha = p_alpha;
		this.contextElt.fillStyle = p_color;
		this.contextElt.font = `${p_size} ${p_font}`;
		this.contextElt.fillText(p_text, p_x, p_y );
	}

	drawImage(p_img, p_x=0, p_y=0, p_width=false, p_height=false){
		this.contextElt.drawImage(p_img, p_x, p_y, !p_width?p_img.width:p_width, !p_height?p_img.height:p_height);
	}

	drawRect(p_color="black", p_x=10, p_y=10, p_width=10, p_height=10, p_alpha=1){
		this.contextElt.globalAlpha = p_alpha;
		this.contextElt.fillStyle = p_color;
		this.contextElt.fillRect(p_x, p_y, p_width, p_height);
	}
	loop(p_callback){
		this.callbackLoop = p_callback;
	}

	run(){
		this.load();
		this._mainLoop();
	}

};