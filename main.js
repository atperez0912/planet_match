$(document).ready(function (){
    display_instructions();
    randomize_cards();
    $('.card').on('click', cardClicked);
    $('.new').on('click', resetGame);
    $('[data-popup-open]').on('click', display_instructions);
    $('[data-popup-close]').on('click', close_instructions);
    $('[data-popup-win]').on('click', display_win);
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = null;
var games_played = 0;


function display_instructions(){
     var targeted_popup_class = $(this).attr('data-popup-open');
     $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
 }

function display_win(){
    var targeted_popup_class = $(this).attr('data-popup-win');
    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
}
 //----- CLOSE
  function close_instructions(){
     var targeted_popup_class = $(this).attr('data-popup-close');
     $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
 }

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
    }  else if(first_card_clicked == this){
        return;
      }
        else {
         second_card_clicked = this;
         if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')) {
            match_counter++;
            matches++;

            $(first_card_clicked).addClass("click_remove");
            $(second_card_clicked).addClass("click_remove");

            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                  $('[data-popup-win]').trigger('click');
            }
        }
        else {
            setTimeout(function () {
                $(first_card_clicked).find('.back').removeClass('hidden');
                $(second_card_clicked).find('.back').removeClass('hidden');
                first_card_clicked = null;
                second_card_clicked = null;
            }, 500);
        }
        attempts++;
        accuracy = (Math.round(matches/attempts*100));
        display_stats();
    }
}
function display_stats(){
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy+"%");
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
    randomize_cards();
}

function resetGame() {
    setTimeout(function() {
        $('.card').find('.back').removeClass('hidden');
        $('div').removeClass('click_remove');
        games_played++;
        reset_stats();
    }, 500);
}
