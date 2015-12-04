

var Card = function(num) {
	var that = this;

	that.num = ko.observable(num);
	that.selected = ko.observable(false);
	that.select = function() {
		console.log(that.num() + " selected");
		that.selected(true);
	};
	that.unselect = function() {
		that.selected(false);
	};
};

var ViewModel = function() {
	var that = this;

	//this.cardArray = [];
	this.numberOfCards = 10;
	this.cards = ko.observableArray([]);

	for(var i=0; i<(this.numberOfCards/2); i++) {

		this.cards.push(new Card(i));
		this.cards.push(new Card(i));
	}

	this.checkSelected = function(card) {
		var cardsSelected = [];

		console.log(card);
		card.select();

		for(var i=0; i<that.cards().length; i++) {

			//console.log(that.cards()[i].selected());

			
			if(that.cards()[i].selected()) {
				cardsSelected.push(that.cards()[i].num());
			}

			/*
			if(cardsSelected.length == 1) {
				console.log('cardsSelected is ' + cardsSelected.length);
				break;
			}
			*/
		}

		if(cardsSelected.length < 2) {
			return false;
		}

		if(cardsSelected[0] === cardsSelected[1]) {
			console.log("matched");
			that.deSelectAll();
		} else {
			console.log("unmatched");
			that.deSelectAll();
		}
	};

	this.deSelectAll = function() {
		for(var i=0; i<that.cards().length; i++) {
			that.cards()[i].unselect();
		}
	};

};

ko.applyBindings(new ViewModel());