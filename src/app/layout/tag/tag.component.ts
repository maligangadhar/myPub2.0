import { Component, OnInit, HostListener } from '@angular/core';
import { saveAs } from 'file-saver';
import { TagService } from '../../services/tag.service';
import { Router } from '@angular/router';
@Component({
  selector: 'gc-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tagContainerHeight: number;
  tagInnerContainerHeight: number;
  guid: string;
  guidResult: any;
  groupname: string;
  infeed: string;
  tagtype = '';
  siabtype = '';
  msgs = [];
  fileName = '';
  timer = 3000;
  prevNavigateRoute: string = '';
  constructor(private router: Router, private tagService: TagService) {
    this.prevNavigateRoute = this.router.url;
    localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
  }

  ngOnInit() {
    if (window.innerHeight > 800) {
      this.tagContainerHeight = window.innerHeight - 100;
      this.tagInnerContainerHeight = this.tagContainerHeight;
    } else {
      this.tagContainerHeight = window.innerHeight - 100;
      this.tagInnerContainerHeight = this.tagContainerHeight + 20;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerHeight > 800) {
      this.tagContainerHeight = window.innerHeight - 100;
      this.tagInnerContainerHeight = this.tagContainerHeight;
    } else {
      this.tagContainerHeight = window.innerHeight - 100;
      this.tagInnerContainerHeight = this.tagContainerHeight + 20;
    }
  }

  generateTags = () => {
    this.msgs = [];
    this.fileName = this.tagtype;
    if (this.guid === '' || this.guid === null || this.guid === undefined) {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Please enter guid(s)' });
      this.scrollToTop();
    } else if (!this.checklength(this.guid)) {

    } else if (this.tagtype === '' || this.tagtype === null || typeof this.tagtype === 'undefined') {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Please select a Tag Type' });
      this.scrollToTop();
    } else if (this.tagtype === 'infeed' || this.tagtype === 'infeed_selector' || this.tagtype === 'infeed_custom'
      || this.tagtype === 'onpage' || this.tagtype === 'adserver' || this.tagtype === 'mediationserver' || this.tagtype === 'mediationonpage') {
      this.guidResult = this.tagService.genTags(this.tagtype, this.guid, []);
      if (!this.guidResult) {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    } else if (this.tagtype === 'siab' || this.tagtype === 'siab_custom') {
      if (this.siabtype) {
        const selectedSizes = [];
        selectedSizes.push(this.siabtype);
        this.guidResult = this.tagService.genTags(this.tagtype, this.guid, selectedSizes);
        if (!this.guidResult) {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'SIAB tags require an ad size. Please select an ad size.' });
        this.scrollToTop();
      }
    }
    this.triggerTimeOut();
  }
  scrollToTop = () => {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
  checklength = (guidlist) => {
    if (guidlist) {
      const guids = guidlist.split('\n');
      if (guids.length === 1) {
        guids[0] = guids[0].trim();
        if (guids[0].length !== 22) {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Guid(s) is invalid, guids must be 22 characters long' });
          this.msgs.push({ severity: 'error', summary: '', detail: 'The current guid character length is' + guids[0].length });
          return false;
        }
        return true;
      } else {
        for (let i = 0; i < guids.length; i++) {
          guids[i] = guids[i].trim();
          if (guids[i].length > 0 && guids[i].length !== 22) {
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Guid(s) is invalid, guids must be 22 characters long' });
            this.msgs.push({ severity: 'error', summary: '', detail: 'Err: The current guid character length is' + guids[i].length });
            return false;
          }
        }
        return true;
      }
    }
  }

  clearTags = () => {
    this.guidResult = '';
    this.tagtype = '';
    this.guid = '';
  }
  downloadScript = () => {
    const blob = new Blob([this.guidResult], { type: 'text/plain' });
    saveAs(blob, this.fileName);
  }
  triggerTimeOut() {
    setTimeout(() => {
      this.msgs = [];
    }, this.timer);
  }
}
