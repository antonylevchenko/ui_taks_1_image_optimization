import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { CdkVirtualScrollViewport, ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html'
})
export class ImageListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  public selectedImageName: string;
  public images: any[] = [];
  // public items: any[] = [];

  imagesForList: string[];

  constructor(private imageService: ImageService) {
  }

  // public items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  ngOnInit(): void {
    this.updateImagesList();
  }

  updateImagesList() {
    this.imageService.getImageList().subscribe(res => {
      this.images = [];
      res.forEach(image => {
        this.images.push({
          name: image,
          url: this.imageService.getPathForMinifiedImage(image),
          show: false
        });
      });
      this.images = Array.from(this.images);
      if (this.selectedImageName == null) {
        this.selectedImageName = this.images[0].name;
      }
      console.log(this.images);
    });
  }

  changeImageSelection(newName: string) {
    console.log(newName);
    this.selectedImageName = newName;
  }



}
