import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorServidorComponent } from './error-servidor.component';

describe('ErrorServidorComponent', () => {
  let component: ErrorServidorComponent;
  let fixture: ComponentFixture<ErrorServidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorServidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
