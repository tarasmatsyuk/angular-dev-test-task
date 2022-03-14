import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ForecastsActions from './forecast.actions';
import { Forecast } from '../../utils/forecast';

export const FORECASTS_HOURLY_FEATURE_KEY = 'forecasts-hourly';

export interface State extends EntityState<Forecast> {
	selectId?: number;
	loaded: boolean;
	loading: boolean;
	error?: any;
}

export interface ForecastsHourlyPartialState {
	readonly [FORECASTS_HOURLY_FEATURE_KEY]: State;
}

export const forecastHourlyAdapter: EntityAdapter<Forecast> = createEntityAdapter<Forecast>({
	selectId: (forecast: Forecast) => `${forecast.dateTimes[0].time}-${forecast.cityName}`,
});

export const initialState: State = forecastHourlyAdapter.getInitialState({
	loaded: false,
	loading: false,
	error: null,
});

const forecastHourlyReducer = createReducer(
	initialState,
	on(ForecastsActions.loadHourlyForecast, state => {
		return { ...state, loaded: false, loading: true };
	}),
	on(ForecastsActions.loadHourlyForecastSuccess, (state, { forecast }) => {
		return forecastHourlyAdapter.addOne(forecast, { ...state, error: null, loaded: true, loading: false });
	}),
	on(ForecastsActions.loadHourlyForecastFailure, (state, { error }) => ({
		...state,
		error,
		loading: false,
		loaded: false,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return forecastHourlyReducer(state, action);
}
