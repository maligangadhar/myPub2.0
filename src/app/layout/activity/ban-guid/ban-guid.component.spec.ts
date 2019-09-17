import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanGUIDComponent } from './ban-guid.component';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpCheckboxComponent } from '../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { BroadcastService } from '../../../services/broadcast.service';
import { SiteService } from '../../../services/site.service';
import { PlacementService } from '../../../services/placement.service';
import { SiteDetailComponent } from '../../supply-partner/components';
import { GrdFilterPipe } from '../../../pipes/GrdFilterPipe';
import { PaginatorModule } from 'primeng/paginator';

describe('BanGUIDComponent', () => {
  let component: BanGUIDComponent;
  let fixture: ComponentFixture<BanGUIDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BanGUIDComponent, GrdFilterPipe, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, HttpClientModule, MessagesModule, PaginatorModule, RouterTestingModule],
      providers: [BroadcastService, SiteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanGUIDComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'placements', component: SiteDetailComponent },
    ]);
    fixture.detectChanges();
  });

  it('#getBannedDetails should call getBannedGUIDList of SiteService with a page number', () => {
    let placementService: PlacementService;
    const page: number = 2;
    placementService = TestBed.get(PlacementService);
    const spy = spyOn(placementService, 'getBannedGUIDList').and.callThrough();
    component.getBannedDetails(page);
    expect(spy).toHaveBeenCalled();
  });
});
