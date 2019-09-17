import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpComponent } from './add-sp.component';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SiteService } from '../../../../services/site.service';
import { GcloginComponent } from '../gclogin/gclogin.component';
import { BroadcastService } from '../../../../services/broadcast.service';

describe('AddSpComponent', () => {
  let component: AddSpComponent;
  let fixture: ComponentFixture<AddSpComponent>;
  let siteService: SiteService;
  const validSp = {
    partner_name: 'test',
    url: 'test.com',
    first_name: 'test',
    last_name: 'test',
    street_address: 'test',
    city: 'test',
    state: 'test',
    postal_code: '00000000',
    phone: 'test',
    country: 'test',
    job_function_id: 'test',
    payout_currency: 'USD',
    email: 'test@test.com',
    directness: 'U'
  };

  const inValidSp = {
    partner_name: '',
    url: 'test',
    first_name: '',
    last_name: '',
    street_address: 'test',
    city: 'test',
    state: 'test',
    postal_code: '00000000',
    phone: 'test',
    country: 'test',
    job_function_id: 'test',
    payout_currency: 'USD',
    email: 'testtest',
    directness: 'U'
  };

  function updateForm(SP) {
    if (component.registerForm.controls) {
      if (component.registerForm.controls.hasOwnProperty('partner_name')) { component.registerForm.controls['partner_name'].setValue(SP.partner_name); }
      if (component.registerForm.controls.hasOwnProperty('url')) { component.registerForm.controls['url'].setValue(SP.url); }
      if (component.registerForm.controls.hasOwnProperty('first_name')) { component.registerForm.controls['first_name'].setValue(SP.first_name); }
      if (component.registerForm.controls.hasOwnProperty('last_name')) { component.registerForm.controls['last_name'].setValue(SP.last_name); }
      if (component.registerForm.controls.hasOwnProperty('street_address')) { component.registerForm.controls['street_address'].setValue(SP.street_address); }
      if (component.registerForm.controls.hasOwnProperty('city')) { component.registerForm.controls['city'].setValue(SP.city); }
      if (component.registerForm.controls.hasOwnProperty('state')) { component.registerForm.controls['state'].setValue(SP.state); }
      if (component.registerForm.controls.hasOwnProperty('postal_code')) { component.registerForm.controls['postal_code'].setValue(SP.postal_code); }
      if (component.registerForm.controls.hasOwnProperty('phone')) { component.registerForm.controls['phone'].setValue(SP.phone); }
      if (component.registerForm.controls.hasOwnProperty('country')) { component.registerForm.controls['country'].setValue(SP.country); }
      if (component.registerForm.controls.hasOwnProperty('job_function_id')) { component.registerForm.controls['job_function_id'].setValue(SP.job_function_id); }
      if (component.registerForm.controls.hasOwnProperty('payout_currency')) { component.registerForm.controls['payout_currency'].setValue(SP.payout_currency); }
      if (component.registerForm.controls.hasOwnProperty('email')) { component.registerForm.controls['email'].setValue(SP.email); }
      if (component.registerForm.controls.hasOwnProperty('directness')) { component.registerForm.controls['directness'].setValue(SP.directness); }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpComponent, GcloginComponent],
      imports: [HttpClientModule, MessagesModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [BroadcastService, SiteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpComponent);
    component = fixture.componentInstance;
    siteService = TestBed.get(SiteService);
    RouterTestingModule.withRoutes([
      { path: 'login', component: GcloginComponent }
    ]);
    fixture.detectChanges();
  });

  it('#getSupplyPartnerDetails should call getSiteMetadata of SiteService if pub_id exists', (() => {
    const spy = spyOn(siteService, 'getSiteMetadata').and.callThrough();
    component.pub_id = 'test';
    component.getSupplyPartnerDetails();
    expect(spy).toHaveBeenCalled();
  }));

  it('#updateForm should have the values of registerForm', (() => {
    updateForm(validSp);
    expect(component.registerForm.value).toEqual(validSp);
  }));

  it('registerForm value should be true with valid supply partner details', (() => {
    updateForm(validSp);
    expect(component.registerForm.valid).toBeTruthy();
  }));

  it('registerForm value should be false with invalid supply partner details', (() => {
    updateForm(inValidSp);
    expect(component.registerForm.valid).toBeFalsy();
  }));

  it('trim_attributes should contain these [\'city\',\'country\',\'email\',\'first_name\',\'job_function_id\',\'last_name\',\'partner_name\',\'payout_currency\', \'phone\',\'postal_code\',\'state\',\'street_address\',\'url\']', () => {
    expect(component.trim_attributes).toEqual(['city', 'country', 'email', 'first_name', 'job_function_id', 'last_name', 'partner_name', 'payout_currency', 'phone', 'postal_code', 'state', 'street_address', 'url']);
  });

  it('#onSubmit should trim values of registerForm before saving ', () => {
    component.trim_attributes.forEach((attr) => {
      if (attr === 'email') {
        component.registerForm.controls[attr].setValue('        test@test.com       ');
      } else if (attr === 'url') {
        component.registerForm.controls[attr].setValue('        test.com       ');
      } else {
        component.registerForm.controls[attr].setValue('        test       ');
      }
    });

    component.onSubmit();
    component.trim_attributes.forEach((attr) => {
      if (attr === 'email') {
        expect(component.registerForm.controls[attr].value).toEqual('test@test.com');
      } else if (attr === 'url') {
        expect(component.registerForm.controls[attr].value).toEqual('test.com');
      } else {
        expect(component.registerForm.controls[attr].value).toEqual('test');
      }
    });
  });

  it('#onSubmit should call updatedSupplyPartner of SiteService with valid company-name, url, first-name, last-name, payout-currency,email and if pub_id exists', (() => {
    const spy = spyOn(siteService, 'updatedSupplyPartner').and.callThrough();
    component.pub_id = 'test';
    updateForm(validSp);
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  }));

  it('#onSubmit should call createSupplyPartner of SiteService with valid company-name, url, first-name, last-name, payout-currency,email and if pub_id does not exist', () => {
    const spy = spyOn(siteService, 'createSupplyPartner').and.callThrough();
    updateForm(validSp);
    fixture.detectChanges();
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('input_text_field_regex should have the following regular expression \'A-Za-z0-9_., ]{1,}\'', () => {
    expect(component.input_text_field_regex).toEqual('[A-Za-z0-9_., ]{1,}');
  });
});
