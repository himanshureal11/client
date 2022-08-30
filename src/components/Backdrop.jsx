import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

export default function SimpleBackdrop(props) {
  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        onClick={props.onClose}
      >
          {props.children}
      </Backdrop>
  );
}
