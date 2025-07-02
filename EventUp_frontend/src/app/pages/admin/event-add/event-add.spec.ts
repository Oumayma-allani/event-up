import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAdd } from './event-add';

describe('EventAdd', () => {
  let component: EventAdd;
  let fixture: ComponentFixture<EventAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
