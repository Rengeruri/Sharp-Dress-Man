import { Component, OnInit, Input } from '@angular/core';
import { API, Auth, Storage } from 'aws-amplify';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css',
    './css/bootstrap-custom.css',
    './css/ionicons.min.css',
    './css/owl.carousel.min.css',
    './css/owl.theme.default.min.css',
    './css/simplebar.min.css',
    './css/jquery.mb.YTPlayer.min.css',
    './css/main.css',
    './css/main-darkred.css'
  ]
})
export class MainComponent implements OnInit {
  @Input() username: string | undefined;
  public userData;

  constructor() { }

  async ngOnInit() {
    API.get('sdmApiTest', '/demo', {}).then(responde => {
      console.log(responde);
    })
    this.userData = await Auth.currentUserInfo();  
  }

  ngAfterViewInit(): void {
    this.loadScript("http://127.0.0.1:8887/main.js");
  }

  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  async uploadFile() {
    let files = (<HTMLInputElement>document.getElementById('archivoASubir')).files;
    for (var i = 0; i < files.length; i++) {
      try {
        let key = this.userData.id +"/"+files[i].name;
        await Storage.put(key, files[i], {
          // contentType: 'image/png' // contentType is optional
        });
        console.log("Listoo subido");
      } catch (err) {
        console.log('Error uploading file: ', err);
      }  
    }
  }

}
