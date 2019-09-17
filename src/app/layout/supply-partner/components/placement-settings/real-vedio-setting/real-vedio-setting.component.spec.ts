import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealVedioSettingComponent } from './real-vedio-setting.component';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SiteService } from '../../../../../services/site.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RealVedioSettingComponent', () => {
  let component: RealVedioSettingComponent;
  let fixture: ComponentFixture<RealVedioSettingComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealVedioSettingComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, HttpClientModule, RouterTestingModule],
      providers: [MessageService, SiteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealVedioSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#saveSetting should call #add of MessageService', () => {
    const messageService = TestBed.get(MessageService);
    const spy = spyOn(messageService, 'add');
    component.saveSetting();
    expect(spy).toHaveBeenCalled();
  });

  it('#onCheckBoxClick should emit placementDetailsRealVideo of RealVedioSettingComponent', () => {
    spyOn(component.RealVideo, 'emit');
    component.onCheckBoxClick();
    expect(component.RealVideo.emit).toHaveBeenCalledWith(component.placementDetailsRealVideo);
  });

  it('#selectAll should call #onCheckBoxClick', () => {
    const spy = spyOn(component, 'onCheckBoxClick');
    component.selectAll();
    expect(spy).toHaveBeenCalled();
  });

  it('#selectAll should change all the values of [lkqd_enabled] in real_video of ReealVedioComponent to true', () => {
    component.real_video = {
      lkqd_enabled: false,
      spotx_channel: 30,
      maximum_duration: 30,
    };
    component.selectAll();
    expect(component.real_video.lkqd_enabled).toBeTruthy();
  });
});
