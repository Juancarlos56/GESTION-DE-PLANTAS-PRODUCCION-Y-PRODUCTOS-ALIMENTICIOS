import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlantasComponent } from './form-plantas.component';

describe('FormPlantasComponent', () => {
  let component: FormPlantasComponent;
  let fixture: ComponentFixture<FormPlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlantasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
