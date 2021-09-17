const replaceAt = (string, index, replacement) => {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

export const parseAPIResponseSymptoms = (symptoms) => {
    let newSymptoms = symptoms.replace(/'/g, '"');
    return JSON.parse(newSymptoms);
}