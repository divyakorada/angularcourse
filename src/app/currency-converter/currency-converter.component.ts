import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {

  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 0;
  showResult: string = '0';
  currencyData: any;
  exchangeRates: any;
  showSymbol: string = '';
  from:any;
  to:any;
 // configUrl = 'https://gist.githubusercontent.com/ibrahimhajjaj/a0e39e7330aebf0feb49912f1bf9062f/raw/d160e7d3b0e11ea3912e97a1b3b25b359746c86a/currencies-with-flags.json';
  configUrl = 'https://gist.githubusercontent.com/manishtiwari25/d3984385b1cb200b98bcde6902671599/raw/7faacec82c8e08a5c9918d4859573fe3c19a4a83/world_currency_symbols.json';
  exchangeRateUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCountryCodes();
  }

  fetchCountryCodes() {
    this.http.get(this.configUrl).subscribe(res => {
      this.currencyData = res;
      console.log('currencyData', this.currencyData);
    });
    this.http.get(this.exchangeRateUrl).subscribe(res => {
      this.exchangeRates = res;
      console.log('exchangeRateUrl', this.exchangeRates);
    });
  }

  convert() {
   this.from = this.exchangeRates.rates[this.fromCurrency];
   this.to = this.exchangeRates.rates[this.toCurrency];
   
    const selectedCurrency  = this.currencyData.find((s:any) => s.Code === this.toCurrency);
      if(selectedCurrency) {
        this.showSymbol = selectedCurrency.Symbol;
      }

   this.showResult = ((this.to / this.from) * this.amount).toFixed(2);
  }

  changeCurrency() {
    let saveCurrency;
    saveCurrency = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = saveCurrency;
  }

}

