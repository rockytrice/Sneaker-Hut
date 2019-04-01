// this function will check for undefined, null, an empty object, and an empty string
const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0)
    );
}

module.exports = isEmpty;