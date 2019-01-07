import { BehaviorSubject, from } from "rxjs";
import { map } from "rxjs/operators";
import isEqual from "lodash/isEqual";
import { isValidTurn, createTracker, isOver, createEndStatus } from "./lib";
import { processTurn } from "./createMatch";
import createMatch from "./createMatch";
// input: array of Player objects each with name and points
// output: array of Player objects with updated points
class Match {
  constructor(players) {
    const match = createMatch(players);
    this.processTurn = turn => match.dispatch(processTurn(turn));
    const subject = new BehaviorSubject(match.getState());
    this.matchStatus$ = from(match).pipe(map(match => createTracker(match)));

    // use subject.complete logic here
    this.matchStatus$.subscribe(d => {
      if (isOver(d)) {
        subject.next(createEndStatus(d, match.getState()));
        subject.complete();
      } else {
        subject.next(d);
      }
    });
    this.getMatchStatus$ = subject;

    players.forEach(p => {
      const cardsSubject = new BehaviorSubject([]);
      const pCards$ = from(match).pipe(
        map(d => d.players.find(player => player.name === p.name).cards)
      );

      pCards$.subscribe(c => {
        const lastVal = cardsSubject.getValue();
        if (!isEqual(lastVal, c)) cardsSubject.next(c);
      });

      p.registerMatch(this.playTurn, this.getMatchStatus$, cardsSubject);
    });
  }
  playTurn = turn => {
    const tracker = this.getMatchStatus$.getValue();
    if (isValidTurn(tracker, turn)) {
      this.processTurn(turn);
    }
  };
}
export default Match;
