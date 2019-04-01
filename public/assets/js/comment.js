$(function(){
  $(".subBtn").on("click", function(e) {
    e.preventDefault();
    let message = $("#commentMessage").val().trim();
    let artId = $(this).attr("data-which");
    let sendObj = {
      message: message,
      articleId: artId
    }
    if (message) {
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
})