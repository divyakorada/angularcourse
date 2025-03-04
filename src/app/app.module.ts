import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollDirective } from './scroll.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductOneComponent } from './product-one/product-one.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { EcommerceProductsComponent } from './ecommerce-products/ecommerce-products.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CounterComponent } from './counter/counter.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizImprovedComponent } from './quiz-improved/quiz-improved.component';
import { ChangeBgDirective } from './../assets/Directives/change-bg.directive';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { URLShortnerComponent } from './url-shortner/url-shortner.component';
import { ShortUrlPipe } from 'src/assets/Pipes/short-url.pipe';
import { NotePadAppComponent } from './note-pad-app/note-pad-app.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { PaginationComponent } from './pagination/pagination.component';
import { WeatherComponent } from './weather/weather.component';
import { FormValidatorComponent } from './form-validator/form-validator.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from 'src/assets/Services/auth.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ScrollDirective,
    ProductOneComponent,
    EcommerceProductsComponent,
    CalculatorComponent,
    CurrencyConverterComponent,
    CounterComponent,
    QuizComponent,
    QuizImprovedComponent,
    ChangeBgDirective,
    StarRatingComponent,
    URLShortnerComponent,
    ShortUrlPipe,
    NotePadAppComponent,
    PasswordGeneratorComponent,
    PaginationComponent,
    WeatherComponent,
    FormValidatorComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzSliderModule,
    NzDrawerModule,
    FontAwesomeModule
  ],
  providers: [AuthService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
