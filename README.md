# Capacitor Image to Text

This sample application converts images captured from the camera to text (OCR) using the [Capacitor OCR plugin](https://github.com/dtarnawsky/capacitor-ocr).



1. Description:

Angular component that captures an image using Capacitor's Camera plugin and performs optical character recognition (OCR) using the Capacitor Community's Image-to-Text plugin, 

2. Dependencies:
List the external dependencies required for the component.

@angular/core
@angular/platform-browser
@capacitor/camera
@capacitor-community/image-to-text
4. Inputs and Outputs:
Inputs: None
Outputs: None
5. Properties:

imgSrc: SafeUrl | undefined - Holds the image source URL securely.
lines: string[] - Stores the detected text lines from the image.
message: string - Provides feedback or messages to the user.
busy: boolean - Indicates whether the component is currently processing.
6. Methods:

performAction(): Initiates the image capture and OCR process.
processImage(filename: string): Processes the captured image for text detection.
clearWindow(): Resets the component's state by clearing the image and text lines.


8. Additional Notes:




## How to build

Make sure you have installed the [Ionic CLI](https://ionicframework.com/docs/cli) then run the following:
```bash
npm install
npx ionic build
npx cap sync
```

To run on iOS (You'll need XCode installed):
```bash
npx cap run ios
```

or for Android (You'll need Android Studio installed):
```bash
npx cap run android
```
