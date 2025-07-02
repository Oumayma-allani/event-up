import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEdit } from './event-edit';

describe('EventEdit', () => {
  let component: EventEdit;
  let fixture: ComponentFixture<EventEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
