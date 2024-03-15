export function sortArticleDesc(sortValue, arrayToSort){
  return arrayToSort.sort((a, b) => {
    const aVal = a[sortValue]
    const bVal = b[sortValue]
    if(aVal > bVal){
      return -1
    }
    if(aVal < bVal){
      return 1
    }
    return 0
  })
}

export function sortArticleAsc(sortValue, arrayToSort){
  return arrayToSort.sort((a, b) => {
    const aVal = a[sortValue]
    const bVal = b[sortValue]
    if(aVal < bVal){
      return -1
    }
    if(aVal > bVal){
      return 1
    }
    return 0
  })
}