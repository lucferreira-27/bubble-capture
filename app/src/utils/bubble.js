const capitalizePhrase = (str) => {
    let sentences = str.split(/(?<=[.?!])\s+/);
    let result = [];
    for (let sentence of sentences) {
        sentence = sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
        sentence = sentence.replace(/\s+(?=[.,:;?!])/g, "");
        sentence = sentence.replace(/\bi\b/g, "I");
        result.push(sentence);
    }
    return result.join(" ");
};

export {capitalizePhrase};
