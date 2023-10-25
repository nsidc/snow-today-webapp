import React from 'react';
import {Button} from 'react-bootstrap';

import LoadingMessage from './LoadingMessage';

interface ILoadingButton {
  variant?: string;
  message?: string;
}
const LoadingButton: React.FC<ILoadingButton> = (props) => {
  const variant = props.variant || "primary";
  return (
    <span>
      <Button variant={variant} disabled>
        <LoadingMessage message={props.message} />
      </Button>
    </span>
  );
};

export default LoadingButton;
