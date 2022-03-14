import { ForecastMode } from '@bp/weather-forecast/services';

export const isEmptyMode = (mode: ForecastMode) => {
	return !mode || (mode !== ForecastMode.Daily && mode !== ForecastMode.Hourly);
};
