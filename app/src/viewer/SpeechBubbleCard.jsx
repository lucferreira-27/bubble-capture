import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Stack,
    ListItemText,
    Paper,
    Box,
    Button,
    Typography,
    InputBase
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RestoreIcon from '@mui/icons-material/Restore';
import BoltIcon from '@mui/icons-material/Bolt';
import { capitalizePhrase } from '../utils/bubble';

const SpeechBubbleCard = ({ bubble, onTextChange, onTypeChange,onHover }) => {
    let { text, words, type } = bubble;
    const [attackType, isAttackType] = useState(type == true)

    const cleanText = () => {
        const firstCleanText = capitalizePhrase(words.map((word) => word.text).join(' '));
        return firstCleanText;
    };

    useEffect(() => {
        if (!text) {
            onTextChange(cleanText())
        }
    }, [])

    useEffect(() =>{
        onTypeChange(attackType)
    },[attackType])


    const handleRestore = () => {
        const newText = cleanText();
        onTextChange(newText);
    };

    const handleAttackType = () => {

        // Toggle the special type or perform any other action
        isAttackType(!attackType)
    };

    const handleChange = (e) => {
        const newText = e.target.value;
        onTextChange(newText);
    };

    return (
        <Card sx={{ width: '450px'}} onMouseEnter={() => onHover(bubble,true)} onMouseLeave={() => onHover(bubble,false)}>
            <CardContent>
                <ListItemText
                    primary="Luffy"
                    secondary={
                        <InputBase
                            component="span"
                            maxRows={10}
                            multiline
                            value={text}
                            onChange={handleChange}
                            sx={{
                                width: '100%',
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontSize: '0.875rem',
                                outline: '0 solid transparent'
                            }}
                        />
                    }
                />
                <Paper sx={{ bgcolor: '#dc2f2f', width: '25%' }}>
                    <Stack direction={`row`} justifyContent={`center`} spacing={1}>
                        <RestoreIcon
                            sx={{
                                color: 'white',
                                cursor: 'pointer',
                                '&:hover': { color: 'gray' }
                            }}
                            onClick={handleRestore}
                        />
                        <BoltIcon
                            sx={{
                                color: attackType ? `yellow` : `white`,
                                cursor: 'pointer',
                                '&:hover': { color: 'gray' }
                            }}
                            onClick={handleAttackType}
                        />
                    </Stack>
                </Paper>
            </CardContent>
        </Card>
    );
};

export default SpeechBubbleCard;
