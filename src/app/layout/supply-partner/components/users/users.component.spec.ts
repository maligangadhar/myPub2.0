import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { UsersComponent } from './users.component';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { GrdFilterPipe } from '../../../../pipes/GrdFilterPipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BroadcastService } from '../../../../services/broadcast.service';
import { NoResultsComponent } from '../../../../components/no-results/no-results.component';
import { SpCheckboxComponent } from '../../../../components/sp-checkbox/sp-checkbox.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/checkbox';
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrdFilterPipe, UsersComponent, NoResultsComponent, SpCheckboxComponent],
      imports: [FormsModule, HttpClientModule, MessagesModule, PaginatorModule, RouterTestingModule, ScrollDispatchModule, AutoCompleteModule, CheckboxModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
