import { TestBed, inject } from '@angular/core/testing';

import { MongoColeccionService } from './mongo-coleccion.service';

describe('MongoColeccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MongoColeccionService]
    });
  });

  it('should be created', inject([MongoColeccionService], (service: MongoColeccionService) => {
    expect(service).toBeTruthy();
  }));
});
