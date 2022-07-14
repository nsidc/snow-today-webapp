import React from 'react';
import {useRecoilCallback} from 'recoil';


const DebugDumpButton: React.FC = () => {
  const onClick = useRecoilCallback(({snapshot}) => async () => {
    console.debug('Atom values:');
    Array.from(snapshot.getNodes_UNSTABLE()).forEach(async (node) => {
      const value = await snapshot.getPromise(node);
      console.debug(node.key, value);
    });
  }, []);

  return <button onClick={onClick}>Dump State</button>
}

export default DebugDumpButton;
