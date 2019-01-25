import handChecker from "./handChecker";
import Deck from "./deck";

const deck = new Deck();

console.log(deck.cards);

test("returns a single", () => {
  console.log(handChecker([deck.cards[0]]));

});
