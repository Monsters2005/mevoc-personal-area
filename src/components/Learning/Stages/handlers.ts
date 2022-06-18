export function getAllLetters(wordLearning: string) {
  return wordLearning.split('').map((letter, id) => ({
    id,
    letter,
  }));
}

// export function handleLetterPick (letterPicked: Letter, currentLetter: Letter)  {
//     const isCorrect = letterPicked.letter === currentLetter.letter;
//     if (isCorrect) {
//       handlePickSuccess(letterPicked);
//     } else {
//       setMistakesCount(mistakesCount + 1);
//       handleAnimation('incorrect', letterPicked.id);
//     }
//   };
