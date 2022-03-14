import * as fromSelectedCity from './selected-city.reducer';
import * as fromHourlyForecast from './forecast-hourly.reducer';
import * as fromDailyForecast from './forecast-daily.reducer';

export const FORECAST_KEY = 'forecast';

export interface ForecastState {
	selectedCity: fromSelectedCity.State;
	hourly: fromHourlyForecast.State;
	daily: fromDailyForecast.State;
}

export const reducers = {
	selectedCity: fromSelectedCity.reducer,
	hourly: fromHourlyForecast.reducer,
	daily: fromDailyForecast.reducer,
};
