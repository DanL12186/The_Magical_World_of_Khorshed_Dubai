$(document).on('turbolinks:load', function() {
  'use strict';

  //waits to make sure Modernizr has fired and changed the DOM before determining WebP support
  const noWebPSupport = new Promise((resolve, _) => {
    setTimeout(() => {
      const unsupported = !!document.getElementsByClassName('no-webp').length
      resolve(unsupported);
    }, 100);
  });

  const openedBooks = {};

  /* Turn.js responsive book */
  function loadBook(bookId) {
    let fitInitialWindow,
        size;

    const book = document.getElementById(bookId)
    ,     format = book.getAttribute('data-format')
    ,     additionalHeight = () => format == 'single' ? size.height * 0.08 : 0
  
    const module = {
      //ratio should eventually be a book object property
      ratio: format == 'single' ? 1.535 : 2.62,
      init: () => {
        module.book = book;
        module.plugins();

        //properly size on the first click as modal is opened
        if (!fitInitialWindow) {
          size = module.resize();
          $(module.book).turn('size', size.width, size.height + additionalHeight());
          
          fitInitialWindow = true;
        }
        
        //after first click, on any future window resizing, update the book size
        $(window).on('resize', function() {
          size = module.resize();
          $(module.book).turn('size', size.width, size.height + additionalHeight());
        });
      },
      resize: function () {
        // reset the width and height to the css defaults
        this.book.style.width = '';
        this.book.style.height = '';

        //controls modal size
        let width  = document.body.clientWidth * 0.8,
            height = Math.round(width / this.ratio),
            padded = Math.round(window.innerHeight * 0.8);

        // if the height is too big for the window, constrain it
        if (height > padded) {
          height = padded;
          width  = Math.round(height * this.ratio);
        }

        // set the book width and height matching the aspect ratio
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
            width: null,
            height: null
        });
        
        // hide the body overflow
        document.body.className = 'hide-overflow';
      }
    };

    module.init(bookId);
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
  function loadImages(bookId) {
    const lazyPages = document.getElementsByClassName(`page lazy ${bookId}`)

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
  noWebPSupport.then(noWebP => {      
    if (noWebP) {
      changeStaticWebPToJPG()
    }
  });

  //when modal is clicked for the first time, load images, load book
  $("#pj-section-pic-1-div, #top-book-pic-1-div").on('click', function() {
    const bookId = this.getAttribute('data-bookname')
    
      if (!openedBooks[bookId]) {
        loadImages(bookId);
        loadBook(bookId);
        openedBooks[bookId] = true
      }
  })
})