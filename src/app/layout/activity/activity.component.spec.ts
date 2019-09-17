import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import { GrdFilterPipe } from '../../pipes/GrdFilterPipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { NoResultsComponent } from '../../components/no-results/no-results.component';
import { GcloginComponent } from '../supply-partner/components/gclogin/gclogin.component';
import { BroadcastService } from '../../services/broadcast.service';


describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityComponent, GcloginComponent, GrdFilterPipe, NoResultsComponent],
      imports: [FormsModule, HttpClientModule, MessagesModule, PaginatorModule, RouterTestingModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'login', component: GcloginComponent }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
