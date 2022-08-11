type WithProperty = {
  id: number;
};

export function checkIsInArrayById<T extends WithProperty>(
  item: T,
  items: T[]
) {
  return items.find(el => el.id === item.id) !== undefined;
}
