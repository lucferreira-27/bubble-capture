import React from 'react';
import { Card, CardContent, Typography,ListItemText } from '@mui/material';

const SpeechBubbleCard = ({ bubble }) => {
    const capitalizePhrase = (str) => {
        // use a regular expression to split the string by sentences that end with a period, question mark, or exclamation mark
        let sentences = str.split(/(?<=[.?!])\s+/);
        // initialize an empty array to store the transformed sentences
        let result = [];
        // loop through the sentences array
        for (let sentence of sentences) {
            // capitalize the first word of the sentence and convert the rest to lowercase
            sentence = sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
            // use another regular expression to find and remove any extra spaces before punctuation marks
            sentence = sentence.replace(/\s+(?=[.,:;?!])/g, "");
            // use another regular expression to find and capitalize the letter "i" when it is used as a pronoun
            sentence = sentence.replace(/\bi\b/g, "I");
            // push the transformed sentence to the result array
            result.push(sentence);
        }
        // join the result array by spaces and return it
        return result.join(" ");
    };
    const getText = () => {
        return capitalizePhrase(bubble.words.map((word) => word.text).join(' '));
    };

    return (
        <Card sx={{ width: '75%' }}>
            <CardContent>
                <ListItemText
                    primary="Luffy"
                    secondary={
                        <React.Fragment>
                            {getText()}
                        </React.Fragment>
                    }
                />            </CardContent>
        </Card>
    );
};

export default SpeechBubbleCard;
