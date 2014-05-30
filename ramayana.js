

PlayerState = {
    Idle: 0,
    Jumping: 1,
    Moving: 2
};

var gameWidth = 800;
var gameHeight = 600;
var groundHeight = 64;
var platforms;
var player;
var ground;
var playerState = PlayerState.Idle;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '',
			   {
			       preload: preload,
			       create: create,
			       update: update
			   });


function preload() {
    game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('rama', 'images/ramaSprite.png', 96, 150);
}

function create() {
    getCamera();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    
    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(0, game.world.height-groundHeight,
				  'ground');
    ground.body.immovable = true;
    ground.scale.setTo(2,2);
    
    player = game.add.sprite(32, game.world.height-500, 'rama');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;

    player.animations.add('right', [4, 5, 6, 7, 8, 9], 10, true);
}

function updateJumping() {
    player.animations.stop();
    player.frame=1;
}

function updateGrounded() {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
	player.body.velocity.x = -150;
	player.animations.play('right');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 0;
    }

    if (cursors.up.isDown) {
        player.body.velocity.y = -350;
    }
}

function debug(msg) {
    var d = document.getElementById('debug');
    d.textContent = msg;
}

function update() {

    game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();
    debug(player.body.velocity.y);
    
    if (Math.abs(player.body.velocity.y) > 2 || (!player.body.touching.down))  {
	updateJumping();
    } else {
	updateGrounded();
    }
    
    
}


function getCamera() {
    navigator.webkitGetUserMedia(
	{audio: true, video: true}, 
	function(stream) {
	    document.querySelector('video').src = 
		webkitURL.createObjectURL(stream);
	}, function(e) {
	    console.error(e);
	});
}

