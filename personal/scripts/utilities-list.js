(function(window, document){

    console.log("Utilities list RUN");


    var UtilitiesList = function (elem, config, callback) {

        this.config = {
            speed: 3000, //milliseconds
            reverse: false, // from last to first
            activeCLass: 'active',
            activeElement: '.utilities-item',
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

    UtilitiesList.prototype.callback = function(element) {};

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
            self.setActive(targetElem);

            clearInterval(self.interval);
        }
        function getNext() {
            return self._getOffsetElement(self.config.reverse);
        }

        self.interval = setInterval(function () {
            self.setActive(getNext());
        }, self.config.speed)
    };
    UtilitiesList.prototype.setActive = function (targetElem) {
        var self = this;

        if (typeof targetElem === 'undefined') return false;
        if (targetElem.hasClass(self.config.activeClass)) return;

        var activeElements = self.element.querySelectorAll('.'+self.config.activeCLass);
        var prevActive = activeElements[0];

        for (var i = 0, l = activeElements.length; i<l; i++) activeElements[i].removeClass(self.config.activeCLass);
        targetElem.addClass(self.config.activeCLass);
        self.callback(targetElem, prevActive);
    };

    UtilitiesList.prototype._getOffsetElement = function (reverse) {
        var activeElement,
            items,
            idx,
            nextIdx,
            self = this;

        activeElement = self.element.querySelector('.'+self.config.activeCLass);

        items = self.elements;
        idx = items.indexOf(activeElement);
        var lenItems = items.length;
        nextIdx = idx;
        nextIdx += (reverse) ? -1 : 1;

        nextIdx = (nextIdx > lenItems-1) ? 0: nextIdx;
        nextIdx = (nextIdx < 0) ? lenItems-1: nextIdx;

        return items[nextIdx];
    };

    UtilitiesList.prototype.next = function () {
        this.setActive(this._getOffsetElement(false));
        clearInterval(this.interval);
    };

    UtilitiesList.prototype.prev = function () {
        this.setActive(this._getOffsetElement(true));
        clearInterval(this.interval);
    };  

    window.UtilitiesList = UtilitiesList;
}(window, document));