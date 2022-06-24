export function getAllLetters(word: string) {
  const validWord = word.replace(/\s/g, '');
  return validWord.split('').map((letter, id) => ({
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
