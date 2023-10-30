import { Component } from '@angular/core';
import {BaseComponent} from "../../../../../core/components/base.component";
import {FileService} from "../../../../../modules/file-operations/services/file.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent{
  files: any[] = [];

  normalImg = 0;
  bgImage = 0;
  thumbImage = 0;
  constructor(private fileService: FileService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    await this.fileService.setPhotos();
    this.fileService.$photos.pipe(takeUntil(this.onDestroy$)).subscribe(f => {
      this.files = f;
      this.normalImg = f.filter((n: any) => n.type === 'image').length;
      this.bgImage = f.filter((n: any) => n.type === 'bg').length;
      this.thumbImage = f.filter((n: any) => n.type === 'thumb').length;
      console.log(this.files)
    })
  }

  async getUserFiles() {

  }
}
