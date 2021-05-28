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
  public eventFiles = null;
  public costumNotifi = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true
  };
  public eventsExamples = [
    {text:"El día de ayer falleció el primo de un amigo, así que mañana iremos a su funeral.", urlAvatar:"https://amigosgringos.com/wp-content/uploads/avatars/149/5b74e33d30a27-bpfull.jpg", name:"John Santana"},
    {text:"Esta semana tengo varias cenas con varios amigos y no sé qué usar.", urlAvatar:"https://64.media.tumblr.com/e2de105c22f705fa0bfe0567155445d5/tumblr_o7mzm2ucGQ1v4d8dyo1_1280.jpg", name:"Mario Ortiz"},
    {text:"Mi prima me invito a la fiesta por la boda de una de sus conocidas.", urlAvatar:"https://i.pinimg.com/280x280_RS/8f/c6/b6/8fc6b6364c319b9881b184baf7f8889d.jpg", name:"Julio Martinez"},
    {text:"A fin de año tendremos nuestra graduación por terminar la universidad.", urlAvatar:"https://i.pinimg.com/originals/54/35/8f/54358f662fcaa975582b0be0388befe6.jpg", name:"Jesus Bautista"},
    {text:"Me estoy preparando para ir a la carrera que habrá cerca de mi ciudad.", urlAvatar:"https://i.pinimg.com/originals/58/b8/eb/58b8eb55a97dec538fffb7c4c913000c.jpg", name:"Arturo Saavedra"},
  ];
  public virtualCloset = [
    {filter:"design", id:"item-1", href:"#item-1", title:"Prueba con el primer coso", urlImage:"https://sharpdressmand95b3129052c40c582ac6770b4521fa5170224-dev.s3.amazonaws.com/public/us-east-1%3A97efdc5f-a9c7-4247-84b7-c3b114bafad1/Dogs+and+Puppies+-+The+Answers+You+Seek+About+Dogs+Are+Here+-+Dogs+Stuff.jfif"},
    {filter:"photos", id:"item-2", href:"#item-2", title:"3D Bag Mockup", urlImage:"https://sharpdressmand95b3129052c40c582ac6770b4521fa5170224-dev.s3.amazonaws.com/public/us-east-1:97efdc5f-a9c7-4247-84b7-c3b114bafad1/saco.jpg"},
    {filter:"design", id:"item-3", href:"#item-3", title:"Modern Bag Design", urlImage:"http://exill.dk/demo/codex/template/img/item-3.jpg"},
    {filter:"brand", id:"item-4", href:"#item-4", title:"Coffee Cup Design", urlImage:"http://exill.dk/demo/codex/template/img/item-4.jpg"},
    {filter:"brand", id:"item-5", href:"#item-5", title:"T-Shirt Design", urlImage:"http://exill.dk/demo/codex/template/img/item-5.jpg"},
    {filter:"photos", id:"item-6", href:"#item-6", title:"Packaging Box Mockup", urlImage:"http://exill.dk/demo/codex/template/img/item-6.jpg"}
  ];

  constructor(private service: NotificationsService ) {  }

  async ngOnInit() {
    this.userData = await Auth.currentUserInfo();  
    API.post('sdmApiTest', '/virtual-closet', {
      body: {userId:this.userData.id}
    }).then(responde => {
      console.log(responde.body);
    });
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

  handleUpload(event) {
    this.eventFiles = event.target.files;
  }

  async uploadFile() {
    let files = (<HTMLInputElement>document.getElementById('archivoASubir')).files; 
    if(files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        try {
          let key = this.userData.id +"/"+files[i].name;
          let fileName = files[i].name;
          const reader = new FileReader();
          reader.readAsDataURL(this.eventFiles[i]);
          reader.onload = () => {
            API.post('sdmApiTest', '/image', {
              body: {userId:this.userData.id, fileName:fileName, image:reader.result, key:key}
            }).then(response => {
              console.log(response);
              if(response["body"] != undefined) {
                API.post('sdmApiTest', '/database', {
                  body: response
                }).then(responses => {
                  console.log(responses);
                });
              }
            });
          };
          this.service.success("Carga completa", "Imagen " + (i+1).toString() + " subida con éxito", this.costumNotifi);
        } catch (err) {
          console.log('Error uploading file: ', err);
          this.service.error("Hubo un error", err, this.costumNotifi);
        }  
      }
    } else {
      this.service.error("Hubo un error", "Falta ingresar una imagen", this.costumNotifi);
    }
  }

  uploadText(){
    let text = (<HTMLInputElement>document.getElementById('textData')).value;
    if(text.length > 0 ) {
      API.post('sdmApiTest','/text',{
        body: {text:text, userId:this.userData.id}
      }).then(responde => {
        console.log(responde);
      }).catch(error => {
        this.service.error("Hubo un error", error, this.costumNotifi);
      });
      this.service.success("Mensaje enviado", "Texto subido con éxito", this.costumNotifi);
    } else {
      this.service.error("Hubo un error", "Falta ingresar texto", this.costumNotifi);
    }
  }
}
