import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, Divider, Card } from '@mui/material';
import SpeechBubbleCard from './SpeechBubbleCard';

const SpeechBubbleList = ({ bubbles }) => {
    return (
        <List  sx={{ overflow: 'auto',maxHeight: 650 }}>
            {bubbles.map((bubble, index) => (
                <>
                    <Card sx={{margin: `8px` }}>
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar sx={{ height: '60px', width: '60px', padding: `8px` }} variant="circular" alt="Remy Sharp" src="https://cdn.myanimelist.net/images/characters/9/310307.jpg" />
                            </ListItemAvatar>
                            <SpeechBubbleCard bubble={bubble} />

                        </ListItem>
                        <Divider variant="middle" component="li" />

                    </Card>
                </>
            ))}
        </List>
    );
};

export default SpeechBubbleList;
