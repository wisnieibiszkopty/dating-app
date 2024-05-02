// implementing queue because javascript cant do it 🙄
export class Queue<T> {
  private items: T[];

  constructor(list?: T[]) {
    if(list){
      this.items = list;
    } else {
      this.items = [];
    }
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items.length ? this.items[0] : undefined;
  }

  take(): T | undefined {
    const item = this.peek();
    this.dequeue();
    return item;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}
