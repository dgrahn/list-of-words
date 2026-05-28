export function categorizeWords(words) {
  const wordsMap = {}
  if (!words) return wordsMap;

  words.forEach(word => {
    const letter = word[0].toUpperCase();

    if (wordsMap[letter]) {
      wordsMap[letter].push(word)
    } else {
      wordsMap[letter] = [ word ]
    }
  })

  return wordsMap;
}
