

var Card = function(num, hexColor, iconSelected) {
		var that = this;

		that.num = ko.observable(num);
		that.color = hexColor;
		that.icon = iconSelected;
		that.selected = ko.observable(false);
		that.select = function() {
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
	this.maxNumOfPairs = 50;
	this.numberOfPairsArray = [];

	// Put all the options for the number of pairs into the array
	for(var j=1; j<=that.maxNumOfPairs; j++) {
		that.numberOfPairsArray.push(j);
	}

	this.numberOfPairs = ko.observable();
	this.cards = ko.observableArray([]);

	this.numberOfPairs.subscribe(function() {
		that.initial();
	});

	this.initial = function() {
		// Hide the winner message
		document.getElementsByClassName('winner-message')[0].className += ' hidden';

		// Remove all the cards current in the array
		that.cards.removeAll();

		// Repopulate it with new cards
		for(var i=0; i<(that.numberOfPairs()); i++) {
				// If there are more than 20 pairs, randomize the colors to prevent doubles
				if(i%20 === 0) {
						colors = shuffle(colors);
				}

				this.cards.push(new Card(i, colors[i%colors.length], icons[i%icons.length]));
				this.cards.push(new Card(i, colors[i%colors.length], icons[i%icons.length]));
		}

		// Once all the cards are in the array, shuffle the array
		this.cards(shuffle(that.cards()));
	};
	// Selects a card and checks if it matches
	this.checkSelected = function(card) {
			var cardsSelected = [];

			card.select();

			// Sort through all the cards and add them to the cardsSelected array.
			for(var i=0; i<that.cards().length; i++) {
					if(that.cards()[i].selected()) {
							cardsSelected.push(that.cards()[i].num());
					}

			}

			// If there are more than two selected, deselect them all
			if(cardsSelected.length > 2) {
					that.deSelectAll();
					return false;
			}

			// If there are less than two selected, then don't do anything
			if(cardsSelected.length < 2) {
					return false;
			}

			// If the cards match, remove those cards from the cards array
			if(cardsSelected[0] === cardsSelected[1]) {
					setTimeout(function(){
							that.removeCards(cardsSelected[0]);

							// If there are no more cards, reveal the winner message
							if(that.cards().length === 0) {
								document.getElementsByClassName('winner-message')[0].className = document.getElementsByClassName('winner-message')[0].className.replace(/hidden/g, '');
							}
					}, 400);
			} else {
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