import Card from "./card";
import chunk from "lodash/chunk";
const ordRank = (a, b) => a.ord - b.ord;
const _ = { chunk };

class Deck {
  constructor() {
    this.cards = [];
    const cardSuits = ["Diamonds", "Clovers", "Hearts", "Spades"];
    const cardVals = [
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Jack",
      "Queen",
      "King",
      "Ace",
      "Two"
    ];
    let i = 0;
    let x = 8;
    cardVals.forEach(cardVal => {
      cardSuits.forEach(cardSuit => {
        let card = new Card(cardSuit, cardVal, i, x % 52);
        this.cards.push(card);
        i++;
        x++;
      });
    });
    this.shuffle();
  }

  shuffle() {
    const shuffler = arr => {
      for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
      }
    };
    shuffler(this.cards);
    return this;
  }

  deal(players) {
    let hands = _.chunk(this.shuffle().cards.slice(), 13).map(h =>
      h.sort(ordRank)
    );
    //https://en.wikipedia.org/wiki/Big_two#Reshuffling
    while (hands.some(h => getHandVal(h) <= 3)) {
      hands = _.chunk(this.shuffle().cards.slice(), 13).map(h =>
        h.sort(ordRank)
      );
    }

    return players.map(({ name }, i) => ({
      name,
      cards: hands[i]
    }));
  }
}

const getHandVal = h => h.reduce((a, b) => a + getDealVal(b), 0);

const getDealVal = ({ value: v }) =>
  ({
    Jack: 1,
    Queen: 2,
    King: 3,
    Ace: 4,
    Two: 5
  }[v] || 0);

export default Deck;
