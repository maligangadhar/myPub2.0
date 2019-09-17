import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';
import { TagComponent } from './tag.component';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagComponent],
      imports: [FormsModule, HttpClientTestingModule, MessagesModule, RadioButtonModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#clearTags should empty guidResult, tagtype and guid', () => {
    component.guidResult = 'test';
    component.tagtype = 'test';
    component.guid = 'test';
    component.clearTags();
    expect(component.guidResult).toEqual('');
    expect(component.tagtype).toEqual('');
    expect(component.guid).toEqual('');
  });

  it('#downloadScript should call #saveAs of TagComponent', () => {
    const spy = spyOn(FileSaver, 'saveAs').and.stub();
    component.downloadScript();
    expect(spy).toHaveBeenCalled();
  });

  it('#generateTags should populate msgs of TagComponent with { severity: \'error\', summary: \'Error\', detail: \'Please enter guid(s)\' } if guid is null ', () => {
    const spy = spyOn(component, 'scrollToTop').and.callThrough();
    component.guid = null;
    component.tagtype = 'test';
    component.generateTags();
    expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Please enter guid(s)' });
    expect(spy).toHaveBeenCalled();
  });
  it('#generateTags should populate msgs of TagComponent with { severity: \'error\', summary: \'Error\', detail: \'Please enter guid(s)\' } if guid is \'\' ', () => {
    const spy = spyOn(component, 'scrollToTop').and.callThrough();
    component.guid = '';
    component.tagtype = 'test';
    component.generateTags();
    expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Please enter guid(s)' });
    expect(spy).toHaveBeenCalled();
  });
  it('#generateTags should populate msgs of TagComponent with { severity: \'error\', summary: \'Error\', detail: \'Please enter guid(s)\' } if guid is undefined ', () => {
    const spy = spyOn(component, 'scrollToTop').and.callThrough();
    component.guid = undefined;
    component.tagtype = 'test';
    component.generateTags();
    expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Please enter guid(s)' });
    expect(spy).toHaveBeenCalled();
  });

  it('#generateTags should call checklength of TagComponent ', () => {
    const spy = spyOn(component, 'checklength');
    component.guid = 'test\ntest2\ntest3';
    component.tagtype = 'test';
    component.generateTags();
    expect(spy).toHaveBeenCalled();
  });

  it('#checkLength should return false if guidList is of one guid and the guid length is not equal to 22', () => {
    expect(component.checklength('test')).toBeFalsy();
  });

  it('#checkLength should return true if guidList is of one guid and the guid length is 22', () => {
    expect(component.checklength('testtesttesttesttest22')).toBeTruthy();
  });

  it('#checkLength should return true if guidList has more than one guid and length of all guids is 22', () => {
    expect(component.checklength('testtesttesttesttest22\ntesttesttesttesttest23\ntesttesttesttesttest24\n')).toBeTruthy();
  });

  it('#checkLength should return false if guidList has more than one guid and length of any guid is not 22', () => {
    expect(component.checklength('testtesttesttesttest22\ntesttesttesttesttest23\ntesttesttesttestest24\n')).toBeFalsy();
  });
});
