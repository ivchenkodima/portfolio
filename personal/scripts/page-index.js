(function(w, d) {

    console.info("Page index script has launched");

    var utilitiesList = new UtilitiesList('#myUtilities', {
        reverse: false,
        activeClass: 'active',
        activeElement: 'dt'
    }, function(item) {
        // console.log(item.nextElementSibling);
    });

    var slider = new UtilitiesList('#sliderIndicators', {
        activeElement: '.slider-indicator-item'
    }, function (item, prevItem) {
        var elID = item.getAttribute('data-item-indicator');
        var scontainerActive = document.querySelectorAll('#sliderContainer .active');
        for (var i =0, l = scontainerActive.length; i<l; i++) scontainerActive[i].removeClass('active');

        var newActiveEl = document.getElementById(elID);
        newActiveEl.addClass('active');
    });

    var nextEl = document.getElementById('sliderNextPage');
    nextEl.addEventListener('click', function() {
        slider.next();
    });

    var prevEl = document.getElementById('sliderPrevPage');
    prevEl.addEventListener('click', function() {
        slider.prev();
    });
    
    var validDir = new ValidationDirective();

//    var menuList = new UtilitiesList('#menuList');


}(window, document));