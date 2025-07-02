import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdd } from './registration-add';

describe('RegistrationAdd', () => {
  let component: RegistrationAdd;
  let fixture: ComponentFixture<RegistrationAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
