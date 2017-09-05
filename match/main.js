$(document).ready(function (){
    randomize_cards();
    $('.card').on('click', cardClicked);
    $('button').on('click', resetGame);
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = null;
var games_played = 0;

function randomize_cards(){
  var parent = $('.card-container');
  var cards = parent.children();
  while (cards.length){
    parent.append(cards.splice(Math.floor(Math.random()*cards.length),1)[0]);
  }
}
function cardClicked() {

    $(this).find('.back').addClass('hidden');
    if (first_card_clicked === null) {
        first_card_clicked = this;
        return;
    } else {
        second_card_clicked = this;
        if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')) {
            match_counter++;
            matches++;

            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                alert("Winner Winner Chicken Dinner!!!");
            }
        }
        else {
            setTimeout(function () {
                $(first_card_clicked).find('.back').removeClass('hidden');
                $(second_card_clicked).find('.back').removeClass('hidden');
                first_card_clicked = null;
                second_card_clicked = null;
            }, 1000);
        }
        attempts++;
        accuracy = (Math.round(matches/attempts*100));
        display_stats();
    }
}
function display_stats(){
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function resetGame() {
    setTimeout(function() {
        $('.card').find('.back').removeClass('hidden');
        games_played++;
        reset_stats();
    }, 500);
}
