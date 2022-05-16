const words = [
  "pomme",
  "ananas",
  "banane",
  "mangue",
  "poire",
  "fraise",
  "pizza",
  "oeuf",
  "biberon",
  "volcan",
  "avion",
  "chien",
];

const emojis = {
  pomme: "1F34E",
  ananas: "1F34D",
  banane: "1F34C",
  mangue: "1F96D",
  poire: "1F350",
  fraise: "1F353",
  pizza: "1F355",
  oeuf: "1F95A",
  biberon: "1F37C",
  volcan: "1F30B",
  avion: "2708",
  chien: "1F436",
}

const emoji = (w) => {
  return `&#x${emojis[w]};`
}

export {
  words,
  emojis,
  emoji
}
