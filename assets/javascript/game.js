currentGame = {
    characterChosen: false,
    inBattle: false,

    characterAmethyst: {
        name: 'Amethyst',
        health: 140,
        attack: 8,
        counterAttack: 10,
        playerChoice: false,
        defeated: false
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

    remainingFighters: ['Amethyst', 'Garnet', 'Pearl', 'Steven'],

    playerCharacter: null,
    currentOpponent: null,

    chooseCharacter: function(name) {
        var myChar = $('#character' + name);
        myChar.detach();
        myChar.appendTo('#placeYourCharacterHere');
    },

    chooseOpponent: function(name) {

    },

    loseGame: function() {

    },

    winGame: function() {

    },

    defeatOpponent: function(opponentName) {

    },

    attackOpponent: function(yourAtk, theirHealth, theirAtk, yourHealth) {

    }
}

$('#characterAmethyst').on('click', function() {
    currentGame.chooseCharacter('Amethyst');
});

