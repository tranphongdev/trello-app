import React from 'react';
import Container from '@mui/material/Container';

import AppBar from '../../components/AppBar';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';

function Board() {
    return (
        <Container disableGutters maxWidth={true} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar />
            <BoardContent />
        </Container>
    );
}

export default Board;
