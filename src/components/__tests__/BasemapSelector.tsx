import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';
import {RecoilRoot} from 'recoil';

import BasemapSelector from '../ControlPanel/BasemapSelector';
import selectedBasemapNameAtom from '../../state/client/selectedBasemapName';
import {RecoilObserver} from '../../util/test';


test('Calls onChange with value as argument', () => {
  const changeFunc = jest.fn();

  render(
    <RecoilRoot>
      <RecoilObserver node={selectedBasemapNameAtom} onChange={changeFunc} />
      <BasemapSelector data-testid={'select'} />
    </RecoilRoot>
  );

  const basemapName = 'USGS';

  userEvent.click(screen.getByText('Select a Basemap'));
  debugger;
  userEvent.click(screen.getByText(basemapName));

  expect(changeFunc).toHaveBeenCalledWith(basemapName);
});
