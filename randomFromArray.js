function randomFromArray(array) {
  const item = array[Math.floor(Math.random() * array.length)];

  return item;
}

module.exports = randomFromArray;
