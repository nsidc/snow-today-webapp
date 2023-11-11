import React from 'react';
import {FaSnowflake} from 'react-icons/fa';

import '@src/style/loading.css';


interface ILoadingIconProps {
  size?: number;
}
const LoadingIcon: React.FC<ILoadingIconProps> = (props) => {
  const size = props.size || 14;
  return (
    <>
      <FaSnowflake
        className={'loading-spinner'}
        size={size}
      />
    </>
  );
}

export default LoadingIcon;
