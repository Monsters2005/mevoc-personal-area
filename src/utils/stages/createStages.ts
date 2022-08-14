export type Stage = {
  id: number;
  name: string;
  progress: number;
};

export class Stages {
  private stages: Stage[] = [];

  private currentIndex = 0;

  private currentStage: Stage = this.stages[this.currentIndex];

  constructor(items: Stage[]) {
    this.stages = items;
  }
}
