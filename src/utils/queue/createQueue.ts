import { generateId } from '../common/generateId';

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

  enqueueAll(items: T[]) {
    this.storage = items;
  }

  enqueue(item: T): void {
    const queueId = generateId();
    const itemWithId = { ...item, queueId };
    if (this.size() < this.capacity) this.storage.push(itemWithId);
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
