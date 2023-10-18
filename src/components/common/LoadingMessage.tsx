import React from 'react';
import {Spinner, SpinnerProps} from 'react-bootstrap';


interface ILoadingMessageProps {
  message?: string;
  small?: boolean;
}
const LoadingMessage: React.FC<ILoadingMessageProps> = (props) => {
  const message: string = props.message || "Loading...";
  const small: boolean = Boolean(props.small) || true;

  const attributes: SpinnerProps = {
    as: "span",
    animation: "border",
    role: "status",
    "aria-hidden": "true",
  }

  if (small) {
    attributes.size = "sm";
  }

  return (
    <>
      <Spinner {...attributes} />
      {` ${message}`}
    </>
  );
};

export default LoadingMessage;
