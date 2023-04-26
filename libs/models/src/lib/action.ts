export type ActionType = 'add' | 'update' | 'delete';

export interface Action<T> {
  item: T;
  type: ActionType;
}
