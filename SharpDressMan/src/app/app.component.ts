import { Component } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SharpDressMan';
}
