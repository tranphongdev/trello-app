import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import { useColorScheme } from '@mui/material/styles';

function ModeSelect() {
    const { mode, setMode } = useColorScheme();

    const handleChange = (event) => {
        const selectedMode = event.target.value;
        setMode(selectedMode);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel
                sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' },
                }}
                id="label-select-dark-light-mode"
            >
                Mode
            </InputLabel>
            <Select
                labelId="label-select-dark-light-mode"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '.MuiSvgIcon-root': { color: 'white' },
                }}
            >
                <MenuItem value="light">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LightModeIcon fontSize="small" /> Light
                    </div>
                </MenuItem>
                <MenuItem value="dark">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DarkModeOutlinedIcon /> Dark
                    </div>
                </MenuItem>
                <MenuItem value="system">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SettingsBrightnessIcon /> System
                    </div>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

export default ModeSelect;
