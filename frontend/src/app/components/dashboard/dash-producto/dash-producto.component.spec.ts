import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProductoComponent } from './dash-producto.component';

describe('DashProductoComponent', () => {
  let component: DashProductoComponent;
  let fixture: ComponentFixture<DashProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
