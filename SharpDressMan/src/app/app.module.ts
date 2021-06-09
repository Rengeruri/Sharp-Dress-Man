import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { AmplifyUIAngularModule } from "@aws-amplify/ui-angular";
import Amplify from "aws-amplify";
import awsConfig from '../aws-config';
import { MainComponent } from './main/main.component';
import { DialogComponent } from "./dialog/dialog.component";

Amplify.configure(awsConfig);

@NgModule({
  declarations: [AppComponent, MainComponent, DialogComponent],
  imports: [
    AmplifyUIAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    IvyCarouselModule,
    SimpleNotificationsModule.forRoot()
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
