let wordlist = fetch(
  "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
)
  .then(words => {
    return words.json();
  })
  .then(words => {
    return JSON.stringify(words);
  });


console.log(wordlist);