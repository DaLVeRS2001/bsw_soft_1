const makeRegExp = (regExp, replaceMark, variable) => {
  return regExp.replace(replaceMark, variable);
};

const makeObjectFromKeys = (keys) => {
  return keys.reduce((a, v) => ({ ...a, [v]: '' }), {});
};

const capitalizeFirstLetter = (word) => {
  return word[0].toUpperCase() + word.substring(1);
};

export { makeRegExp, capitalizeFirstLetter, makeObjectFromKeys };
