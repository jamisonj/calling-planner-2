import './App.css';
import './components/NamesList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NamesList from './components/NamesList';
import CallingsList from './components/CallingsList';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <NamesList/>
        </Grid>
        <Grid item xs={8}>
          <CallingsList/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
