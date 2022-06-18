// export function shuffleArray<T>(arr: T[]) {
//   let currIndex = arr.length;
//   let randIndex;
//   while (currIndex !== 0) {
//     randIndex = Math.floor(Math.random() * currIndex);
//     currIndex -= currIndex;
//     [arr[currIndex], arr[randIndex]] = [arr[randIndex], arr[currIndex]];
//   }

//   return arr;
// }

export function shuffleArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr;
}
