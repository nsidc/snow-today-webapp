import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BasemapSelector from '../BasemapSelector';
import {
  basemapLayersByName,
  basemapUsgsTopo,
  basemapUsgsImageryTopo,
} from '../../util/layers';


test('calls onChange with value as argument', async () => {
  const changeFunc = jest.fn();
  render(
    <BasemapSelector
      data-testid={'select'}
      basemapLayersByName={basemapLayersByName}
      selectedBasemap={basemapUsgsTopo}
      onChange={changeFunc} />
  );

  await userEvent.selectOptions(
    screen.getByRole('combobox'),
    'USGS Topographic + Imagery',
  );
  expect(changeFunc).toHaveBeenCalledWith(basemapUsgsImageryTopo);
});
