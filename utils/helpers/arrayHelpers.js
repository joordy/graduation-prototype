export const checkIfValueExist = (arr, key, value) => {
    return arr.some((e) => e[key] === value)
}
