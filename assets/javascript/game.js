currentGame = {
    characterChosen: false,
    inBattle: false,

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

    playerCharacter: null,
    currentOpponent: null,

    transferOpponent: function(name) {
        var myChar = $('#character' + name).parent();
        myChar.detach();
        myChar.appendTo('#placeOpponentsHere');
    },

    chooseCharacter: function(name) {
        $('#selectACharacter').hide();
        var myChar = $('#character' + name);
        myChar.detach();
        myChar.appendTo('#placeYourCharacterHere');
        $('#removeOpponentsFromHere .character').each(function(){
            currentGame.transferOpponent(this.name);
        });
        currentGame.characterChosen = true;
        $('#selectAnOpponent').show();
    },

    chooseOpponent: function(name) {
        var myOpponent = $('#character' + name);
        myOpponent.parent().detach();
        myOpponent.appendTo('#currentOpponentGoesHere');


        // make the other opponents inaccessible until the battle is over
        currentGame.inBattle = true;
        $('#placeOpponentsHere .character').parent().css({
            'opacity': '0.3'
        });
    },

    loseGame: function() {

    },

    winGame: function() {
        $('#selectOppHeader').html('<p>YOU WIN!</p>');
    },

    defeatOpponent: function(opponentName) {
        $('#currentOpponentGoesHere').empty();
        // make the other opponents inaccessible until the battle is over
        currentGame.inBattle = false;
        $('#placeOpponentsHere .character').parent().css({
            'opacity': '1'
        });

        currentGame.numberOfRemainingOpponents -= 1;
        console.log(currentGame.numberOfRemainingOpponents);

        if (currentGame.numberOfRemainingOpponents == 0) {
            currentGame.winGame();
        }
    },

    attackOpponent: function(yourAtk, theirHealth, theirAtk, yourHealth) {

    }
}

$(document).ready(function() {
    /* Initial setting: hide the Opponent select screen */
    $('#selectAnOpponent').hide();


    $('#selectACharacter').on('click', '.character', function() {
        currentGame.chooseCharacter(this.name);
    });

    $('#selectAnOpponent').on('click', '.character', function() {
        if (currentGame.inBattle == false) {
            currentGame.chooseOpponent(this.name);
        }
    });

    $('#battleGround').on('click', '#buttonAttack', function() {
        currentGame.defeatOpponent($('#battleGround .character').name);
    });

});
