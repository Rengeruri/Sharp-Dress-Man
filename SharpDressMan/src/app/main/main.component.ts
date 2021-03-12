import { Component, OnInit, Input } from '@angular/core';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() username: string | undefined;
  public userData;

  constructor() { }

  async ngOnInit() { 
    API.get('sdmApiTest','/demo',{}).then(responde => {
      console.log(responde);
    })
    this.userData = await Auth.currentUserInfo();
  }

}
