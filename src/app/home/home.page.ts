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

  constructor(private sanitizer: DomSanitizer) {
    console.log('image source in constructor', this.imgSrc);
  }

  async performAction() {
    try {
      this.busy = true;
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      console.log("Photo", photo)

      const imageUrl = photo.webPath;
      console.log('image url', photo);
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

  async processImage(filename: string): Promise<string[]> {
    const data: TextDetections = await Ocr.detectText({ filename });

    const result: string[] = [];
    for (let detection of data.textDetections) {
      result.push(detection.text);
    }
    this.message = result.length === 0 ? 'No text was detected' : '';
    return result;
  }

  clearWindow() {
    this.busy = false;
    this.lines = [];
    this.imgSrc = '';
  }
}
