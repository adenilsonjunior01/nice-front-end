import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroColaboradorComponent } from './registro-colaborador.component';

describe('RegistroColaboradorComponent', () => {
  let component: RegistroColaboradorComponent;
  let fixture: ComponentFixture<RegistroColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
