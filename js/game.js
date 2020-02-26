// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {

	this.words = [
		{
			key:'baby',
			setXY: {
				x:100,
				y:280
			},
			setScale: {
				x:0.4,
				y:0.4
			},
			english: 'baby'


		},
		{
			key:'house',
			setXY: {
				x:240,
				y:280
			},
			setScale: {
				x:0.4,
				y:0.4
			},
			english: 'house'


		},
		{
			key:'cow',
			setXY: {
				x:400,
				y:300
			},
			setScale: {
				x:0.4,
				y:0.4
			},
			english: 'cow'


		},
		{
			key:'tree',
			setXY: {
				x:550,
				y:250
			},
			english: 'tree'

		},
	];
}

// load asset files for our game
gameScene.preload = function() {
	this.load.image('background', 'assets/images/background.png');
	this.load.image('baby', 'assets/images/baby.png');
	this.load.image('cow', 'assets/images/cow.png');
	this.load.image('house', 'assets/images/house.png');
	this.load.image('tree', 'assets/images/tree.png');
	//this.load.image('background', 'assets/images/background.png')

	this.load.audio('treeAudio', 'assets/audio/tree.mp3');
	this.load.audio('babyAudio', 'assets/audio/baby.mp3');
	this.load.audio('houseAudio', 'assets/audio/house.mp3');
	this.load.audio('cowAudio', 'assets/audio/cow.mp3');
	this.load.audio('correct', 'assets/audio/correct.mp3');
	this.load.audio('wrong', 'assets/audio/wrong.mp3');
	//this.load.audio('treeAudio', 'assets/audio/arbol.mp3');
	

};

// executed once, after assets were loaded
gameScene.create = function() {

	this.score = 0;
	

	this.items = this.add.group(this.words);


	let bg = this.add.sprite(0, 0, 'background').setOrigin(0, 0);



	this.items.setDepth(1);


	let items = this.items.getChildren();


	for (let i = 0; i < items.length; i++) {

		let item = items[i];

		item.setInteractive();

		item.correctTween = this.tweens.add({
			targets: item,
			scaleX: 1.5,
			scaleY: 1.5,
			duration: 300,
			paused: true,
			yoyo: true,
			ease: 'Quad.easeInOut'

		});

		item.wrongTween = this.tweens.add({
			targets: item,
			scaleX: 1.5,
			scaleY: 1.5,
			duration: 300,
			angle: 90,
			paused: true,
			yoyo: true,
			ease: 'Quad.easeInOut'

		});

		item.alphaTween= this.tweens.add({
			targets: item,
			alpha: 0.7,
			duration: 200,
			paused: true,

		});




		item.on('pointerdown', function(pointer){

			let result = this.processAnswer(this.words[i].english);
			//item.resizeTween.restart();

			if (result){
				item.correctTween.restart();
			}
			else{
				item.wrongTween.restart();
			}

			this.showNextQuestion();

			//console.log('you clicked' + item.texture.key);
		}, this);


		item.on('pointerover', function(pointer){
			item.alphaTween.restart();

			
		}, this);

		item.on('pointerout', function(pointer){
			
			item.alphaTween.stop();
			item.alpha=1;
			
		}, this);


		this.words[i].sound = this.sound.add(this.words[i].key + 'Audio');


	}


	/*bg.on('pointerdown', function(pointer){
		console.log('click');
		console.log(pointer);

	});*/


	/*let soundSample = this.sound.add('correct');
	soundSample.play();*/
	/*soundSample.stop();
	soundSample.pause();
	soundSample.resume();*/


	this.wordText = this.add.text(30, 20, 'Hello', {
		font: '24px Open Sans',
		fill: '#ffffff'
	});
	this.scoreText = this.add.text(550, 20, 'score ' + this.score, {
		font: '24px Open Sans',
		fill: '#ffffff'
	});


	this.correctSound = this.sound.add('correct');
	this.wrongSound = this.sound.add('wrong');

	this.showNextQuestion();

};


gameScene.showNextQuestion = function(){

	this.nextWord = Phaser.Math.RND.pick(this.words);

	this.nextWord.sound.play();
	this.wordText.setText(this.nextWord.english);


		
};


gameScene.processAnswer = function(userResponse){
	if (userResponse == this.nextWord.english){

		this.score++;
		this.scoreText.setText('score ' + this.score);


		this.correctSound.play();

		return true;
	}
	else {

		this.score--;
		this.scoreText.setText('score ' + this.score);


		this.wrongSound.play();

		return false;
	}

}

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: 'english Learning Game',
  pixelArt: false,
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
