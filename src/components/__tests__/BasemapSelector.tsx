// import {render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// 
// import BasemapSelector from '../BasemapSelector';
// import {
//   basemapLayersMap,
//   basemapUstsTopo,
//   basemapUsgsImageryTopo,
// } from '../../util/layers';
// 
// 
// test('calls onChange with value as argument', () => {
//   const changeFunc = jest.fn();
//   render(
//     <BasemapSelector
//       data-testid={'select'}
//       basemaps={basemapLayersMap}
//       selectedBasemap={basemapUsgsTopo}
//       onChange={changeFunc} />
//   );
// 
//   userEvent.selectOptions(
//     screen.getByRole('combobox'),
//     'USGS Topographic + Imagery',
//   );
//   expect(changeFunc).toHaveBeenCalledWith(basemapUsgsImageryTopo);
// });
// TODO: Delete:
export {};
