export const capitaliseFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const removePunctuation = (string: string) => {
  return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, "");
};
