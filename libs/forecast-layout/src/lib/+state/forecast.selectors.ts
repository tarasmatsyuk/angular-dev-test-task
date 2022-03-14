import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './selected-city.reducer';
import { FORECAST_KEY, ForecastState } from './index';
import { forecastHourlyAdapter, State as StateForecastHourly } from './forecast-hourly.reducer';
import { forecastDailyAdapter, State as StateForecastDaily } from './forecast-daily.reducer';

export const getForecastState = createFeatureSelector<ForecastState>(FORECAST_KEY);

export const getSelectedCityState = createSelector(getForecastState, (state: ForecastState) => state.selectedCity);
export const getHourlyForecastState = createSelector(getForecastState, (state: ForecastState) => state.hourly);
export const getDailyForecastState = createSelector(getForecastState, (state: ForecastState) => state.daily);

export const getSelectedCity = createSelector(getSelectedCityState, (state: State) => state.selectedCity);
export const getSelectedCityLoading = createSelector(getSelectedCityState, (state: State) => state.loading);
export const getSelectedCityError = createSelector(getSelectedCityState, (state: State) => state.error);

const { selectAll: selectAllHourly } = forecastHourlyAdapter.getSelectors();
const { selectAll: selectAllDaily } = forecastDailyAdapter.getSelectors();

export const getHourlyForecast = createSelector(getHourlyForecastState, (state: StateForecastHourly) =>
	selectAllHourly(state)
);
export const getHourlyForecastLoading = createSelector(
	getHourlyForecastState,
	(state: StateForecastHourly) => state.loading
);
export const getHourlyForecastError = createSelector(
	getHourlyForecastState,
	(state: StateForecastHourly) => state.error
);

export const getDailyForecast = createSelector(getDailyForecastState, (state: StateForecastDaily) =>
	selectAllDaily(state)
);
export const getDailyForecastLoading = createSelector(
	getDailyForecastState,
	(state: StateForecastDaily) => state.loading
);
export const getDailyForecastError = createSelector(getDailyForecastState, (state: StateForecastDaily) => state.error);
