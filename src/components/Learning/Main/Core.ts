import { shuffleArray } from '../../../utils/common/shuffleArray';
import { ActiveAnimation, Letter } from '../Stages/types';

export type LearningEvent = {
  letters: Letter[];
  cards: Letter[];
  currentIndex: number;
  currentCell: Letter | null;
  mistakesCount: number;
  activeAnimation: ActiveAnimation | null;
  isCompleted: boolean;
};

export class LearningCore {
  private letters: Letter[] = [];

  private cards: Letter[] = [];

  private mistakesCount = 0;

  private currentIndex = 0;

  private currentCell = null;

  private activeAnimation = null;

  private isCompleted = false;

  //   private eventHandler: (e: LearningEvent) => void;

  //   constructor(eventHandler: LearningCore['eventHandler']) {
  //     this.eventHandler = eventHandler;
  //   }

  constructor(letters: Letter[]) {
    this.letters = letters;
  }

  //   private pushEvent() {
  //     const event: LearningEvent = {
  //       letters: this.letters,
  //       cards: this.cards,
  //       isCompleted: this.isCompleted,
  //       currentIndex: this.currentIndex,
  //       currentCell: this.currentCell,
  //       mistakesCount: this.mistakesCount,
  //       activeAnimation: this.activeAnimation,
  //     };
  //   }

  //   private getCards(arr: Letter[]) {
  //     return shuffleArray([...arr]);
  //   }
}
