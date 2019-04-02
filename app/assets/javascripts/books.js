// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

//width = 2x each image width, since it's two pages for the full layout, height is just height, same as above ^

$(document).on('turbolinks:load', function() {

  if ($(".flipbook-single")[0]) {
    $(".flipbook-single").turn({
      width: 1520,
      height: 990,
      acceleration: true,
      duration: 1200
      //autoCenter: true
    });
  }

  if ($(".flipbook-double")[0]) {
    $(".flipbook-double").turn({
      width: 990,
      height: 380,
      acceleration: true,
      duration: 1400
    });
  };




  

  // $(".flipbook-double").on('click', function() {
  //   this.style.transition = '1.5s';
  //   this.style.height = '500px';
  //   this.style.width = '1200px';
  // })

})