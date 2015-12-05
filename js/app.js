

var Card = function(num, hexColor) {
	var that = this;

	that.num = ko.observable(num);
	that.color = hexColor;
	that.selected = ko.observable(false);
	that.select = function() {
		console.log(that.num() + " selected");
		that.selected(true);
	};
	that.unselect = function() {
		that.selected(false);
	};
};

var colors = ['#00f', '#f00', '#3c3', '#ff6', '#90c'];

var ViewModel = function() {
	var that = this;

	//this.cardArray = [];
	this.numberOfCards = 10;
	this.cards = ko.observableArray([]);

	for(var i=0; i<(this.numberOfCards/2); i++) {

		this.cards.push(new Card(i, colors[i]));
		this.cards.push(new Card(i, colors[i]));
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

		}

		if(cardsSelected.length > 2) {
			that.deSelectAll();
		}

		if(cardsSelected.length < 2) {
			return false;
		}

		if(cardsSelected[0] === cardsSelected[1]) {
			console.log("matched");
			setTimeout(function(){
				that.deSelectAll();
			}, 1000);
		} else {
			console.log("unmatched");
			setTimeout(function(){
				that.deSelectAll();
			}, 1000);
		}
	};

	this.deSelectAll = function() {
		for(var i=0; i<that.cards().length; i++) {
			that.cards()[i].unselect();
		}
	};

};

ko.applyBindings(new ViewModel());