import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function CheckboxLabels() {
  return (
      <Box>
        <Typography
            variant='h6'
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold' } }}
        >
            สถานะ
        </Typography>
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="ส่งคืนแล้ว" />
            <FormControlLabel control={<Checkbox />} label="ยังไม่พบเจ้าของ" />
        </FormGroup>
      </Box>
  );
}
