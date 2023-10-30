import {Component, Input} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-image-scale',
  templateUrl: './image-scale.component.html',
  styleUrls: ['./image-scale.component.scss']
})
export class ImageScaleComponent {
  constructor(public dialogRef: DialogRef<ImageScaleComponent>) {
  }

  @Input('image') image: any;

}
