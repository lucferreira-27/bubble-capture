import React from 'react';
import { Box, Paper } from '@mui/material';
import SpeechBubbleList from './SpeechBubbleList';

const SpeechBubbleListContainer = ({ currentPage, currentBubbles, dispatch, UPDATE_BUBBLES }) => {
    return (
        <Paper sx={{bgcolor: `#222831`}}>
            <Box height="calc(100vh - 172px)" display="flex" flexDirection="column">
                {currentPage && (
                    <SpeechBubbleList
                        bubbles={currentBubbles}
                        setBubbles={bubbles =>
                            dispatch({
                                type: UPDATE_BUBBLES,
                                payload: { pageNumber: currentPage.pageNumber, bubbles },
                            })
                        }
                    />
                )}
            </Box>
        </Paper>
    );
};

export default SpeechBubbleListContainer;
