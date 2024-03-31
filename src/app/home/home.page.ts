import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imgSrc: SafeUrl | undefined;
  lines: string[] = [];
  message: string = '';
  busy = false;

  constructor(private sanitizer: DomSanitizer) { }

  async takePic() {
    try {
      this.busy = true;
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      const imageUrl = photo.webPath;
      if (!imageUrl) return;
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      const path = photo.path;
      if (!path) return;
      this.lines = await this.processImage(path);
    } catch (err) {
      alert(err);
    } finally {
      this.busy = false;
    }
  }
  // async takePhoto() {
  //   try {
  //     this.busy = true;
  //     const photo = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: true,
  //       resultType: CameraResultType.Uri,
  //       source: CameraSource.Prompt
  //     });
  //     const imageUrl = photo.webPath;
  //     if (!imageUrl) return;
  //     this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  //     const path = photo.path;
  //     if (!path) return;
  //     this.lines = await this.processImage(path);
  //   } catch (err) {
  //     alert(err);
  //   } finally {
  //     this.busy = false;
  //   }
  // }

  async processImage(filename: string): Promise<string[]> {
    const data: TextDetections = await Ocr.detectText({ filename });

    console.log(data);
    const result: string[] = [];
    for (let detection of data.textDetections) {
      result.push(detection.text);

    }
    this.message = result.length === 0 ? 'No text was detected' : '';
    return result;
  }

  clearWindow() {
    this.busy = false;
    this.lines = []
    this.imgSrc = ''
  }

}
