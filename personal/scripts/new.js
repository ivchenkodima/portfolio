$(document).ready(function (){

	var config = {
		baseDom: '.utilities-list',
		activeClassName: 'active',
		repeatInterval: 1500,
		callbackShow: function() {},
		callbackOver: function(idx) {}
	};

	var $baseEl = $(config.baseDom).children('dd');
	var infoLen = $baseEl.size();

	$baseEl.on('mouseover', function() {
		var idx = $baseEl.index($this);
		showIndex(idx);
		config.callbackOver(idx);
	});

	setInterval(function() {
		nextInfoShow();
		config.callbackShow();
	}, config.repeatInterval);

	function showIndex (idx) {
		$baseEl.removeClass(config.activeClassName);
		$baseEl.eq(idx).addClass(config.activeClassName);
	}
	function getCurrentActiveIdx () {
		var activeDD = $baseEl.find('.'+config.activeClassName);
		return $baseEl.index(activeDD) || 0;
	}
	function nextInfoShow () {
		// get index of active dd
		var curIndx = getCurrentActiveIdx(),
			nextIdx = null;
		nextIdx = (curIndx == infoLen-1) ? 0: curIndx + 1;
		return showIndex(nextIdx);
	}
	function prevInfoShow () {
		// get index of active dd
		var curIndx = getCurrentActiveIdx(),
			prevIdx = null;
		prevIdx = (curIndx == 0) ? infoLen-1: curIndx + 1;
		return showIndex(prevIdx);
	}
});