import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from './Redux/store';
import { fetchFreelancerPosts, fetchFreelancers, fetchFreelancerComments } from './Redux/cardSlice';
import FreelancerCardList from './Components/FreelancerCardList';
import FreelancerDetail from './Components/FreelancerDetail';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Switch, FormControlLabel, Box, Typography } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    dispatch(fetchFreelancers());
    dispatch(fetchFreelancerPosts());
    dispatch(fetchFreelancerComments());
  }, [dispatch]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4">Freelancer Platform</Typography>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
            label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
          />
        </Box>
        <FreelancerCardList />
        <FreelancerDetail />
      </Box>
    </ThemeProvider>
  );
}

export default App;
