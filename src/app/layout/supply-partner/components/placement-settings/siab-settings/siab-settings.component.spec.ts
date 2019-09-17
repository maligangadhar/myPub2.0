import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiabSettingsComponent } from './siab-settings.component';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('SiabSettingsComponent', () => {
  let component: SiabSettingsComponent;
  let fixture: ComponentFixture<SiabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiabSettingsComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, RouterTestingModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiabSettingsComponent);
    component = fixture.componentInstance;
    component.SiabDesktopList = [
      { size: '300x600', enabled: false, passback_tag: '' },
      { size: '300x250', enabled: false, passback_tag: '' },
      { size: '160x600', enabled: false, passback_tag: '' },
      { size: '728x90', enabled: false, passback_tag: '' },
      { size: '970x250', enabled: false, passback_tag: '' },
      { size: '180x150', enabled: false, passback_tag: '' }];
    component.SiabPhoneList = [
      { size: '320x50', enabled: false, passback_tag: '' },
      { size: '300x50', enabled: false, passback_tag: '' },
      { size: '300x250', enabled: false, passback_tag: '' }];
    component.SiabTabletList = [
      { size: '300x600', enabled: false, passback_tag: '' },
      { size: '300x250', enabled: false, passback_tag: '' },
      { size: '160x600', enabled: false, passback_tag: '' },
      { size: '728x90', enabled: false, passback_tag: '' }];
    fixture.detectChanges();
  });

  it('#ngOnChanges should call #selectAllCheck if SiabPlacementDetails exist in SiabSettingsComponent', () => {
    component.SiabPlacementDetails = {
      'ad_settings': {
        'Standard Display': {
          'desktop': 'test',
          'tablet': 'test',
          'mobile': 'test'
        }
      }
    };
    const spy = spyOn(component, 'selectAllCheck');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('#onCheckBoxClick should call #selectAllCheck of SiabSettingsComponent', () => {
    const spy = spyOn(component, 'selectAllCheck');
    component.onCheckBoxClick();
    expect(spy).toHaveBeenCalled();
  });

  it('#onCheckBoxClick should emit SiabPlacementDetails of SiabSettingsComponent', () => {
    spyOn(component.SIAB, 'emit');
    component.onCheckBoxClick();
    expect(component.SIAB.emit).toHaveBeenCalled();
  });

  it('#deSelectAll should call #innerSelect of SiabSettingsComponent', () => {
    const spy = spyOn(component, 'innerSelect');
    component.deSelectAll();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('#selectAll should call #innerSelect of SiabSettingsComponent', () => {
    const spy = spyOn(component, 'innerSelect');
    component.selectAll();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('#innerSelect should change the enabled attribute of SiabDesktopList, SiabPhoneList and SiabTabletList to true if called with true as a parameter', () => {
    component.innerSelect(true);
    component.SiabDesktopList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });
    component.SiabPhoneList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });
    component.SiabTabletList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });
  });

  it('#innerSelect should change the enabled attribute of SiabDesktopList, SiabPhoneList and SiabTabletList to false if called with false as a parameter', () => {
    component.innerSelect(false);
    component.SiabDesktopList.forEach(element => {
      expect(element.enabled).toBeFalsy();
    });
    component.SiabPhoneList.forEach(element => {
      expect(element.enabled).toBeFalsy();
    });
    component.SiabTabletList.forEach(element => {
      expect(element.enabled).toBeFalsy();
    });
  });

  it('#innerSelect should call #onCheckBoxClick of SiabSettingsComponent', () => {
    const spy = spyOn(component, 'onCheckBoxClick');
    component.innerSelect(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
