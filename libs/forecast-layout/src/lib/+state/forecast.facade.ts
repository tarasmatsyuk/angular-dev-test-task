import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ForecastsHourlyActions from './forecast.actions';
import * as ForecastSelectors from './forecast.selectors';
import { City, ForecastMode } from '@bp/weather-forecast/services';

@Injectable({
	providedIn: 'root',
})
export class ForecastFacade {
	selectedCity$ = this.store.pipe(select(ForecastSelectors.getSelectedCity));
	getSelectedCityLoading$ = this.store.pipe(select(ForecastSelectors.getSelectedCityLoading));
	selectedCityError$ = this.store.pipe(select(ForecastSelectors.getSelectedCityError));

	getHourlyForecast$ = this.store.pipe(select(ForecastSelectors.getHourlyForecast));
	getHourlyForecastLoading$ = this.store.pipe(select(ForecastSelectors.getHourlyForecastLoading));
	getHourlyForecastError$ = this.store.pipe(select(ForecastSelectors.getHourlyForecastError));

	getDailyForecast$ = this.store.pipe(select(ForecastSelectors.getDailyForecast));
	getDailyForecastLoading$ = this.store.pipe(select(ForecastSelectors.getDailyForecastLoading));
	getDailyForecastError$ = this.store.pipe(select(ForecastSelectors.getDailyForecastError));

	constructor(private readonly store: Store) {}

	findCity(q: string, mode: ForecastMode): void {
		this.store.dispatch(ForecastsHourlyActions.findCity({ q, mode }));
	}

	loadHourlyForecast(city: City, mode: ForecastMode): void {
		this.store.dispatch(ForecastsHourlyActions.loadHourlyForecast({ city, mode }));
	}

	loadDailyForecast(city: City, mode: ForecastMode): void {
		this.store.dispatch(ForecastsHourlyActions.loadDailyForecast({ city, mode }));
	}
}
