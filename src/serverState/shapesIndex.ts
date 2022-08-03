import {useQuery} from '@tanstack/react-query';

import {fetchShapesIndex} from '../util/shapes';


const useShapesIndex = () => useQuery(['shapesIndex'], fetchShapesIndex);
export default useShapesIndex;
