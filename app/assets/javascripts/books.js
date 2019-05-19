$(document).on('turbolinks:load', function() {
  let clicked,
      size;

  //waiting to make sure Modernizr has fired and changed the DOM
  const noWebPSupport = new Promise((resolve, _) => {
    setTimeout(() => {
      const unsupported = !!document.getElementsByClassName('no-webp').length
      resolve(unsupported);
    }, 100);
  });

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

  //changes webp => jpeg, although also gets rid of fingerprinting
  function changeStaticWebPToJPG() {
    const staticImages = document.getElementsByClassName('static-img-js')

    for (let i = 0; i < staticImages.length; i++) {
      const page = staticImages[i]
      page.src = page.src.replace(/webp/g, 'jpg').replace(/-[^\.jpg]+/, '')
    }
  }

  //this is an imperfect solution, as fingerprinting is bypassed completely, even for webp images
  function loadImages() {
    const lazyPages = document.getElementsByClassName('page lazy')

    //load middle pages (2 through n-3)
    for (let i = 0; i < lazyPages.length; i++) {
      const page = lazyPages[i]
      ,     imageLink = `/assets/${page.getAttribute('image_placeholder')}`
      
      noWebPSupport.then(noWebP => {
        page.src = noWebP ? imageLink.replace(/webp/g, 'jpg') : imageLink
      })
    };
  }
   
  //change all non-CSS, non-lazy images to JPEG if browser doesn't support WebP
  noWebPSupport.then(function(noWebP) {      
    if (noWebP) {
      changeStaticWebPToJPG()
    }
  });

  //when modal is clicked for the first time, load images, load book
  $("#pj-section-pic-1-div").on('click', function() {
    if (!clicked) {
      
      loadImages(); 
      loadBook();
      
      clicked = true;
    }
  })
})