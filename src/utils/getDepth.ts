const getDepth = (selectionSet, depthSoFar = 1) => {
  if (!selectionSet?.selections) {
    return depthSoFar
  }
  // Find maximum depth among all selections
  return selectionSet.selections.reduce((maxDepth, selection) => {
    // Inline fragments and fragment spreads add complexity to depth calculation,
    // because we would need to look up the fragment definition in the document.
    // We will not handle those cases here.
    if (selection.kind !== 'Field') return maxDepth

    const depth = getDepth(selection.selectionSet, depthSoFar + 1)
    return depth > maxDepth ? depth : maxDepth
  }, depthSoFar)
}

export default getDepth
