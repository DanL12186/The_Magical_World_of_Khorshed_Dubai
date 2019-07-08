'use strict';

document.addEventListener('turbolinks:load', function() {
  const openedBooks = {};

  //changes all initially-loaded images from webp => jpeg, although also gets rid of fingerprinting
  const changeStaticWebPToJPG = () => {
    const staticImages = document.getElementsByClassName('static-img-js')

    for (let i = 0; i < staticImages.length; i++) {
      const page = staticImages[i]
      page.src = page.src.replace(/webp/g, 'jpg').replace(/-[^\.jpg]+/, '')
    }
  }
  
  //waits to make sure Modernizr has fired and changed the DOM before determining WebP support
  const noWebPSupport = new Promise(resolve => {
    setTimeout(() => {
      const unsupported = !!document.getElementsByClassName('no-webp').length
      resolve(unsupported);
    }, 150);
  });

  //changes all non-CSS, non-lazy images to JPEG if browser lacks WebP support
  noWebPSupport.then(noWebP => {      
    if (noWebP) {
      changeStaticWebPToJPG()
    }
  });

  //load book's '.page lazy' images (pages 2 through n-3) on modal click, switching to JPEG if necessary depending on WebP support status 
  //imperfect solution, as fingerprinting is bypassed completely, even for webp due to lack of rails image_tag
  const loadImages = bookId => {
    const lazyPages = document.getElementsByClassName(`page lazy ${bookId}`)

    for (let i = 0; i < lazyPages.length; i++) {
      const page = lazyPages[i],
            imageLink = `/assets/${page.getAttribute('image_placeholder')}`
      
      //Convert .lazy WebP -> JPEG if browser doesn't support WebP
      noWebPSupport.then(noWebP => {
        page.src = noWebP ? imageLink.replace(/webp/g, 'jpg') : imageLink
      })
    };
  }
   
  /* Load turn.js responsive book */
  const loadBook = bookId => {
    let fitInitialWindow,
        size;

    const book = document.getElementById(bookId),
          format = book.getAttribute('data-format'),
          pageWidth = book.getAttribute('data-width'),
          pageHeight = book.getAttribute('data-height'),
          additionalHeight = () => format == 'single' ? size.height * 0.08 : 0;

    const setBookAndModal = () => {
      size = modal.resize();
      $(modal.book).turn('size', size.width, size.height + additionalHeight());
    };
    
    //JS object representing the modal, containing the book and its properties + relevant functions
    const modal = {
      ratio: format == 'single' ? 1.54 : pageWidth * 2 / pageHeight,
      
      init: function() {
        this.book = book;
        this.plugins();

        //properly size on the first click as modal is opened
        if (!fitInitialWindow) {
          setBookAndModal();
          fitInitialWindow = true;
        }
        
        //after first click, on any future window resizing, update the book size
        window.addEventListener('resize', ()=> setBookAndModal());
      },
      //gets new size requirements for modal and sets book size
      resize: function () {
        let width  = window.innerWidth * 0.8,
            height = Math.round(width / this.ratio),
            padded = Math.round(window.innerHeight * 0.75);

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
      //width and height will be set later by init/resize
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

    modal.init();
  };

  //when modal is clicked for the first time, load images, load book
  $("#pj-section-pic-1-div, #pj-section-pic-2-div, #top-book-pic-1-div").on('click', function() {
    const bookId = this.getAttribute('data-bookname')
  
    if (!openedBooks[bookId]) {
      loadImages(bookId);
      loadBook(bookId);
      openedBooks[bookId] = true
    }

    if (window.matchMedia("(orientation: portrait)").matches) {
      window.setTimeout(() => {
        alert('Rotate your screen for a better view!')
      }, 500);
    }
  })
});