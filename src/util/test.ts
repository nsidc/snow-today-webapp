import {useEffect} from 'react';
import {RecoilValue, useRecoilValue} from 'recoil';


// Pattern from:
//     https://recoiljs.org/docs/guides/testing/
export const RecoilObserver = <T>(
  {node, onChange}: {node: RecoilValue<T>, onChange: (val: T) => void},
): null => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
