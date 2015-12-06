

var Card = function(num, hexColor, iconSelected) {
	var that = this;

	that.num = ko.observable(num);
	that.color = hexColor;
	that.icon = iconSelected;
	that.selected = ko.observable(false);
	that.select = function() {
		//console.log(that.num() + " selected");
		that.selected(true);
	};
	that.unselect = function() {
		that.selected(false);
	};
};

var colors = ['#00f', '#f00', '#3c3', '#aa0', '#90c', '#ef00ff', '#000', '#070'];
var icons = [
	'fa fa-heart',
	'fa fa-star',
	'fa fa-bolt',
	'fa fa-key',
	'fa fa-cog',
	'fa fa-wrench',
	'fa fa-moon-o',
	'fa fa-tree',
	'fa fa-music',
	'fa fa-coffee',
	'fa fa-puzzle-piece',
	'fa fa-rocket',
	'fa fa-leaf',
	'fa fa-bell',
	'fa fa-beer',
	'fa fa-diamond',
	'fa fa-shield',
	'fa fa-cloud',
	'fa fa-tint',
	'fa fa-flask'
];

function test(n) {
	for(var i=0; i<n; i++) {
		console.log(colors[i%colors.length]);
	}
}

// Fisher-Yates Shuffle Algorithm
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var ViewModel = function() {
	var that = this;

	this.numberOfCards = 52;
	this.cards = ko.observableArray([]);

	for(var i=0; i<(this.numberOfCards/2); i++) {
		// If there are more than 20 pairs, randomize the colors to prevent doubles
		if(i%20 === 0) {
			colors = shuffle(colors);
		}

		this.cards.push(new Card(i, colors[i%colors.length], icons[i%icons.length]));
		this.cards.push(new Card(i, colors[i%colors.length], icons[i%icons.length]));
	}

	// Once all the cards are in the array, shuffle the array
	this.cards(shuffle(that.cards()));

	// Selects a card and checks if it matches
	this.checkSelected = function(card) {
		var cardsSelected = [];

		//console.log(card);
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
				that.removeCards(cardsSelected[0]);

				// If there are no more cards, reveal the winner message
				if(that.cards().length === 0) {
					document.getElementsByClassName('winner-message')[0].className = document.getElementsByClassName('winner-message')[0].className.replace('hidden', '');
				}
			}, 400);
		} else {
			console.log("unmatched");
			setTimeout(function(){
				that.deSelectAll();
			}, 400);
		}
	};

	// Deselects all cards
	this.deSelectAll = function() {
		for(var i=0; i<that.cards().length; i++) {
			that.cards()[i].unselect();
		}
	};

	// Remove all cards with the ID number passed in
	this.removeCards = function(number) {
		that.cards.remove(function(item) { return item.num() === number});
	};

};

ko.applyBindings(new ViewModel());