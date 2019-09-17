import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSideSettingComponent } from './client-side-setting.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';

describe('ClientSideSettingComponent', () => {
  let component: ClientSideSettingComponent;
  let fixture: ComponentFixture<ClientSideSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSideSettingComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSideSettingComponent);
    component = fixture.componentInstance;
    component.realImpactList = [
      {
        id: 'appNexus',
        type: 'real_impact',
        value: 'appNexus',
        enabled: false,
        disabled: true,
        map: 'inview_appnexus_enabled'
      },
      {
        value: 'openX',
        id: 'openX',
        enabled: false,
        type: 'real_impact',
        disabled: false,
        map: 'inview_openx_enabled'
      },
      {
        value: 'aol',
        id: 'aol',
        enabled: false,
        type: 'real_impact',
        disabled: false,
        map: 'inview_aol_enabled'
      }
    ];

    component.realDisplayList = [
      {
        id: 'appNexus',
        type: 'real_display',
        value: 'appNexus',
        enabled: false,
        disabled: false,
        map: 'inpage_appnexus_enabled'
      },
      {
        value: 'openX',
        id: 'openX',
        enabled: false,
        type: 'real_display',
        disabled: false,
        map: 'inpage_openx_enabled'
      },
      {
        value: 'aol',
        id: 'aol',
        enabled: false,
        type: 'real_display',
        disabled: false,
        map: 'inpage_aol_enabled'
      }
    ];
    component.infeedList = [
      {
        id: 'appNexus',
        value: 'appNexus',
        type: 'infeed_impact',
        enabled: false,
        disabled: false,
        map: 'infeed_appnexus_enabled'
      },
      {
        value: 'openX',
        id: 'openX',
        enabled: false,
        type: 'infeed_impact',
        disabled: false,
        map: 'infeed_openx_enabled'
      },
      {
        value: 'aol',
        id: 'aol',
        type: 'infeed_impact',
        enabled: false,
        disabled: false,
        map: 'infeed_aol_enabled'
      }
    ];
    fixture.detectChanges();
  });

  it('#selectAll should not change the values of objects in realDisplayList,realImpactList and infeedList if placementDetailsClientSide is missing ', () => {
    const  realImpactListTest = component.realImpactList;
    const realDisplayListTest = component.realDisplayList;
    const infeedListTest = component.infeedList;
    component.placementDetailsClientSide = [];
    
    component.selectAll();
    component.realImpactList.forEach(element => {
      // expect(element.enabled).toEqual();
    });
    component.realDisplayList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });
    component.infeedList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });

    expect(realImpactListTest).toEqual(component.realImpactList);
    expect(realDisplayListTest).toEqual(component.realDisplayList);
    expect(infeedListTest).toEqual(component.infeedList);
  });

  it('#selectAll should change the enabled attribute of each object in realDisplayList,realImpactList and infeedList to true ', () => {

    component.placementDetailsClientSide = [{
      'inview_appnexus_enabled': false,
      'inview_openx_enabled': false,
      'inview_criteo_enabled': false,
      'inview_aol_enabled': false,
      'inpage_appnexus_enabled': false,
      'inpage_openx_enabled': false,
      'inpage_criteo_enabled': false,
      'infeed_appnexus_enabled': false,
      'infeed_openx_enabled': false,
      'infeed_criteo_enabled': false,
      'infeed_aol_enabled': false,
      'inpage_aol_enabled': false
    }];
    component.selectAll();

    component.realImpactList.forEach(element => {
      expect(element.enabled).toBeTruthy();
      expect(component.placementDetailsClientSide[element.map]).toBeTruthy();
    });
    component.realDisplayList.forEach(element => {
      expect(element.enabled).toBeTruthy();
      expect(component.placementDetailsClientSide[element.map]).toBeTruthy();
    });
    component.infeedList.forEach(element => {
      expect(element.enabled).toBeTruthy();
      expect(component.placementDetailsClientSide[element.map]).toBeTruthy();
    });
  });
});
