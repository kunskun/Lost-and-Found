import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function CheckboxLabels() {
  return (
      <Box sx={{ mb: 2 }}>
        <Typography
            variant='h6'
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold' } }}
        >
            หมวดหมู่
        </Typography>
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="มือถือ" />
            <FormControlLabel control={<Checkbox />} label="กระเป๋า" />
            <FormControlLabel control={<Checkbox />} label="กุญแจ" />
            <FormControlLabel control={<Checkbox />} label="ปากกา" />
            <FormControlLabel control={<Checkbox />} label="หูฟัง" />
        </FormGroup>
      </Box>
  );
}
