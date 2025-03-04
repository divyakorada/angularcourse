import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { weatherData } from '../Models/weather.model';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=280bb60362883ed8d41912b705603213'; 

  environment = {
    weatherApiBaseUrl: 'https://open-weather-map27.p.rapidapi.com/weather',
    XRapidAPIHostHeaderName: 'X-RapidAPI-Host',
    XRapidAPIHostHeaderValue: 'open-weather-map27.p.rapidapi.com',
    XRapidAPIKeyHeaderName :'X-RapidAPI-Key',
    XRapidAPIKeyHeaderValue: 'b556fa202cmsh7665e694a05188ap1f8766jsn81fb9bc60768'
  }

  constructor(private http: HttpClient) { 
  }

  getWeatherData(city: string, units: string) {
   return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=280bb60362883ed8d41912b705603213&units=${units}`);
  }


  // getWeatherDt(cityName: string): Observable<weatherData> {
  //   return this.http.get<weatherData>(this.environment.weatherApiBaseUrl, {
  //     headers: new HttpHeaders()
  //     .set(this.environment.XRapidAPIHostHeaderName, this.environment.XRapidAPIHostHeaderValue)
  //     .set(this.environment.XRapidAPIKeyHeaderName, this.environment.XRapidAPIKeyHeaderValue),
  //     params: new HttpParams()
  //     .set('q', cityName)
  //     .set('appid', '280bb60362883ed8d41912b705603213')
  //     .set('units', 'metric')
  //     .set('mode', 'json')
  //   });
  // }


}
