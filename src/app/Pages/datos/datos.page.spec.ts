import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPage } from './datos.page';

describe('DatosPage', () => {
  let component: DatosPage;
  let fixture: ComponentFixture<DatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
