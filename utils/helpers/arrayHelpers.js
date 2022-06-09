export const checkIfValueExist = (arr, key, value) => {
    return arr?.some((e) => e[key] === value)
}

export const getValueInArrayCounter = (array, key, value, lowercase) => {
    return array?.filter((v) => {
        if (lowercase) return v[key] === value.toLocaleLowerCase()
        return v[key] === value
    }).length
}
