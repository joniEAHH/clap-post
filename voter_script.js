
var voteBlock = document.querySelectorAll('.vote--block');

var buttonVote = document.querySelectorAll('.vote__button--click');
var votes = document.querySelectorAll(".vote__number--count");
var voteCountVotes = document.querySelectorAll(".vote__number--count-votes");


var clicks = 0;
var quickAdd;

function mouseUp() {
    quickAdd = setTimeout(doSetTimeout, 2500);
}

function mouseDown() {
    clearTimeout(quickAdd);
}

function doSetTimeout(i) {
    for (var i = 0; i < voteCountVotes.length; i++) {
        voteCountVotes[i].classList.remove("is-active");
        votes[i].classList.remove("is-disabled");
    }
}

for (var i = 0; i < buttonVote.length; i++) {

    var self = buttonVote[i];

    self.addEventListener('click', function (event) {
        // prevent browser's default action
        event.preventDefault();

        // call your awesome function here
        userVote(this); // 'this' refers to the current button on for loop

    }, false);
}




function userVote() {

    clicks++;
    for (var i = 0; i < voteCountVotes.length; i++) {
        if (clicks <= 50) {
            //console.log(voteCountVotes[i]);
            voteCountVotes[i].innerHTML = "+" + clicks;
        }

        // removing the class
        buttonVote[i].classList.remove("vote-button--animation");
        // re-adding the class
        void buttonVote[i].offsetWidth;
        buttonVote[i].classList.add("vote-button--animation");
        buttonVote[i].classList.add("is-active");

        // hide vote text on click
        votes[i].classList.add("is-disabled");
        // show vote counter after cick
        voteCountVotes[i].classList.add("is-active");

    }
}





jQuery(buttonVote).on("click", function (e) {

    e.preventDefault();

    if (clicks < 50) {
 
    post_id = jQuery(this).attr("data-post_id")
    nonce = jQuery(this).attr("data-nonce")

    jQuery.ajax({
        type: "post",
        dataType: "json",
        url: myAjax.ajaxurl,
        data: {
            action: "user_vote",
            post_id: post_id,
            nonce: nonce
        },
        success: function (response) {
            if (response.type == "success") {

                jQuery(votes).each(function () {
                    jQuery(this).html(response.vote_count + ' votos');
                });
                
            } else {
                console.log(response);
            }
        }
    })

   
 }  else {
    console.log("stop");
    return false;
 }


})