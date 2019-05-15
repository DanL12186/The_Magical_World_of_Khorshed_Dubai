$(document).on('turbolinks:load', function() {
  let clicked,
      size;

  /* Turn.js responsive book */
  function loadBook() {
    'use strict';
    const module = {
      ratio: 2.62,
      init: id => {
        module.el = document.getElementById(id);
        module.resize();
        module.plugins();

        // on window resize, update the plugin size
        $(window).on('resize', function() {
          size = module.resize();
          $(module.el).turn('size', size.width, size.height);
        });
      },
      resize: function () {
        // reset the width and height to the css defaults
        this.el.style.width = '';
        this.el.style.height = '';

        let width  = this.el.clientWidth,
            height = Math.round(width / this.ratio),
            padded = Math.round(document.body.clientHeight * 0.9);

        // if the height is too big for the window, constrain it
        if (height > padded) {
          height = padded;
          width  = Math.round(height * this.ratio);
        }

        // set the width and height matching the aspect ratio
        this.el.style.width = `${width}px`
        this.el.style.height = `${height}px`

        return {
          width: width,
          height: height
        };
      },
      plugins: function () {
        // run the plugin
        $(this.el).turn({
            gradients: true,
            acceleration: true,
            duration: 1400,
            width: 990,
            height: 380
        });
        // hide the body overflow
        document.body.className = 'hide-overflow';
      }
    };

    module.init('book');
  };

  //when modal is clicked for the first time, load images, load book
  $("#pj-section-pic-1-div").on('click', function() {
    if (!clicked) {      
      const lazyPages = document.getElementsByClassName('page lazy')

      for (let i = 0; i < lazyPages.length; i++) {
        const page = lazyPages[i]
        ,     imageLink = `/assets/${page.getAttribute('image_placeholder')}`
        
        page.src = imageLink
      }

      loadBook();
      
      clicked = true;
    }
  })
})