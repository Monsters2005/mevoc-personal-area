export function countPercentage(partial: number, total: number) {
  if (total !== 0) return (100 * partial) / total;
  return 0;
}
