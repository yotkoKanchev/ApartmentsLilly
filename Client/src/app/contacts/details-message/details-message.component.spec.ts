import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMessageComponent } from './details-message.component';

describe('DetailsMessageComponent', () => {
  let component: DetailsMessageComponent;
  let fixture: ComponentFixture<DetailsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
