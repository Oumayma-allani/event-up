import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAdd } from './local-add';

describe('LocalAdd', () => {
  let component: LocalAdd;
  let fixture: ComponentFixture<LocalAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
