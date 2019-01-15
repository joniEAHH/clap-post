var clickVote = document.querySelectorAll('.user-vote-js');
var voteCount = document.querySelectorAll(".vote-count-js");
var voteText = document.querySelectorAll(".vote-text-js");


var clicks = 0;
var quickAdd;

function mouseUp() {
    quickAdd = setTimeout(doSetTimeout, 2500);
}

function mouseDown() {
    clearTimeout(quickAdd);
}

function doSetTimeout(i) {
    for (var i = 0; i < voteCount.length; i++) {
        voteCount[i].classList.remove("is-active");
        voteText[i].classList.remove("hidden");
    }
}

for (var i = 0; i < clickVote.length; i++) {

    var self = clickVote[i];

    self.addEventListener('click', function (event) {
        // prevent browser's default action
        event.preventDefault();

        // call your awesome function here
        userVote(this); // 'this' refers to the current button on for loop

    }, false);
}




function userVote() {

    clicks++;
    for (var i = 0; i < voteCount.length; i++) {
        if (clicks <= 50) {
            //console.log(voteCount[i]);
            voteCount[i].innerHTML = "+" + clicks;
        }

        // removing the class
        clickVote[i].classList.remove("click-vote--animation");
        // re-adding the class
        void clickVote[i].offsetWidth;
        clickVote[i].classList.add("click-vote--animation");
        clickVote[i].classList.add("is-active");

        // hide vote text on click
        voteText[i].classList.add("hidden");
        // show vote counter after cick
        voteCount[i].classList.add("is-active");

    }




}



var voteCounter = document.querySelectorAll(".vote-counter-js");

jQuery(clickVote).on("click", function (e) {

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

                jQuery(voteCounter).each(function () {
                    jQuery(this).html(response.vote_count);
                });

                //  console.log(response);
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