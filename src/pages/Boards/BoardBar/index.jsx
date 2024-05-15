import Box from '@mui/material/Box';
import React from 'react';

function BoardBar() {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.dark',
                width: '100%',
                height: (theme) => theme.trello.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            Board bar
        </Box>
    );
}

export default BoardBar;
