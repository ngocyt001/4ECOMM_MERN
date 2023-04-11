import Sidebar from '~/components/Sidebar';
import Feed from '~/components/Feed';
import Rightbar from '~/components/Rightbar';
import Navbar from '~/components/Navbar';
import Add from '~/components/Add';

import Container from '@mui/material/Container';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import { useState, useEffect } from 'react';

function Home() {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        if (mode === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [mode]);

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={'var(--bg-color)'} color={'text.primary'}>
                <Navbar />
                <Container sx={{ minHeight: 'calc(100vh - 66px)' }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Sidebar setMode={setMode} mode={mode} />
                        <Feed />
                        <Rightbar />
                    </Stack>
                    <Add />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Home;
