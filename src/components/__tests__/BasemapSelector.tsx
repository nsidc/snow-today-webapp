import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RecoilRoot} from 'recoil';
import {vi} from 'vitest';

import BasemapSelector from '../ControlPanel/BasemapSelector';
import selectedBasemapNameAtom from '../../state/client/selectedBasemapName';
import {RecoilObserver} from '../../util/test';


test('Calls onChange with value as argument', async () => {
  const changeFunc = vi.fn();

  render(
    <RecoilRoot>
      <RecoilObserver node={selectedBasemapNameAtom} onChange={changeFunc} />
      <BasemapSelector data-testid={'select'} />
    </RecoilRoot>
  );

  await userEvent.click(screen.getByText('Select a Basemap'));
  await userEvent.click(screen.getByText('USGS Topographic + Imagery'));

  expect(changeFunc).toHaveBeenCalledWith('USGS Topographic + Imagery');
});
