import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BasemapSelector from '../BasemapSelector';


test('calls onChange with value as argument', () => {
  const changeFunc = jest.fn();
  render(
    <BasemapSelector
      data-testid={'select'}
      selectedBasemap={'USGSTopo'}
      onChange={changeFunc} />
  );

  userEvent.selectOptions(screen.getByRole('combobox'), 'USGSImageryTopo');
  expect(changeFunc).toHaveBeenCalledWith('USGSImageryTopo');
});
