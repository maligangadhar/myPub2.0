import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviewPassbackComponent } from './inview-passback.component';
import { FormsModule } from '@angular/forms';
import { BroadcastService } from '../../../../../services/broadcast.service';

describe('InviewPassbackComponent', () => {
  let component: InviewPassbackComponent;
  let fixture: ComponentFixture<InviewPassbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviewPassbackComponent],
      imports: [FormsModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviewPassbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
