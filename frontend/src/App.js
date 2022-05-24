import './App.css';
import Item from './components/Item'; 
import Type from './components/Type'; 
import Status from './components/Status'; 
import SearchInput from './components/Search';
import { Grid, Typography } from '@mui/material';

function App() {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={2}>
        <Type />
        <Status />
      </Grid>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={10}>
            <Typography
              variant='h4'
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold' } }}
              >
              ประกาศของหาย
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <SearchInput />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Item />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
