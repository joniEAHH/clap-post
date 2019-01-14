
var clickVote = document.querySelectorAll('.user-vote-js');
var voteCounter = document.querySelectorAll(".vote-counter-js");
var voteCount = document.querySelectorAll(".vote-count-js");
var voteText = document.querySelectorAll(".vote-text-js");


var clicks = 0;



for (var i = 0; i < clickVote.length; i++) {

    var self = clickVote[i];

    self.addEventListener('click', function (event) {  
        // prevent browser's default action
        event.preventDefault();

        // call your awesome function here
        userVote(this); // 'this' refers to the current button on for loop
    }, false);
}

   
 function userVote(index)   {

        clicks++;
    
        if (clicks <= 50) {
            for (var i=0; i<voteCount.length; i++) {
                console.log(voteCount[i]);
                voteCount[i].innerHTML = "+"+clicks;

            }
        }       
    
      
        // re-adding the class
        for (var i=0; i<clickVote.length; i++) {
              // removing the class
            clickVote[i].classList.remove("click-vote--animation");
             // re-adding the class
            void clickVote[i].offsetWidth;
            clickVote[i].classList.add("click-vote--animation");
            clickVote[i].classList.add("is-active");
             // hide vote text on click
             voteCount[i].classList.remove("is-active");
            // show vote counter after cick
            voteText[i].classList.add("hidden");
            
        }
 
    
        
   

        setTimeout(function(){
            for (var i=0; i<voteCount.length; i++) {
                voteCount[i].classList.remove("is-active");
            }
            for (var i=0; i<voteText.length; i++) {
                voteText[i].classList.remove("hidden");
            }
       },2000);

        for (var i=0; i<voteCount.length; i++) {
            voteCount[i].classList.add("is-active");
        }
        
    }

    jQuery(".user-vote-js").on( "click", function(e) {
       
       e.preventDefault(); 
      
       post_id = jQuery(this).attr("data-post_id")
       nonce = jQuery(this).attr("data-nonce")
   
       jQuery.ajax({
          type : "post",
          dataType : "json",
          url : myAjax.ajaxurl,
          data : {action: "user_vote", post_id : post_id, nonce: nonce},
          success: function(response) {
             if(response.type == "success") {
              
                jQuery(voteCounter).each(function() {
                    jQuery(this).html(response.vote_count);
                 });

                console.log(response);
             }
             else {
                console.log(response);
             }
          }
       })   
 
    })

    



