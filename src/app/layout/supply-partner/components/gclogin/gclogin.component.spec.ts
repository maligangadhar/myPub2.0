import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcloginComponent } from './gclogin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BroadcastService } from '../../../../services/broadcast.service';

describe('GcloginComponent', () => {
  let component: GcloginComponent;
  let fixture: ComponentFixture<GcloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GcloginComponent],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
