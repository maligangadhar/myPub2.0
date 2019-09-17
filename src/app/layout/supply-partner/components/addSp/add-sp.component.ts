import { Component, OnInit, Input } from '@angular/core';
import { ISPCreate, IKeyData } from '../../../../models/viewModels';
import { routerTransition } from '../../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../../../../services/site.service';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../../../../environments/environment';
import { Location } from '@angular/common';
import { BroadcastService } from '../../../../services/broadcast.service';

@Component({
  selector: 'gc-sp-add',
  templateUrl: './add-sp.component.html',
  styleUrls: ['./add-sp.component.scss'],
  animations: [routerTransition()]
})
export class AddSpComponent implements OnInit {
  pub_guid: string = '';
  pub_id: string = '';
  cityList: any = [];
  stateList: any = [];
  viewMode: boolean = false;
  countryList: any = [];
  currencyList: any = [];
  jbList: any = [];
  msgs: Message[] = [];
  sp: ISPCreate = {
    partner_name: '',
    partner_guid: '',
    first_name: '',
    last_name: '',
    payout_curency: '',
    street_address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone: '',
    url: '',
    email: '',
    job_function_id: 0,
    seller_type: ''
  };
  registerForm: FormGroup;
  submitted = false;
  error: any;
  timer: number = 3000;
  urlErrorMessage: string = '';
  emailErrorMessage: string = '';
  siteUrl = environment.siteDetailUrl;
  input_text_field_regex: string = '[A-Za-z0-9_., ]{1,}';
  trim_attributes = ['city', 'country', 'email', 'first_name', 'job_function_id', 'last_name', 'partner_name', 'payout_currency', 'phone', 'postal_code', 'state', 'street_address', 'url'];
  prevNavigateRoute: string = '';
  directnessList: any[] = [];
  loading: boolean = false;
  constructor(private router: Router, private broadcast: BroadcastService, private route: ActivatedRoute, private service: SiteService, private formBuilder: FormBuilder, private _location: Location) {
  }

  ngOnInit() {
    this.prevNavigateRoute = this.router.url;
    localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
    this.pub_guid = this.route.snapshot.queryParamMap.get('guid');
    this.pub_id = this.route.snapshot.queryParamMap.get('id');
    this.viewMode = (this.pub_guid) ? false : true;
    this.registerForm = this.formBuilder.group({
      partner_name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      street_address: ['', Validators.required],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', Validators.required],
      phone: ['', Validators.required],
      seller_type: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.pattern(this.input_text_field_regex)]],
      job_function_id: ['', [Validators.required, Validators.pattern(this.input_text_field_regex)]],
      payout_currency: ['', [Validators.required, Validators.pattern(this.input_text_field_regex)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.service.getCountryList().subscribe((result) => {
      this.countryList = result;
    });
    this.currencyList.push('USD');
    this.currencyList.push('JPY');
    this.registerForm.controls['payout_currency'].setValue('USD', { onlySelf: true });
    this.registerForm.controls['country'].setValue('US', { onlySelf: true });
    this.registerForm.controls['job_function_id'].setValue('1', { onlySelf: true });
    this.registerForm.controls['seller_type'].setValue('S', { onlySelf: true });
    if (this.pub_id) {
      this.getSupplyPartnerDetails();
    }
    this.getMetaDataList();
    this.broadcast.broadcast('login', 'false');
  }
  getMetaDataList = () => {
    // fetch jb list
    this.service.getJbList().subscribe((result) => {
      this.jbList = result;
    });
    // fetch directness list
    this.service.getMetaData().subscribe((result) => {
      const directness = result['data']['seller_type'];
      this.directnessList = [];
      this.directnessList.push({ 'id': 'S', 'name': '-Select-' });
      Object.keys(directness).forEach(key => {
        this.directnessList.push({ 'id': directness[key], 'name': key });
      });
    });
  }
  /**
   * get supply partner details
   */
  getSupplyPartnerDetails = () => {
    this.service.getSiteMetadata(this.pub_id).subscribe((result: any) => {
      if (result) {
        this.sp = result.supply_partner;
        Object.keys(this.sp).forEach(name => {
          if (this.registerForm.controls[name]) {
            this.registerForm.controls[name].setValue(this.sp[name], { onlySelf: true });
          }
        });
      }
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
      if (error['status'] && error['status'] === 401) {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        this.broadcast.broadcast('login', 'true');
        setTimeout(() => {
          this.msgs = [];
          this.router.navigate(['login']);
        }, this.timer);
      }
    });
  }
  /**
   * cancel sp create form
   */
  cancel() {
    this.registerForm.reset();
    this.registerForm.markAsPristine();
    this._location.back();
  }

  get f() {
    return this.registerForm.controls;
  }

  /**
   * on submit for create / update sp details
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.msgs = [];
    this.trim_attributes.forEach((attr) => {
      if (this.registerForm && this.registerForm.controls[attr].value) {
        if (typeof (this.registerForm.controls[attr].value) === 'string') {
          this.registerForm.controls[attr].setValue(this.registerForm.controls[attr].value.trim());
        }
      }
    });
    // email
    if (this.registerForm.controls && this.registerForm.controls['email']) {
      if (this.registerForm['controls']['email'].value.indexOf('.') === -1) {
        this.registerForm['controls']['email'].setErrors({ pattern: true });
      }
    }
    // seller_type
    if (this.registerForm.controls && this.registerForm.controls['seller_type']) {
      if (this.registerForm['controls']['seller_type'].value === 'S') {
        this.registerForm['controls']['seller_type'].setErrors({ required: true });
      }
    }
    if (this.registerForm.invalid) {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Please enter valid form details' });
      this.triggerTimeOut();
      return;
    }
    const param = {
      'supply_partner': this.registerForm.value
    };
    if (this.pub_id) {
      this.service.updatedSupplyPartner(this.pub_id, param)
        .subscribe(
          response => {
            this.loading = false;
            this.router.navigate(['spDetail'], { queryParams: { id: response['data']['supply_partner'].id } });
          }, error => {
            this.handleError(error);
            this.loading = false;
          }
        );
    } else {
      this.service.createSupplyPartner(param).subscribe(response => {
        const data = response['data']['supply_partner'];
        this.service.setSiteDetails(data.partner_guid, data.partner_name, data.id);
        localStorage.setItem('partnerGuid', data.id);
        localStorage.setItem('partnerName', data.partner_name);
        this.router.navigate(['spDetail'], { queryParams: { id: data.id } });
        this.loading = false;
      }, error => {
        this.handleError(error);
        if (error['error_fields']) {
          error['error_fields'].forEach(er => {
            this.registerForm['controls'][er].setErrors({ 'incorrect': true });
          });
        }
        this.loading = false;
      });
    }
  }
  /**
   * handle error messages
   */
  handleError = (error) => {
    this.msgs = [];
    // check for object messages
    Object.keys(this.sp).forEach(key => {
      if (error.message[key]) {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.message[key] });
        if (key === 'url') {
          this.urlErrorMessage = error.message[key];
        }
        if (key === 'email') {
          this.emailErrorMessage = error.message[key];
        }
        this.registerForm['controls'][key].setErrors({ 'incorrect': true });
      }
    });
    if (typeof error['message'] !== 'object') {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
    }
    if (error['status'] && error['status'] === 401) {
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('token');
      this.broadcast.broadcast('login', 'true');
      setTimeout(() => {
        this.msgs = [];
        this.router.navigate(['login']);
      }, this.timer);
    }
    this.triggerTimeOut();
  }
  /**
   * time out for error messages
   */
  triggerTimeOut() {
    setTimeout(() => {
      this.msgs = [];
    }, this.timer);
  }
}
