import {useQuery} from '@tanstack/react-query';

import {fetchRegionsIndex} from '../util/fetch/regions';


const useRegionsIndex = (stateSetter) => useQuery(
  ['shapesIndex'],
  fetchRegionsIndex,
  {
    // set the selected shape to the first one in the data
    onSuccess: (data) => stateSetter(Object.keys(data)[0]),
  }
);
export default useRegionsIndex;
