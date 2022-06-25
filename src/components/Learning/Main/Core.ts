import { KeyboardEvent } from 'react';
import { Word } from '../../../@types/entities/Word';
import { compareArrOrder } from '../../../utils/common/compareArrOrder';
import { shuffleArray } from '../../../utils/common/shuffleArray';
import { getAllLetters } from '../Stages/handlers';
import { ActiveAnimation, Letter } from '../Stages/types';
/* eslint-disable */
//! если что это для ++ потом добавлю адекватное правило ибо мне лень 🐈
const STAGES_RULES = {
  1: {
    wordVisible: 'wordLearning',
    wordHidden: 'wordNative',
  },
  2: {
    wordVisible: 'wordNative',
    wordHidden: 'wordLearning',
  },
  3: {
    wordVisible: 'wordNative',
    wordHidden: 'wordLearning',
  },
};

export interface LearningEvent {
  word: Word | null;
  letters: Letter[];
  cards: Letter[];
  stage: number;

  currentIndex: number;
  currentCell: Letter | null;
  activeAnimation: ActiveAnimation | null;

  mistakesCount: number;
  isCompleted: boolean;
}

export class LearningCore {
  private word: Word | null = null;

  private letters: Letter[] = [];

  private cards: Letter[] = [];

  private stage = 1;

  private currentIndex = 0;

  private currentCell: null | Letter = this.letters[this.currentIndex];

  private activeAnimation: ActiveAnimation | null = null;

  private mistakesCount = 0;

  private isCompleted = false;

  private eventHandler: (e: LearningEvent) => void;

  constructor(
    eventHandler: LearningCore['eventHandler'],
    word: Word | null,
    stage: number
  ) {
    this.eventHandler = eventHandler;
    this.word = word;
    this.stage = stage;
  }

  private pushEvent() {
    const event: LearningEvent = {
      word: this.word,
      letters: this.letters,
      cards: this.cards,
      stage: this.stage,

      currentIndex: this.currentIndex,
      currentCell: this.currentCell,
      activeAnimation: this.activeAnimation,

      mistakesCount: this.mistakesCount,
      isCompleted: this.isCompleted,
    };
    this.eventHandler(event);
  }

  start() {
    this.getLetters();
    this.getCards();
    this.currentIndex = 0;
    this.currentCell = this.letters[this.currentIndex];

    this.pushEvent();
  }

  handleCardPick(item: Letter) {
    this.checkPickedValue(item);
  }

  handleKeyPick(item: KeyboardEvent<HTMLDivElement>) {
    const keyPressed = `Key${this.currentCell?.letter.toUpperCase()}`;
    if (item.code === keyPressed) {
      if (this.isCompleted) return;
      if (this.cards.length === 1) this.isCompleted = true;
      this.currentIndex++;
      this.currentCell = this.letters[this.currentIndex];
    } else {
      this.mistakesCount++;
    }

    this.pushEvent();
  }

  private getLetters() {
    if (this.word) {
      const stageRule =
        STAGES_RULES[this.stage as keyof typeof STAGES_RULES].wordHidden;
      const currentWord =
        this.word[stageRule as 'wordLearning' | 'wordNative'];
      this.letters = getAllLetters(currentWord);
    }
    this.pushEvent();
  }

  private getCards() {
    function getRandom(obj: LearningCore) {
      const random = shuffleArray([...obj.letters]);
      if (compareArrOrder(random, obj.letters)) {
        getRandom(obj);
      }
      obj.cards = random;
    }
    getRandom(this);
    this.pushEvent();
  }

  private checkPickedValue(item: Letter) {
    if (this.currentCell?.letter === item.letter) {
      this.handleSuccessPick(item);
    } else {
      this.handleFailPick(item);
    }
  }

  private handleSuccessPick(item: Letter) {
    if (this.isCompleted) return;
    if (this.cards.length === 1) this.isCompleted = true;
    this.currentIndex++;
    this.currentCell = this.letters[this.currentIndex];
    this.cards = this.cards.filter(el => el.id !== item.id);
    this.pushEvent();
  }

  private handleFailPick(item: Letter) {
    this.activeAnimation = {
      letterId: item.id,
      state: 'incorrect',
    };
    this.mistakesCount++;
    this.pushEvent();
  }
}
