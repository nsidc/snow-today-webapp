import React from 'react';

import Button from 'react-bootstrap/Button';
import {BsArrowClockwise} from 'react-icons/bs';


const RefreshPageButton: React.FC = () => (
  <Button
    variant='secondary'
    onClick={() => {window.location.href = window.location.href}}>
    <BsArrowClockwise />
    {' Reset'}
  </Button>

);
export default RefreshPageButton;
