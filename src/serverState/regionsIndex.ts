import {useQuery} from '@tanstack/react-query';

import {fetchShapesIndex} from '../util/shapes';


const useRegionsIndex = (stateSetter) => useQuery(
  ['shapesIndex'],
  fetchShapesIndex,
  {
    // set the selected shape to the first one in the data
    onSuccess: (data) => stateSetter(Object.keys(data)[0]),
  }
);
export default useRegionsIndex;
