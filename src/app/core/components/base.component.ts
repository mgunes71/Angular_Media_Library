import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<void> = new Subject<void>();

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await this.OnInit();
  }

  async ngOnDestroy(): Promise<void> {
    this.onDestroy$.next();
    // this.onDestroy$.unsubscribe();
    this.onDestroy$.complete();

    await this.OnDestroy();
  }

  async OnInit(): Promise<void> {
    // OnInit
  }

  async OnDestroy(): Promise<void> {
    // OnDestroy
  }
}
