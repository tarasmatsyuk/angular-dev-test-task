import { createAction, props } from '@ngrx/store';
import { ForecastMode } from '../../../../weather-forecast/services/src/lib/models/forecast-mode.enum';
import { City } from '../../../../weather-forecast/services/src/lib/models/city.interface';
import { Forecast } from '../../utils/forecast';

export const findCity = createAction('[Forecast] Find City', props<{ q: string; mode: ForecastMode }>());
export const findCitySuccess = createAction(
	'[Forecast] Find City Success',
	props<{ city: City; mode: ForecastMode }>()
);
export const findCityFailure = createAction('[Forecast] Find City Failure', props<{ error: any }>());

export const loadHourlyForecast = createAction(
	'[Forecast] Load Hourly Forecast',
	props<{ city: City; mode: ForecastMode }>()
);
export const loadHourlyForecastSuccess = createAction(
	'[Forecast] Load Hourly Forecast Success',
	props<{ forecast: Forecast }>()
);
export const loadHourlyForecastFailure = createAction(
	'[Forecast] Load Hourly Forecast Failure',
	props<{ error: any }>()
);

export const loadDailyForecast = createAction(
	'[Forecast] Load Daily Forecast',
	props<{ city: City; mode: ForecastMode }>()
);
export const loadDailyForecastSuccess = createAction(
	'[Forecast] Load Daily Forecast Success',
	props<{ forecast: Forecast }>()
);
export const loadDailyForecastFailure = createAction('[Forecast] Load Daily Forecast Failure', props<{ error: any }>());
