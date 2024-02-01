import type {Getter} from 'jotai';
import {atomFamily} from 'jotai/utils';
import {atomWithSuspenseQuery} from 'jotai-tanstack-query';
import deepEqual from 'fast-deep-equal';

import {fetchPlotData} from '@src/util/fetch/plotData';
import {IPlotPayload} from '@src/types/query/plotData';
import {ITileIdentifier} from '@src/types/layout';


export const SERVERSTATE_KEY_PLOT_DATA = 'plotData';
export type AtomValue = IPlotPayload;
export type AtomParameter = ITileIdentifier;
export const plotDataQueryAtomFamily = atomFamily(
  (params: {regionId: string, variableId: string}) => {
    const atm = atomWithSuspenseQuery<AtomValue>(
      // FIXME: This annotation is required to work around a bug:
      //        https://github.com/jotaijs/jotai-tanstack-query/issues/25
      (get: Getter) => {
        return {
          queryKey: [
            SERVERSTATE_KEY_PLOT_DATA,
            params.regionId,
            params.variableId,
          ],
          queryFn: async ({queryKey: [, regionId, variableId]}) => {
            // TODO: Why is regionId unknown??
            //       https://github.com/jotaijs/jotai-tanstack-query/issues/25
            return await fetchPlotData(regionId as string, variableId as string)
          },
        }
      }
    );
    atm.debugLabel = `plotDataQueryAtomFamily_region${params.regionId}-var${params.variableId}`;
    return atm;
  },
  deepEqual,  // TODO: Needs work?
);
