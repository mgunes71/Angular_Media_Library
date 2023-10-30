import {
  Directive,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DragDropDirective {
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();


    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      const target = {
        target: {
          files: files,
        }
      }
      this.fileDropped.emit(target);
    }
  }
}
