import React from 'react';
import {useRecoilCallback} from 'recoil';


const DebugDumpButton: React.FC = () => {
  const onClick = useRecoilCallback(({snapshot}) => async () => {
    console.debug('Atom values:');

    for (const node of snapshot.getNodes_UNSTABLE()) {
      const value = await snapshot.getPromise(node);
      console.debug(node.key, value);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <button onClick={onClick}>Dump State</button>
}

export default DebugDumpButton;