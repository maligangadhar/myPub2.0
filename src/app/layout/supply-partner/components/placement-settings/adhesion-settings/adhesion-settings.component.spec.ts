import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesionSettingsComponent } from './adhesion-settings.component';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InviewPassbackComponent } from '../../passbacks/inview-passback/inview-passback.component';
import { BroadcastService } from '../../../../../services/broadcast.service';

describe('AdhesionSettingsComponent', () => {
  let component: AdhesionSettingsComponent;
  let fixture: ComponentFixture<AdhesionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhesionSettingsComponent, InviewPassbackComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhesionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#deSelectAll should call innerSelect with \'false\' as parameter', () => {
    const spy = spyOn(component, 'innerSelect');
    component.deSelectAll();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('#selectAll should call innerSelect with \'true\' as parameter', () => {
    const spy = spyOn(component, 'innerSelect');
    component.selectAll();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('#innerSelect should update enabled attribute of elements in AdhesionDesktopList, AdhesionTabletList and AdhesionMobileList with true when function parameter is true', () => {
    component.AdhesionDesktopList = [{ size: '728x90', enabled: false }];
    component.AdhesionTabletList = [{ size: '320x50', enabled: false }, { size: '320x100', enabled: false }];
    component.AdhesionMobileList = [{ size: '728x90', enabled: false }];

    component.innerSelect(true);
    component.AdhesionDesktopList.forEach((element) => {
      expect(element.enabled).toBeTruthy();
    });
    component.AdhesionTabletList.forEach((element) => {
      expect(element.enabled).toBeTruthy();
    });
    component.AdhesionMobileList.forEach((element) => {
      expect(element.enabled).toBeTruthy();
    });
  });

  it('#innerSelect should update enabled attribute of elements in AdhesionDesktopList, AdhesionTabletList and AdhesionMobileList with false when function parameter is false', () => {
    component.AdhesionDesktopList = [{ size: '728x90', enabled: true }];
    component.AdhesionTabletList = [{ size: '320x50', enabled: true }, { size: '320x100', enabled: true }];
    component.AdhesionMobileList = [{ size: '728x90', enabled: true }];

    component.innerSelect(true);
    component.AdhesionDesktopList.forEach((element) => {
      expect(element.enabled).toBeTruthy();
    });
    component.AdhesionTabletList.forEach((element) => {
      expect(element.enabled).toBeTruthy();
    });
    component.AdhesionMobileList.forEach((element) => {
      expect(element.enabled).toBeTruthy();
    });
  });
});
