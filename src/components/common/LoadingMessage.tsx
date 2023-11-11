import React from 'react';

import LoadingIcon from './LoadingIcon';


interface ILoadingMessageProps {
  message?: string;
}
const LoadingMessage: React.FC<ILoadingMessageProps> = (props) => {
  const message: string = props.message || "Loading...";

  return (
    <>
      <LoadingIcon />
      <i>{message}</i>
    </>
  );
};

export default LoadingMessage;
