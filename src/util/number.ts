export const isNumber = (inputValue: string | number) => {
  if (typeof inputValue === 'number') {
    return !isNaN(inputValue)
  }
  return inputValue.trim() !== '' && !isNaN(Number(inputValue.trim()))
}

export const getNumber = (inputValue: string | number) => {
  return inputValue
  //   return Number(inputValue)
}

export const getEqualityPredicate = <T>(inputValue: T) => {
  return (predicateEntry: T) => {
    return predicateEntry === inputValue
  }
}
