import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BroadcastService } from '../../../services/broadcast.service';
import { HttpClientModule } from '@angular/common/http';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#addExpandClass should populate showMenu to zero if showMenu equals the parameter passed', () => {
    component.showMenu = 'test';
    component.addExpandClass('test');
    expect(component.showMenu).toEqual('0');
  });

  it('#addExpandClass should populate showMenu to zero if showMenu does not equal the parameter passed', () => {
    component.showMenu = 'test';
    component.addExpandClass('test_diff');
    expect(component.showMenu).toEqual('test_diff');
  });

  it('#eventCalled should update isActive to true if the earlier value is false', () => {
    component.isActive = false;
    component.eventCalled();
    expect(component.isActive).toBeTruthy();
  });

  it('#eventCalled should update isActive to false if the earlier value is true', () => {
    component.isActive = true;
    component.eventCalled();
    expect(component.isActive).toBeFalsy();
  });

  it('#toggleCollapsed should update collapsed to false if earlier value is true and should emit collapsed', () => {
    spyOn(component.collapsedEvent, 'emit');
    component.collapsed = true;
    component.toggleCollapsed();
    expect(component.collapsed).toBeFalsy();
    expect(component.collapsedEvent.emit).toHaveBeenCalledWith(component.collapsed);
  });

  it('#toggleCollapsed should update collapsed to true if earlier value is false and should emit collapsed', () => {
    spyOn(component.collapsedEvent, 'emit');
    component.collapsed = false;
    component.toggleCollapsed();
    expect(component.collapsed).toBeTruthy();
    expect(component.collapsedEvent.emit).toHaveBeenCalledWith(component.collapsed);
  });
});
