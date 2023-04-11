import Sidebar from '~/components/Sidebar';
import Navbar from '~/components/Navbar';
import Add from '~/components/Add';

import Container from '@mui/material/Container';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import { useState } from 'react';

function Dashboard() {
    const [mode, setMode] = useState('light');

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={'background.default'} color={'text.primary'}>
                <Navbar />
                <Container>
                    <Stack direction="row" justifyContent="space-between">
                        <Sidebar setMode={setMode} mode={mode} />
                    </Stack>
                    <Add />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;
