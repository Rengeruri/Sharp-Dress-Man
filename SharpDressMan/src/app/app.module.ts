import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { AmplifyUIAngularModule } from "@aws-amplify/ui-angular";
import Amplify from "aws-amplify";
import awsConfig from '../aws-config';
import { MainComponent } from './main/main.component';
Amplify.configure(awsConfig);

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
