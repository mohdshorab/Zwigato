export const getCode = (errorCode: string) => {
  const startIndexOfCode = errorCode.indexOf('[');
  const endIndexOfCode = errorCode.indexOf(']');
  if (endIndexOfCode !== -1 && startIndexOfCode !== -1) {
    return errorCode.slice(startIndexOfCode + 1, endIndexOfCode);
  } else {
    return errorCode;
  }
};
