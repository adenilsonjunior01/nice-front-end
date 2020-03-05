import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPessoaisComponent } from './documentos-pessoais.component';

describe('DocumentosPessoaisComponent', () => {
  let component: DocumentosPessoaisComponent;
  let fixture: ComponentFixture<DocumentosPessoaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosPessoaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
