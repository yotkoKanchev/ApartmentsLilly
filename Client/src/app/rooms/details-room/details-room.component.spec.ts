import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRoomComponent } from './details-room.component';

describe('DetailsRoomComponent', () => {
  let component: DetailsRoomComponent;
  let fixture: ComponentFixture<DetailsRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
