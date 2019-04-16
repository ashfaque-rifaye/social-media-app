import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; //Import the Angular HttpClientModule in the root AppModule and  inject the HttpClient into an application class
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MonthValueGenerator} from './date-picker/date-picker.component';
import { MonthYearChangeReflectorDirective } from './date-picker/date-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    MonthValueGenerator,
    MonthYearChangeReflectorDirective,
    DatePickerComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // import HttpClientModule after BrowserModule.
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule //Important declaraion for NgModel
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [MonthYearChangeReflectorDirective]
})


export class AppModule { }
