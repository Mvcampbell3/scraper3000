$(function(){
  $(".delBtn").on("click", function(){
    $.ajax("/article/"+$(this).attr("data-id"), {
      type: "DELETE"
    }).then(result => {
      console.log(result);
      location.reload();
    })
  })
})