import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  recording : boolean = false;
  @ViewChild('video') private video: any;
  @ViewChild('canvas') private canvas: any;

  constructor() {}

  initCameraStream() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 360
        }
      })
      .then(stream => { 
        this.recording = true;
        this.video = this.video.nativeElement;
        this.video.srcObject = stream;
      });
    }
    else {
        console.log(`ERRO AO CAPTURAR`)
    }
  }


  capture(event: any) {
    event.preventDefault();
    var context = this.canvas.nativeElement.getContext("2d");
    context.drawImage(this.video, 0, 0, 500, 380);
    var picture: any = this.canvas.nativeElement.toDataURL();
    console.log(`picture`, picture)
    this.recording = false;
  }
}
