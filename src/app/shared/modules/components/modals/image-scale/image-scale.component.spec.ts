import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageScaleComponent } from './image-scale.component';

describe('ImageScaleComponent', () => {
  let component: ImageScaleComponent;
  let fixture: ComponentFixture<ImageScaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageScaleComponent]
    });
    fixture = TestBed.createComponent(ImageScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
