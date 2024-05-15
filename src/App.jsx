import * as React from 'react';
import Button from '@mui/material/Button';

import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme,
    useColorScheme,
} from '@mui/material/styles';

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    return (
        <Button
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
            }}
        >
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
        </Button>
    );
}

function App() {
    return (
        <>
            <ModeToggle></ModeToggle>

            <Button variant="contained">Hello world</Button>
        </>
    );
}

export default App;
