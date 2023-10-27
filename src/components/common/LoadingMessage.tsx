import React from 'react';
import {FaSnowflake} from 'react-icons/fa';
import '@src/style/loading.css';


interface ILoadingMessageProps {
  message?: string;
}
const LoadingMessage: React.FC<ILoadingMessageProps> = (props) => {
  const message: string = props.message || "Loading...";

  return (
    <>
      <FaSnowflake className={'loading-spinner'}/>
      <i>{message}</i>
    </>
  );
};

export default LoadingMessage;
