export const toCamelCase = (str = '') => {
    return str
        .replace(/[^a-z0-9]/gi, ' ')
        .toLowerCase()
        .split(' ')
        .map((el, ind) =>
            ind === 0 ? el : el[0].toUpperCase() + el.substring(1, el.length),
        )
        .join('')
}

export const convertBreadcrumb = (string) => {
    return string
        .replace(/-/g, ' ')
        .replace(/oe/g, 'ö')
        .replace(/ae/g, 'ä')
        .replace(/ue/g, 'ü')
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
