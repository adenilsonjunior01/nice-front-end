import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasEmpresasComponent } from './ultimas-empresas.component';

describe('UltimasEmpresasComponent', () => {
  let component: UltimasEmpresasComponent;
  let fixture: ComponentFixture<UltimasEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimasEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
