import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import SpeechBubbleListContainer from './SpeechBubbleListContainer';
import TranscriptBubblesMenu from './TranscriptBubblesMenu';
import CanvasContainer from './CanvasContainer';
import useSelectedBubbles from './hooks/useSelectedBubbles'


const EditPanel = ({ pages }) => {

    const UPDATE_BUBBLES = 'UPDATE_BUBBLES';


    const [currentPage, setCurrentPage] = useState(null);
    const [selectedBubbles, dispatch] = useSelectedBubbles({});

    useEffect(() => {
        if (pages && !currentPage) {
            setCurrentPage(pages[0]);
        }
    }, [pages, currentPage]);

    useEffect(() => {
        if (!currentPage) {
            return;
        }

        const pageNumber = currentPage.pageNumber;
        const bubbles = selectedBubbles[pageNumber] || [];

        dispatch({
            type: UPDATE_BUBBLES,
            payload: { pageNumber, bubbles },
        });
    }, [currentPage]);

    useEffect(() => {

        const eventKeyDown = 'keydown'

        const handleKeyDown = event => {
            const leftArrowCode = 37
            const rightArrowCode = 39

            if (event.keyCode === leftArrowCode) {
                handlePageChange(-1);
            } else if (event.keyCode === rightArrowCode) {
                handlePageChange(1);
            }
        };

        window.addEventListener(eventKeyDown, handleKeyDown);

        return () => {
            window.removeEventListener(eventKeyDown, handleKeyDown);
        };
    }, [currentPage]);

    const handlePageChange = delta => {
        const currentIndex = pages.indexOf(currentPage);
        const newIndex = currentIndex + delta;

        if (newIndex >= 0 && newIndex < pages.length) {
            setCurrentPage(pages[newIndex]);
        }
    };

    const handleSelect = bubble => {
        const pageNumber = currentPage.pageNumber;
        const bubbles = selectedBubbles[pageNumber] || [];
        const isSelected = bubbles.find(b => bubble.id == b.id);
        let updatedBubbles;

        if (isSelected) {
            updatedBubbles = bubbles.filter(b => b.id !== bubble.id);
        } else {
            updatedBubbles = [...bubbles, bubble];
        }

        dispatch({
            type: UPDATE_BUBBLES,
            payload: { pageNumber, bubbles: updatedBubbles },
        });
    };


    const pageNumber = currentPage ? currentPage.pageNumber : null;
    const currentBubbles = selectedBubbles[pageNumber] || [];

    return (
        <Grid container spacing={1.5}>
            <Grid item xs={6} md={6}>
                <SpeechBubbleListContainer
                    currentPage={currentPage}
                    currentBubbles={currentBubbles}
                    dispatch={dispatch}
                    UPDATE_BUBBLES={UPDATE_BUBBLES}
                />
                <TranscriptBubblesMenu currentBubbles={currentBubbles} />
            </Grid>
            <Grid item xs={6} md={6}>
                <CanvasContainer
                    currentPage={currentPage}
                    handleSelect={handleSelect}
                    setBubbles={(bubbles) =>{
                        dispatch({
                            type: UPDATE_BUBBLES,
                            payload: { pageNumber, bubbles: bubbles },
                        });
                    }}
                    currentBubbles={currentBubbles}
                    handlePageChange={handlePageChange}
                />
            </Grid>
        </Grid>
    );
};

export default EditPanel;
