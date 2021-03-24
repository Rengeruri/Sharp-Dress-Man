import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
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
  public costumNotifi = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true
  };

  constructor(private service: NotificationsService ) {  }

  async ngOnInit() {
    API.get('sdmApiTest', '/demo', {}).then(responde => {
      console.log(responde);
    });
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
        this.service.success("Carga completa", "Imagen subida con éxito", this.costumNotifi);
      } catch (err) {
        console.log('Error uploading file: ', err);
        this.service.error("Hubo un error", err, this.costumNotifi);
      }  
    }
  }

  uploadText(){
    let text = (<HTMLInputElement>document.getElementById('textData')).value;
    if(text.length > 0 ) {
      API.post('sdmApiTest','/text',{
        body: text
      }).then(responde => {
        console.log(responde);
      }).catch(error => {
        this.service.error("Hubo un error", error, this.costumNotifi);
      });
    } else {
      this.service.error("Hubo un error", "Falta ingresar texto", this.costumNotifi);
    }
  }
}
