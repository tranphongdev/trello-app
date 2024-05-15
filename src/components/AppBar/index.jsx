import React from 'react';
import ModeSelect from '../../components/ModeSelect';
import Box from '@mui/material/Box';

function AppBar() {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.light',
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <ModeSelect />
        </Box>
    );
}

export default AppBar;
