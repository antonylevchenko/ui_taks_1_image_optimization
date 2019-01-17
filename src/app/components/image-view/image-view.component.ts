import { Component, Input, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
})
export class ImageViewComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private imageService: ImageService) {}
  public imagePath = '';

  private _name: string;
  @Input() set name(value: string) {
    this._name = value;
    this.imagePath = this.imageService.getPathForNormalImage(this._name);
  } get name() {return this._name;}

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAddingOrRemoval = new EventEmitter<boolean>();

  public uploadImage() {
    const files = this.fileInput.nativeElement.files;
        if (files) {
          this.imageService.add(files).subscribe(res => {
            this.onAddingOrRemoval.emit(true);
          }
        );
      }
  }

  public removeImage() {
    console.log(this.name)
    this.imageService.remove(this.name).subscribe(res => {
      this.onAddingOrRemoval.emit(true);
    });
  }
}
