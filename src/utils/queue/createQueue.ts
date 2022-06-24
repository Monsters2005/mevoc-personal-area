type QueueType<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getItem: () => T | null;
  size: () => number;
};

export class Queue<T> implements QueueType<T> {
  private storage: T[] = [];

  constructor(items: T[]) {
    this.storage = items;
  }

  private capacity = Infinity;

  enqueue(item: T): void {
    if (this.size() < this.capacity) this.storage.push(item);
  }

  dequeue(): void {
    if (this.size() !== 0) this.storage.shift();
  }

  getItem(): T | null {
    if (this.size() === 0) return null;
    return this.storage[0];
  }

  size(): number {
    return this.storage.length;
  }
}
