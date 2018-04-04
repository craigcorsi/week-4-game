/*

TO DO LIST:

-Obtain square png files
-Finish CSS style


*/

currentGame = {
    gameInProgress: true,
    inBattle: false,
    currentHealth: '',
    currentAttack: '',
    playerBaseAttack: '',
    currentOpponentHealth: '',
    currentOpponentAttack: '',

    characterAmethyst: {
        name: 'Amethyst',
        health: 140,
        attack: 8,
        counterAttack: 10,
        available: true
    },

    characterGarnet: {
        name: 'Garnet',
        health: 210,
        attack: 4,
        counterAttack: 20,
        available: true
    },

    characterPearl: {
        name: 'Pearl',
        health: 170,
        attack: 6,
        counterAttack: 15,
        available: true
    },

    characterSteven: {
        name: 'Steven',
        health: 90,
        attack: 15,
        counterAttack: 8,
        available: true
    },

    numberOfRemainingOpponents: 3,

    transferOpponent: function(name) {
        var myChar = $('#character' + name).parent();
        myChar.detach();
        myChar.appendTo('#placeOpponentsHere');
    },

    chooseCharacter: function(name) {
        // hide character selection menu
        $('#selectACharacter').hide();

        // place chosen character in stats panel
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

    chooseOpponent: function(name) {
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

    loseGame: function() {
        this.gameInProgress = false;
        $('#selectOppHeader').html('<p>YOU LOSE...</p>');
        $('#battleGround').hide();
    },

    winGame: function() {
        this.gameInProgress = false;
        $('#selectOppHeader').html('<p>YOU WIN!</p>');
        $('#battleGround').hide();
    },

    defeatOpponent: function(opponentName) {
        $('#currentOpponentGoesHere').empty();

        // Update stats, removing defeater opponents' stats
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

        this.numberOfRemainingOpponents -= 1;
        console.log(this.numberOfRemainingOpponents);

        // Win the game if no remaining characters
        if (this.numberOfRemainingOpponents == 0) {
            this.winGame();
        }
    },

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
