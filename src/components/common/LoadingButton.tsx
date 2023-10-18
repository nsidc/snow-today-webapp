import React from 'react';
import {Button} from 'react-bootstrap';

import LoadingMessage from './LoadingMessage';

const LoadingButton: React.FC = () => (
    <span>
      <Button variant="primary" disabled>
        <LoadingMessage />
      </Button>
    </span>
);

export default LoadingButton;
