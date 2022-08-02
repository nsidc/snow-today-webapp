import React from 'react';
import {useRecoilCallback} from 'recoil';

import '../style/DebugDumpButton.css';


const DebugDumpButton: React.FC = () => {
  const onClick = useRecoilCallback(({snapshot}) => async () => {
    console.debug('Atom values:');

    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node);
      console.debug(node.key, value);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <button className={'DebugDumpButton'} onClick={onClick}>Dump State</button>
}

export default DebugDumpButton;
