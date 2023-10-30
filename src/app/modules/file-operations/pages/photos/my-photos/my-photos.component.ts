import {Component} from '@angular/core';
import {BaseComponent} from "../../../../../core/components/base.component";
import {FileService} from "../../../services/file.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../../../shared/modules/components/modals/confirm-modal/confirm-modal.component";
import {ImageScaleComponent} from "../../../../../shared/modules/components/modals/image-scale/image-scale.component";
import * as _ from "lodash";
import {AlertService} from "../../../../../shared/services/alert/alert.service";
import {ImageCompressorService} from "../../../../../shared/services/image-compressor.service";

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss']
})
export class MyPhotosComponent extends BaseComponent {
  photos: any[] = [];
  selectedPhotos: any[] = [];

  multipleChoose = false;
  list = false;
  gropedYears: any = [];
  gropedMonth: any = [];
  panelOpenState = false;

  constructor(private fileService: FileService, public dialog: MatDialog, private alertService: AlertService, private compressImgService: ImageCompressorService) {
    super();
  }

  override async ngOnInit(): Promise<void> {
    await this.getAllPhotos();

    await this.fileService.$photos.subscribe((p) => {
      console.log(p)
      this.photos = p;
    });

    this.getGroupedPhoto();
  }

  async getAllPhotos() {
    await this.fileService.setPhotos().then(photos => {
      this.photos = photos;
    })
      .catch(err => {
        if (err) {
          return;
        }
      });
  }


  async uploadPhotos(event: any) {
    const photos = event.target.files;
    console.log(event)
    if (!photos) {
      return
    }

    const formData = new FormData();
    for (const photo of photos) {
      formData.append('files', photo, `image-${photo.name}`)
    }

    await this.fileService.getApi().uploadMultiplePhotos(formData).then()
      .catch(err => {
        return
      });

    const thumbnail = await this.saveThumbnail(photos);

    if (!thumbnail) {
      this.alertService.Alert({title: 'Error', type: 'danger', html: 'thumbnail photos not created'});
    }

    const bg = await this.saveBackground(photos);

    if (!bg) {
      this.alertService.Alert({title: 'Error', type: 'danger', html: 'thumbnail photos not created'});
    }

    await this.getAllPhotos();
  }

  async saveThumbnail(files: any) {
    const photos = files;
    console.log(files)

    if (!photos) {
      console.log('not photo')
      return
    }
    const compressPhotos: any = [];

    await (async () => {
      for (const photo of photos) {
        const compressImage: any = await this.compressImgService.compressImageThumb(photo);
        compressPhotos.push(compressImage);
      }
    })()

    const formData = new FormData();

    for (const cPhoto of compressPhotos) {
      formData.append('files', cPhoto, `thumb-${cPhoto.name}`)
    }


    await this.fileService.getApi().uploadMultiplePhotos(formData).then()
      .catch(err => {
        return
      });

    return true;
  }

  async saveBackground(files: any) {
    const photos = files;
    console.log(files)

    if (!photos) {
      console.log('not photo')
      return
    }
    const compressPhotos: any = [];

    await (async () => {
      for (const photo of photos) {
        const compressImage: any = await this.compressImgService.compressImageBg(photo);
        compressPhotos.push(compressImage);
      }
    })()

    const formData = new FormData();

    for (const cPhoto of compressPhotos) {
      formData.append('files', cPhoto, `bg-${cPhoto.name}`)
    }


    await this.fileService.getApi().uploadMultiplePhotos(formData).then()
      .catch(err => {
        return
      });

    return true;
  }

  async deleteChooseFile() {
    const files = [];

    for (const file of this.selectedPhotos) {
      files.push(file.filename)
    }

    await this.fileService.getApi().deleteMultiplePhoto(files).then().catch(err => {
      return;
    });

    await this.fileService.setPhotos();
    this.selectedPhotos = [];
    this.multipleChoose = false;

    await this.alertService.Alert({title: 'Success', html: "delete file", type: "success"})
  }

  async filterPhotosYear(year: string) {
    this.photos = await this.fileService.setPhotos();
    if (year === 'all') {
      return;
    }
    this.photos = _.filter(this.photos, (photo) => photo.createdAt.startsWith(year));
  }

  async filterPhotosMonth(year: string, month: string) {
    console.log(year, month)
    this.photos = await this.fileService.setPhotos();
    this.photos = _.filter(this.photos, (photo) => (photo.createdAt.substring(0, 4).startsWith(year)) && (photo.createdAt.substring(5, 7).startsWith(month)));
  }

  async filterImageType(type: string) {
    this.photos = await this.fileService.setPhotos();
    if (type === 'all') {
      return;
    } else if (type === 'thumb') {
      this.photos = this.photos.filter((p) => p.type === 'thumb');
    } else if (type === 'bg') {
      this.photos = this.photos.filter((p) => p.type === 'bg');
    } else if (type === 'image') {
      this.photos = this.photos.filter((p) => p.type === 'image');
    }
  }


  openDialog(filename: string) {
    let modal = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
    });

    modal.afterClosed().subscribe(async (res) => {
      if (res === false) {
        return;
      }

      await this.fileService.getApi().deletePhoto(filename).then().catch(err => {
        return;
      });

      await this.fileService.setPhotos();

      await this.alertService.Alert({title: 'Success', html: "deleted file", type: "success"})
    })
  }

  chooseFile() {
    this.multipleChoose = !this.multipleChoose;
    this.selectedPhotos = [];
  }

  selectPhoto(i: number) {
    const control = this.selectedPhotos.find((f) => f.filename === this.photos[i].filename);

    if (control) {
      this.selectedPhotos = this.selectedPhotos.filter((f) => f.filename !== this.photos[i].filename);
      console.log(this.selectedPhotos)
      return
    }

    let select = false;
    select = !select;

    const addSelection = {
      ...this.photos[i],
      select: select,
    }


    this.selectedPhotos.push(addSelection);
    console.log(this.selectedPhotos)
  }

  scaleImage(image: any) {
    let modal = this.dialog.open(ImageScaleComponent, {
      maxWidth: '500px',
      maxHeight: '500px'
    });

    modal.componentInstance.image = image;
  }

  getGroupedPhoto() {
    const years = _.groupBy(this.photos, (photo) => photo.createdAt.substring(0, 4));

    const gropedYears: any = [];

    for (const year of Object.keys(years)) {
      gropedYears.push(year)
    }

    const yearArray: any = [];

    for (const year of Object.keys(years)) {
      yearArray.push(years[year])
    }

    const groupedMonth: any = [];
    for (const y of yearArray) {
      const el = _.groupBy(y, (p) => p.createdAt.substring(5, 7))
      groupedMonth.push(el)
    }

    console.log(groupedMonth)
    console.log(gropedYears)

    const data: any = [];

    for (const grEl of groupedMonth) {
      const el: any = [];
      console.log(grEl, 'l')
      for (const grElElement of Object.keys(grEl)) {
        el.push(grElElement)
      }
      data.push(el)
    }

    console.log(data)

    this.gropedYears = gropedYears;
    this.gropedMonth = data;
  }

  openFilterDate() {
    this.panelOpenState = !this.panelOpenState
  }
}

