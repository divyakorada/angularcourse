import { Component } from '@angular/core';
import { WeatherService } from 'src/assets/Services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  myWeatherData: any;
  WeatherData: any;
  temparature: number;
  fellsLike: number;
  pressure: number;
  humidity: number;
  summary: any;
  iconURL: string = `https://openweathermap.org/img/wn/01d@2x.png`;
  city: string = '';
  units: string = 'metric'; // standard, metric, imperial
  cityName: string = 'Denver';

  constructor(private ws: WeatherService) {}

  ngOnInit() {
    

   // this.getWeatherInfo(this.cityName);
  }

  getWeather() {
    this.ws.getWeatherData(this.city, this.units).subscribe(res => {
      this.myWeatherData = res;
      console.log('myWeatherData', this.myWeatherData);
      this.temparature = this.myWeatherData.main.temp;
      this.fellsLike = this.myWeatherData.main.feels_like;
      this.pressure = this.myWeatherData.main.pressure;
      this.humidity = this.myWeatherData.main.humidity;
      this.summary = this.myWeatherData.weather[0].main;
      this.iconURL = `https://openweathermap.org/img/wn/${this.myWeatherData.weather[0].icon}@2x.png`;
     }, error => {
        console.log(error);
     }
     );
  }

  onSubmit() {
    // this.getWeatherInfo(this.cityName);
    // this.cityName = '';
    this.getWeather();
  }


  // getWeatherInfo(cityName: string) {
  //   this.ws.getWeatherDt(this.cityName).subscribe(response => {
  //       this.WeatherData = response;
  //   });
  // }

}
