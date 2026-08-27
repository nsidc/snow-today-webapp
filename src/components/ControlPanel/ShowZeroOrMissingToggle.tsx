import React from 'react';
import {useAtom} from 'jotai';

import {showZeroOrMissingEnabledAtom} from '@src/state/client/showZeroOrMissingEnabled';

const ShowZeroOrMissingToggle: React.FC = () => {
  const [showZeroOrMissingEnabled, setShowZeroOrMissingEnabled] = useAtom(showZeroOrMissingEnabledAtom);

  return (
    <span className={'ShowZeroOrMissingToggle'}>
      <label htmlFor={'showzeromissing-toggle-checkbox'}>
        {'Show Zero/Missing SWE Values:'}
      </label>
      <input id={'showzeromissing-toggle-checkbox'}
        type={'checkbox'}
        checked={showZeroOrMissingEnabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setShowZeroOrMissingEnabled(e.target.checked);
        }} />
    </span>
  );
}

export default ShowZeroOrMissingToggle;
