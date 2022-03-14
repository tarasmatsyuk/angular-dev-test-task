import { Injectable } from '@angular/core';
import { ForecastMode, ForecastType, WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as ForecastActions from './forecast.actions';
import { map } from 'rxjs';
import { Forecast } from '../../utils/forecast';

@Injectable()
export class ForecastEffects {
	findCity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ForecastActions.findCity),
			fetch({
				run: action => {
					return this.weatherForecastApiService
						.getCity(action.q)
						.pipe(map(city => ForecastActions.findCitySuccess({ city, mode: action.mode })));
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ForecastActions.findCityFailure({ error });
				},
			})
		)
	);

	findCitySuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ForecastActions.findCitySuccess),
			map(action => {
				const actionType =
					action.mode === ForecastMode.Hourly
						? ForecastActions.loadHourlyForecast
						: ForecastActions.loadDailyForecast;
				return actionType({ city: action.city, mode: action.mode });
			})
		)
	);

	loadForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ForecastActions.loadHourlyForecast, ForecastActions.loadDailyForecast),
			fetch({
				run: action => {
					const { lat, lon } = action.city;
					return this.weatherForecastApiService.getForecast(lon, lat, action.mode).pipe(
						map(res => {
							const forecast = new Forecast(
								{ ...res, cityName: action.city.name } as ForecastType,
								action.mode
							);
							const actionType =
								action.mode === ForecastMode.Hourly
									? ForecastActions.loadHourlyForecastSuccess
									: ForecastActions.loadDailyForecastSuccess;
							return actionType({ forecast });
						})
					);
				},
				onError: (action, error) => {
					console.error('Error', error);
					const actionType =
						action.mode === ForecastMode.Hourly
							? ForecastActions.loadHourlyForecastFailure
							: ForecastActions.loadDailyForecastFailure;
					return actionType({ error });
				},
			})
		)
	);

	constructor(private actions$: Actions, private weatherForecastApiService: WeatherForecastApiService) {}
}
