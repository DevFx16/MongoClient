import { TestBed, inject } from '@angular/core/testing';

import { MongoConexionService } from './mongo-conexion.service';

describe('MongoConexionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MongoConexionService]
    });
  });

  it('should be created', inject([MongoConexionService], (service: MongoConexionService) => {
    expect(service).toBeTruthy();
  }));
});
