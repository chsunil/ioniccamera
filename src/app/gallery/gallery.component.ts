import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [PhotoLibrary],
})
export class GalleryComponent implements OnInit {
  imageResponse: any;
  options: any;
  constructor(private photoLibrary: PhotoLibrary) { }

  async ngOnInit() {
    await this.photoLibrary.requestAuthorization(
      {
        read: true,
        write: true
      }
    );
    alert('Test');
    this.photoLibrary.getAlbums().then(res => {
      console.log('save Image ', JSON.stringify(res));
    }).catch(err => {
      console.log('copyFile error', JSON.stringify(err));
    }
    )
  }

}
