(function(window, document){

    console.log("Slider-container list RUN");


    var SliderLiSt = function (elem, config, callback) {

        this.config = {
            speed: 20, //milliseconds
            reverse: false, // from last to first
            activeCLass: 'active',
            activeElement: '.slider-container',
            event: 'click'
        };

        if (typeof elem == 'undefined') throw new TypeError("Element selector is undefined");

        if (typeof config !== 'undefined' && config !== null) {
            if (typeof config.speed != 'undefined') this.config.speed =  config.speed;
            if (typeof config.reverse != 'undefined') this.config.reverse =  config.reverse;
            if (typeof config.activeCLass != 'undefined') this.config.activeCLass =  config.activeCLass;
            if (typeof config.activeElement != 'undefined') this.config.activeElement =  config.activeElement;
            if (typeof config.event != 'undefined' && ['click', 'mouseover'].indexOf(config.event) > -1) this.config.event =  config.event;
        }
        if (typeof callback === 'function') this.callback = callback;

        var $elem = document.querySelector(elem);
        if ($elem == 'undefined') throw new TypeError("Element with selector was not found on the page");

        this.element = $elem;

        this.init();
    };

    // UtilitiesList.prototype.callback = function(element) {};

    UtilitiesList.prototype.init = function() {

        var self,
            itemsTitle;

        self = this;
        itemsTitle = self.element.querySelectorAll(self.config.activeElement);
        var elements = [];

        for (var i = 0, l = itemsTitle.length; i< l; i++) {
            elements.push(itemsTitle[i]);
            itemsTitle[i].addEventListener(self.config.event, clickCallback);
        }
        this.elements = elements;

        function clickCallback (event) {
            var targetElem = event.srcElement || event.originTarget || event.target;
            setActive(targetElem);

            clearInterval(self.interval);
        }
        function setActive(targetElem) {

            if (typeof targetElem === 'undefined') return false;
            if (targetElem.hasClass(self.config.activeClass)) return;
            var activeElements = self.element.querySelectorAll('.'+self.config.activeCLass);
            for (var i = 0, l = activeElements.length; i<l; i++) 
                activeElements[i].removeClass(self.config.activeCLass);

            targetElem.addClass(self.config.activeCLass);
            // self.callback(targetElem);
        }
        function getNext() {
            var activeElement,
                items,
                idx,
                nextIdx;

            activeElement = self.element.querySelector('.'+self.config.activeCLass);

            items = self.elements;
            idx = items.indexOf(activeElement);
            var lenItems = items.length;
            nextIdx = idx;
            nextIdx += (self.config.reverse) ? -1 : 1;

            nextIdx = (nextIdx > lenItems-1) ? 0: nextIdx;
            nextIdx = (nextIdx < 0) ? lenItems-1: nextIdx;

            return items[nextIdx];
        }

        self.interval = setInterval(function () {
            setActive(getNext());
        }, self.config.speed)
    };

    Node.prototype.hasClass = function (className) {
        if (this.classList) {
            return this.classList.contains(className);
        } else {
            return (-1 < this.className.indexOf(className));
        }
    };

    Node.prototype.addClass = function (className) {
        if (this.classList) {
            this.classList.add(className);
        } else if (!this.hasClass(className)) {
            var classes = this.className.split(" ");
            classes.push(className);
            this.className = classes.join(" ");
        }
        return this;
    };

    Node.prototype.removeClass = function (className) {
        if (this.classList) {
            this.classList.remove(className);
        } else {
            var classes = this.className.split(" ");
            classes.splice(classes.indexOf(className), 1);
            this.className = classes.join(" ");
        }
        return this;
    };

    window.SliderLiSt = SliderLiSt;
}(window, document));