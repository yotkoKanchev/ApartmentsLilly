import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRequestComponent } from './details-request.component';

describe('DetailsRequestComponent', () => {
  let component: DetailsRequestComponent;
  let fixture: ComponentFixture<DetailsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
