import React from "react";
import "./gui/styles/styles.scss";

import Game from "./big2/game/game";

import App from "./gui/components/app";

const name = "Ayesha";
const game = new Game(name);
game.addAiPlayer("Laila");
game.addAiPlayer("Hana");
game.addAiPlayer("Zara");
game.start();

export default props => <App game={game} player={game.players[0]} />;
