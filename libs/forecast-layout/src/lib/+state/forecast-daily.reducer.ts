import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';

import * as ForecastsActions from './forecast.actions';
import { Forecast } from '../../utils/forecast';

export const FORECAST_DAILY_FEATURE_KEY = 'forecast-daily';

export interface State extends EntityState<Forecast> {
	selectId?: string;
	loaded: boolean;
	loading: boolean;
	error?: any;
}

export interface ForecastsHourlyPartialState {
	readonly [FORECAST_DAILY_FEATURE_KEY]: State;
}

export const forecastDailyAdapter: EntityAdapter<Forecast> = createEntityAdapter<Forecast>({
	selectId: (forecast: Forecast) => `${forecast.dateTimes[0].time}-${forecast.cityName}`,
});

export const initialState: State = forecastDailyAdapter.getInitialState({
	loaded: false,
	loading: false,
	error: null,
});

const forecastDailyReducer = createReducer(
	initialState,
	on(ForecastsActions.loadDailyForecast, state => {
		return { ...state, loaded: false, loading: true };
	}),
	on(ForecastsActions.loadDailyForecastSuccess, (state, { forecast }) => {
		return forecastDailyAdapter.addOne(forecast, { ...state, error: null, loaded: true, loading: false });
	}),
	on(ForecastsActions.loadDailyForecastFailure, (state, { error }) => ({
		...state,
		error,
		loading: false,
		loaded: false,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return forecastDailyReducer(state, action);
}
