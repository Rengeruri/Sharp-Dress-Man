import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AmplifyUIAngularModule } from "@aws-amplify/ui-angular";
import Amplify from "aws-amplify";
import awsConfig from '../aws-config';
import { MainComponent } from './main/main.component';
Amplify.configure(awsConfig);

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    AmplifyUIAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
