import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [
    './dialog.component.css',
    '../main/css/bootstrap-custom.css',
    '../main/css/ionicons.min.css',
    '../main/css/owl.carousel.min.css',
    '../main/css/owl.theme.default.min.css',
    '../main/css/simplebar.min.css',
    '../main/css/jquery.mb.YTPlayer.min.css',
    '../main/css/main.css',
    '../main/css/main-darkred.css']
})

export class DialogComponent implements OnInit {
  public S3name = "https://sharpdressmand95b3129052c40c582ac6770b4521fa5170224-dev.s3.amazonaws.com/public/";
  public imagesSS = [];
  public imagesS = [];
  public imagesI = [];
  public imagesC = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    for(let j=0; j<this.data.body[0].length; j++){
      this.imagesSS.push({path: this.S3name + this.data.body[0][j].idUsuario + "/" +this.data.body[0][j].imagen});
      if(j > 3){
        break;
      }
    }
    for(let j=0; j<this.data.body[1].length; j++){
      this.imagesS.push({path: this.S3name + this.data.body[1][j].idUsuario + "/" +this.data.body[1][j].imagen});
      if(j > 3){
        break;
      }
    }
    for(let j=0; j<this.data.body[2].length; j++){
      this.imagesI.push({path: this.S3name + this.data.body[2][j].idUsuario + "/" +this.data.body[2][j].imagen});
      if(j > 3){
        break;
      }
    }
    for(let j=0; j<this.data.body[3].length; j++){
      this.imagesC.push({path: this.S3name + this.data.body[3][j].idUsuario + "/" +this.data.body[3][j].imagen});
      if(j > 3){
        break;
      }
    }
  }
}
