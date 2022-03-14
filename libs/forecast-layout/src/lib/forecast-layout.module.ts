import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ForecastListComponent } from './components/cities-forecast/forecast-list.component';
import { ForecastSearchComponent } from './components/filter/forecast-search.component';
import { ForecastEffects } from './+state/forecast.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { FORECAST_KEY, reducers } from './+state';
import { MaterialModule } from '@bp/material';

@NgModule({
	declarations: [ForecastSearchComponent, ForecastListComponent],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		StoreModule.forFeature(FORECAST_KEY, reducers),
		EffectsModule.forFeature([ForecastEffects]),
	],
	exports: [ForecastSearchComponent, ForecastListComponent],
	providers: [DatePipe],
})
export class ForecastLayoutModule {}
