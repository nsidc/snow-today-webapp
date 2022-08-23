import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RecoilRoot} from 'recoil';

import BasemapSelector from '../ControlPanel/BasemapSelector';
import selectedBasemapAtom from '../../clientState/selectedBasemap';
import {RecoilObserver} from '../../util/test';


test('calls onChange with value as argument', async () => {
  const changeFunc = jest.fn();

  render(
    <RecoilRoot>
      <RecoilObserver node={selectedBasemapAtom} onChange={changeFunc} />
      <BasemapSelector data-testid={'select'} />
    </RecoilRoot>
  );

  await userEvent.click(screen.getByText('Select a Basemap'));
  await userEvent.click(screen.getByText('USGS Topographic + Imagery'));

  expect(changeFunc).toHaveBeenCalledWith('USGS Topographic + Imagery');
});
