function checkLengthString (string, maxLength) {
  return string.length <= maxLength;
}

function isPalidrom (string) {
  string = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0; --i) {
    newString += string[i];
  }
  return (newString === string);
}

function getNumbers (string) {
  string = string.toString();
  let sumString = '';
  for (let i = 0; i < string.length; ++i) {
    booleanResult = Number.isNaN(parseInt(string[i], 10));
    if (!Number.isNaN(parseInt(string[i], 10))) {
      sumString += string[i];
    }
  }
  return (sumString === '') ? NaN : Number(sumString);
}
