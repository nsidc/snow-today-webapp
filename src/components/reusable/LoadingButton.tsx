import React from 'react';
import {Button, Spinner} from 'react-bootstrap';

const LoadingButton: React.FC = () => {
  return (
    <span>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </span>
  );
}

export default LoadingButton;
