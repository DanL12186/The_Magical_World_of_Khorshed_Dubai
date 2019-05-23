$(document).on('turbolinks:load', function() {
  let clicked,
      size;

  //waiting to make sure Modernizr has fired and changed the DOM before determining if browser supports WebP
  const noWebPSupport = new Promise((resolve, _) => {
    setTimeout(() => {
      const unsupported = !!document.getElementsByClassName('no-webp').length
      resolve(unsupported);
    }, 100);
  });

  /* Turn.js responsive book */
  function loadBook() {
    'use strict';
    let fitInitialWindow;

    const module = {
      ratio: 2.62,
      init: id => {
        module.book = document.getElementById(id);
        
        module.plugins();

        //resize on the first click, timed immediately after module is opened
        if (!fitInitialWindow) {
          size = module.resize();
          $(module.book).turn('size', size.width, size.height);
          fitInitialWindow = true;
        }
        
        //after first click, on any future window resizing, update the plugin size
        $(window).on('resize', function() {
          size = module.resize();
          $(module.book).turn('size', size.width, size.height);
        });
      },
      resize: function () {
        // reset the width and height to the css defaults
        this.book.style.width = '';
        this.book.style.height = '';

        let width  = document.body.clientWidth * 0.8,
            height = Math.round(width / this.ratio);

        // set the width and height matching the aspect ratio
        this.book.style.width = `${width}px`
        this.book.style.height = `${height}px`

        return {
          width: width,
          height: height
        };
      },
      plugins: function () {
        $(this.book).turn({
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