import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GrdFilterPipe } from '../../../../pipes/GrdFilterPipe';
import { SearchComponent } from './search.component';
import { BroadcastService } from '../../../../services/broadcast.service';
import { SiteService } from '../../../../services/site.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { NoResultsComponent } from '../../../../components/no-results/no-results.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GcloginComponent } from '../gclogin/gclogin.component';
import { DetailSPComponent } from '../detail/detail.component';
import { SiteDetailComponent } from '..';
import { ArraySortPipe } from '../../../../pipes/sort-filter.pipe';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSPComponent, GcloginComponent, GrdFilterPipe, NoResultsComponent, SearchComponent, ArraySortPipe],
      imports: [FormsModule, HttpClientModule, MessagesModule, RouterTestingModule, ScrollingModule],
      providers: [BroadcastService, SiteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'login', component: GcloginComponent },
      { path: 'spDetail', component: DetailSPComponent },
      { path: 'placements', component: SiteDetailComponent },
    ]);
    fixture.detectChanges();
  });


  it('#getSearchDetails should call getSpList of SiteService if SearchText exists', () => {
    let siteService: SiteService;
    siteService = TestBed.get(SiteService);
    const spy = spyOn(siteService, 'getSPList').and.callThrough();
    component.getSearchDetails('test');
    expect(spy).toHaveBeenCalled();
  });


  it('#OnClearSearch should empty globalSearchText and call #OnSearch of HeaderComponent', () => {
    component.searchText = 'test';
    component.onClearSearch();
    expect(component.searchText).toBe('');
    expect(component.rowCount).toBe(0);
  });

});
