import { createReducer, on, Action } from '@ngrx/store';

import * as ForecastsActions from './forecast.actions';
import { City } from '@bp/weather-forecast/services';

export const SELECTED_CITY_FEATURE_KEY = 'selected-city';

export interface State {
	selectedCity?: City | null;
	loaded: boolean;
	loading: boolean;
	error?: any;
}

export interface ForecastsHourlyPartialState {
	readonly [SELECTED_CITY_FEATURE_KEY]: State;
}

export const initialState: State = {
	selectedCity: null,
	loaded: false,
	loading: false,
	error: null,
};

const selectedCityReducer = createReducer(
	initialState,
	on(ForecastsActions.findCity, state => {
		return { ...state, loaded: false, loading: true };
	}),
	on(ForecastsActions.findCitySuccess, (state, { city }) => {
		return { ...state, selectedCity: city, error: null, loaded: true, loading: false };
	}),
	on(ForecastsActions.findCityFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: State | undefined, action: Action) {
	return selectedCityReducer(state, action);
}
