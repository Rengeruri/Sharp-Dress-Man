import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  public S3name = "https://sharpdressmand95b3129052c40c582ac6770b4521fa5170224-dev.s3.amazonaws.com/public/";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    /*let path: string = "";
    for(let i=0; i<this.data.body.length; i++){
      console.log("Tipo de prenda" + i);
      for(let j=0; j<this.data.body[i].length; j++){
        console.log(this.data.body[i][j].nombre);
        path = this.S3name + this.data.body[i][j].idUsuario + "/" +this.data.body[i][j].imagen;
        console.log(path);
      }
    }*/
  }
}
