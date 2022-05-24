import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

export default function BasicTextFields() {
    const [values, setValues] = React.useState({
        text: ''
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
        <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel htmlFor="search-input">Search</InputLabel>
            <OutlinedInput
                id="search-input"
                value={values.text}
                onChange={handleChange('text')}
                endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
                label="Search"
            />
        </FormControl>
      </div>
    </Box>
  );
}
