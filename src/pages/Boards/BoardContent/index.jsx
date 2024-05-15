import Box from '@mui/material/Box';
import React from 'react';

function BoardContent() {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
            }}
        >
            Content
        </Box>
    );
}

export default BoardContent;
