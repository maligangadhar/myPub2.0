import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfeedVideoSettingsComponent } from './infeed-video-settings.component';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InfeedPassbackComponent } from '../../passbacks/infeed-passback/infeed-passback.component';

describe('InfeedVideoSettingsComponent', () => {
  let component: InfeedVideoSettingsComponent;
  let fixture: ComponentFixture<InfeedVideoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfeedVideoSettingsComponent, InfeedPassbackComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfeedVideoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#onChange should emit video_pillar_settings when called', () => {
    this.infeed_video_settings = {
      desktop: false,
      desktop_sound: false,
      mobile: false,
      mobile_sound: false
    };
    spyOn(component.InfeedVideo, 'emit');
    component.onChange();
    expect(component.InfeedVideo.emit).toHaveBeenCalledWith(component.infeed_video_settings);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
