/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverListComponent } from './overList.component';

describe('OverListComponent', () => {
  let component: OverListComponent;
  let fixture: ComponentFixture<OverListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
