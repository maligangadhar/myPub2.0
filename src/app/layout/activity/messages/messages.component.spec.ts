import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SpCheckboxComponent } from '../../../components/sp-checkbox/sp-checkbox.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BroadcastService } from '../../../services/broadcast.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent, SpCheckboxComponent],
      imports: [CheckboxModule, HttpClientModule, FormsModule, MessageModule, MessagesModule, RouterTestingModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
});
});
