import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUserComponent } from './listar-user.component';

describe('ListarUserComponent', () => {
  let component: ListarUserComponent;
  let fixture: ComponentFixture<ListarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
