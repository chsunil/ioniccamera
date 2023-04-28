import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [Camera, PhotoLibrary],
})
export class CameraComponent implements OnInit {
  clickedImage: any;
  saveCaptureImage: any;
  options: CameraOptions = {
    quality: 99,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private camera: Camera, private photoLibrary: PhotoLibrary) { }
  ngOnInit() { }
  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
      this.saveImage(base64Image);
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  // Captured image should be saved in mobile gallery using photoLibrary plugin /
  saveImage(image: any) {
    const album = 'psd2web';
    this.saveCaptureImage = image;
    this.photoLibrary.saveImage(this.saveCaptureImage, album).then(res => {
      console.log('save Image ', JSON.stringify(res));
    }).catch(err => {
      console.log('copyFile error', JSON.stringify(err));
    });
  }


}
