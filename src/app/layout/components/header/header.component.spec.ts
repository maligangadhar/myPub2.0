import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteService } from '../../../services/site.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { GcloginComponent } from '../../supply-partner/components/gclogin/gclogin.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [SiteService, BroadcastService],
      imports: [FormsModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'login', component: GcloginComponent }
    ]);
    fixture.detectChanges();
  });

  it('#OnClearSearch should empty globalSearchText and call #OnSearch of HeaderComponent', () => {
    component.globalSearchText = 'test';
    const spy = spyOn(component, 'onSearch').and.callThrough();

    component.onClearSearch();
    expect(component.globalSearchText).toBe('');
    expect(spy).toHaveBeenCalled();
  });

  it('#getCurrentUserDetails should call #getCurrentUserDetails of SiteService', () => {
    let siteService: SiteService;
    siteService = TestBed.get(SiteService);
    const spy = spyOn(siteService, 'getCurrentUserDetails').and.callThrough();

    component.getCurrentUserDetails();
    expect(spy).toHaveBeenCalled();
  });
});
