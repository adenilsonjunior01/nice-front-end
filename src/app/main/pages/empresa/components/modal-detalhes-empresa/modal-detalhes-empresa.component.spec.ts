import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalhesEmpresaComponent } from './modal-detalhes-empresa.component';

describe('ModalDetalhesEmpresaComponent', () => {
  let component: ModalDetalhesEmpresaComponent;
  let fixture: ComponentFixture<ModalDetalhesEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalhesEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalhesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
