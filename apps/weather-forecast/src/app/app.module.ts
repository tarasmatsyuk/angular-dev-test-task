import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ForecastLayoutModule } from '@bp/forecast-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		WeatherForecastServicesModule,
		ForecastLayoutModule,
		RouterModule.forRoot([]),
		BrowserAnimationsModule,
		StoreModule.forRoot(
			{},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
