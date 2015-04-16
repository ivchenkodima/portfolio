(function(win, d) {
	
	// Паттерн Стратегия. 
	function Validator (validation) {
	    var self = this;
	    if (typeof validation !== 'undefined') this.validation = validation;
	}
	Validator.prototype.test = function (data) {
	    return this.validation(data);
	}
	Validator.prototype.validation = function (data) {
	    throw new TypeError("Must be declarated");
	}

	win.Validator = Validator;

	// Паттерн Фабрика
	function ValidatorFactory (type) {
		return new Validator(this._callbackByType(type));
	}
	ValidatorFactory.prototype._callbackByType = function (type) {
		var validationFunc;
		switch (type) {
			case 'cardNumber':
				validationFunc = validateCardNumber;
				break;
			case 'email':
				validationFunc = validateEmail;
				break;
			case 'phone':
				validationFunc = validatePhone;
				break;
			case 'name':
				validationFunc = validateName;
				break;
			default: 
				throw new TypeError("Wrong validation type");
		}
		return validationFunc;
	};

	function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 
    function validatePhone(phone) {
    	var re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        // var re = /(?<!\w)(?:(?:(?:(?:\+?3)?8\W{0,5})?0\W{0,5})?[34569]\s?\d[^\w,;(\+]{0,5})?\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d(?!(\W?\d))\x/;
        return re.test(phone);
    }
    function validateCardNumber(cardNumber) {
    	// var re = /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[12345][0-9]{14}|3[47][0-9]{13}|3(?:0[012345]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35[0-9]{3})[0-9]{11})\b/;
        var re = /[0-9]{13,16}$/;
        return re.test(cardNumber);
    }
    function validateName(name) {
    	var re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    	return re.test(name);
    }

    win.ValidatorFactory = ValidatorFactory;

    function ValidationDirective () {

    	var elements = d.querySelectorAll('[data-validation]');
    	var arr = [];
    	var el, elValidType, elValidEvent;

    	var validators;
		
    	validators = {
    		email: new ValidatorFactory('email'),
    		phone: new ValidatorFactory('phone'),
    		cardNumber: new ValidatorFactory('cardNumber'),
    		name: new ValidatorFactory('name')
    	};

    	for (var i = 0, l = elements.length; i<l; i++) {
    		el = elements[i];
    		if (typeof el === 'undefined' || el == null) continue;

    		elValidType = el.getAttribute('data-validation');
    		elValidEvent = el.getAttribute('data-validation-event') || 'change';

    		addValidationToElement(el, elValidType, elValidEvent);
    		arr.push(el);
    	}

    	function addValidationToElement (elementValidation, typeValidation, eventValidation) {
    		var validator;
		    try {
		    	if (typeof validators == 'undefined') throw "Undefined validators dict";
		    	validator = validators[typeValidation];
		    	if (typeof validator === 'undefined') throw "Not found validator with target type";
		    	if (typeof elementValidation === 'undefined') throw "Undefined validation element";		    	
			    if (typeof eventValidation === 'undefined') throw "Undefined validation event";

		    	elementValidation.addEventListener(eventValidation, validationCallback(validator));
		    } catch (e) {
		    	console.warn("addValidationToElement:: error", e, typeValidation, elementValidation, eventValidation);
		    }
    	}

    	function validationCallback (validator) {
    		return function (event) {
    			var targetEl = event.srcElement || event.target;
			    var newValue = targetEl.value;
			    var valid = validator.test(newValue);
			    
			    targetEl.removeClass('invalid');
			    targetEl.removeClass('valid');

			    if (valid) targetEl.addClass('valid');
			    else targetEl.addClass('invalid');
    		};
    	}
    }

    win.ValidationDirective = ValidationDirective;

}(window, document))