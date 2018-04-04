/*

TO DO LIST:

-Finish CSS
-Board game

*/

currentGame = {
    // Status booleans to allow or block execution of DOM manipulation

    gameInProgress: true,
    inBattle: false,

    // Stats for the current battle

    currentHealth: '',
    currentAttack: '',
    playerBaseAttack: '',
    currentOpponentHealth: '',
    currentOpponentAttack: '',

    // Character stats reference

    characterAmethyst: {
        name: 'Amethyst',
        health: 120,
        attack: 8,
        counterAttack: 12
    },

    characterGarnet: {
        name: 'Garnet',
        health: 180,
        attack: 2,
        counterAttack: 25
    },

    characterPearl: {
        name: 'Pearl',
        health: 150,
        attack: 5,
        counterAttack: 20
    },

    characterSteven: {
        name: 'Steven',
        health: 100,
        attack: 15,
        counterAttack: 5
    },

    numberOfRemainingOpponents: 3,

    // DOM manipulation moving playable characters to the list of opponents
    transferOpponent: function(name) {
        var myChar = $('#character' + name).parent();
        myChar.detach();
        myChar.appendTo('#placeOpponentsHere');
    },

    // Select a fighter
    chooseCharacter: function(name) {
        // hide character selection menu
        $('#selectACharacter').hide();

        // DOM manipulation placing chosen character in stats panel
        var myChar = $('#character' + name);
        myChar.detach();
        myChar.appendTo('#placeYourCharacterHere');

        // set chosen character's health and attack power and update stats screen
        this.currentHealth = this['character' + name]['health'];
        this.currentAttack = this['character' + name]['attack'];
        this.playerBaseAttack = this['character' + name]['attack'];
        $('#currentHealth').html(this.currentHealth);
        $('#currentAttack').html(this.currentAttack);

        // place remaining characters into opponents menu
        $('#removeOpponentsFromHere .character').each(function(){
            currentGame.transferOpponent(this.name);
        });

        // show opponent selection menu
        $('#selectAnOpponent').show();
    },

    // Choose the next opponent when not in battle
    chooseOpponent: function(name) {
        // DOM manipulation moving opponent to the battlefield
        var myOpponent = $('#character' + name);
        myOpponent.parent().detach();
        myOpponent.appendTo('#currentOpponentGoesHere');
        $('#buttonAttack').show();

        // set chosen opponent's health and (counter) attack power and update stats screen
        this.currentOpponentHealth = this['character' + name]['health'];
        this.currentOpponentAttack = this['character' + name]['counterAttack'];
        $('#currentOpponentHealth').html(this.currentOpponentHealth);
        $('#currentOpponentAttack').html(this.currentOpponentAttack);

        // make the other opponents inaccessible until the battle is over
        this.inBattle = true;
        $('#placeOpponentsHere .character').parent().css({
            'opacity': '0.3'
        });
    },

    // Lose game displaying a simple 'you lose' screen
    loseGame: function() {
        this.gameInProgress = false;
        $('#selectOppHeader').html('<p>YOU LOSE...</p>').css({
            'font-size': '60px',
            'color': 'red'
        });
        $('#battleGround').hide();
    },

    // Win game displaying a simple 'you win' screen
    winGame: function() {
        this.gameInProgress = false;
        $('#selectOppHeader').html('<p>YOU WIN!</p>').css({
            'font-size': '60px',
            'color': 'purple'
        });
        $('#battleGround').hide();
    },

    // Defeat opponent: DOM manipulation removing opponent from battlefield; reset battle stats
    defeatOpponent: function(opponentName) {
        $('#currentOpponentGoesHere').empty();

        // Update stats, removing defeated opponents' stats
        this.currentOpponentHealth = '';
        this.currentOpponentAttack = '';
        $('#currentOpponentHealth').html('');
        $('#currentOpponentAttack').html('');

        // Make other playable characters fightable
        this.inBattle = false;
        $('#placeOpponentsHere .character').parent().css({
            'opacity': '1'
        });

        // hide the attack button
        $('#buttonAttack').hide();

        // update number of remaining opponents
        this.numberOfRemainingOpponents -= 1;
        console.log(this.numberOfRemainingOpponents);

        // Win the game if no remaining characters
        if (this.numberOfRemainingOpponents == 0) {
            this.winGame();
        }
    },

    // One round of attacks: player attacks opponent, then opponent attacks player
    attackOpponent: function(opponentName) {
        // Player attacks. Reduce opponent's Health
        this.currentOpponentHealth = Math.max(this.currentOpponentHealth - this.currentAttack, 0);
        $('#currentOpponentHealth').html(this.currentOpponentHealth);

        // Defeat opponent if opponent's health is 0
        if (this.currentOpponentHealth == 0) {
            this.defeatOpponent(opponentName);
        }

        // Increment your attack
        this.currentAttack += this.playerBaseAttack;
        $('#currentAttack').html(this.currentAttack);

        // Opponent attacks. Reduce player's health
        this.currentHealth = Math.max(this.currentHealth - this.currentOpponentAttack, 0);
        $('#currentHealth').html(this.currentHealth);

        // Lose game if player's health reaches 0.
        if (this.gameInProgress && this.currentHealth == 0) {
            this.loseGame();
        }

    }
}

$(document).ready(function() {
    /* Initial setting: hide the Opponent select screen */
    $('#selectAnOpponent').hide();

    // Initial character selection
    $('#selectACharacter').on('click', '.character', function() {
        currentGame.chooseCharacter(this.name);
    });

    // Opponent selection when not in battle
    $('#selectAnOpponent').on('click', '.character', function() {
        if (currentGame.inBattle == false) {
            currentGame.chooseOpponent(this.name);
        }
    });

    // Attacking opponent
    $('#battleGround').on('click', '#buttonAttack', function() {
        currentGame.attackOpponent($('#battleGround .character').name);
    });

});
