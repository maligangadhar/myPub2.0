import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfeedPassbackComponent } from './infeed-passback.component';
import { FormsModule } from '@angular/forms';
import { BroadcastService } from '../../../../../services/broadcast.service';

describe('InfeedPassbackComponent', () => {
  let component: InfeedPassbackComponent;
  let fixture: ComponentFixture<InfeedPassbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfeedPassbackComponent],
      imports: [FormsModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfeedPassbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
