import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosColaboradoresComponent } from './ultimos-colaboradores.component';

describe('UltimosColaboradoresComponent', () => {
  let component: UltimosColaboradoresComponent;
  let fixture: ComponentFixture<UltimosColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimosColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
