$(function(){
  $(".subBtn").on("click", function(e) {
    e.preventDefault();

    let message = $("#commentMessage").val().trim();
    let username = $("#commentUsername").val().trim();
    let artId = $(this).attr("data-which");

    let sendObj = {
      message: message,
      username: username,
      articleId: artId
    }
    
    if (message && username) {
      $.ajax("/comment/"+artId, {
        type: "POST",
        data: sendObj
      }).then(result => {
        console.log(result);
        location.reload();
      })
    } else {
      alert("Please enter message")
    }
    
  })

  $(".delBtn").on("click", function() {
    $.ajax("/comment/"+$(this).attr("data-id"), {
      type: "DELETE"
    }).then(result => {
      console.log(result);
      location.reload();
    })
  })
})