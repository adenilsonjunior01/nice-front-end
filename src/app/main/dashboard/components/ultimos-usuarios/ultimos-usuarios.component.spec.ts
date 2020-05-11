import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosUsuariosComponent } from './ultimos-usuarios.component';

describe('UltimosUsuariosComponent', () => {
  let component: UltimosUsuariosComponent;
  let fixture: ComponentFixture<UltimosUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimosUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
