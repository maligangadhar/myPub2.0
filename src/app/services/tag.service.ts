import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TagService {
  deviceMap = {
    '970x250': 'desktop',
    '728x90': 'desktop, tablet',
    '300x600': 'desktop, tablet',
    '300x250': 'desktop, tablet, mobile',
    '160x600': 'desktop, tablet',
    '320x50': 'mobile',
    '300x50': 'mobile',
    '180x150': 'desktop'
  };
  msgs = [];
  constructor(private http: HttpClient) {

  }

  genTags = (tagtype, guidlist, sizelist) => {
    const guids = guidlist.split('\n');
    const tagarr = [];

    const mediserver = `REPLACE_WITH_PUBLISHER_ID Mediation Ad Server In-View Tag
    <!-- Begin 33Across RevCTRL InView -->
    <script>
    var Tynt = Tynt || [];
    Tynt.push('REPLACE_WITH_PUBLISHER_ID');
    Tynt.cmd = Tynt.cmd || [];
    Tynt.cmd.push(function(){
      Tynt.ads.on('impression', function() {
      // Publisher can invoke their mediation code here for impression
      });

      Tynt.ads.on('passback', function() {
      // Publisher can invoke their mediation code here for passback
      });

      Tynt.ads.display('','','inview');
    });

    (function() {
    var h, s = document.createElement('script');
    s.src = 'https://cdn.tynt.com/rciv.js';
    h = document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s, h);
    })();

    </script>
    <!-- End 33Across RevCTRL InView-->`;

    const medionpage = `REPLACE_WITH_PUBLISHER_ID Mediation OnPage In-View Tag

    <!-- Begin 33Across RevCTRL InView -->
    <script>
    var Tynt = Tynt || [];
    Tynt.push('REPLACE_WITH_PUBLISHER_ID');
    Tynt.cmd = Tynt.cmd || [];
    Tynt.cmd.push(function(){
      Tynt.ads.on('impression', function() {
      // Publisher can invoke their mediation code here for impression
      });

      Tynt.ads.on('passback', function() {
      // Publisher can invoke their mediation code here for passback
      });

      Tynt.ads.display('','','inview');
    });

    (function() {
    var h, s = document.createElement('script');
    s.src = 'https://cdn.tynt.com/ti.js';
    h = document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s, h);
    })();

    </script>
    <!-- End 33Across RevCTRL InView-->`;

    const infeed = `REPLACE_WITH_PUBLISHER_ID In-Feed Tag <!-- Begin 33Across RevCTRL InFeed -->
    <div id='REPLACE_WITH_TAG_ID'><script>
    var Tynt=Tynt||[];Tynt.cmd=Tynt.cmd||[];
    Tynt.cmd.push({publisherId:'REPLACE_WITH_PUBLISHER_ID',
    fn:function(){Tynt.ads.display(this.publisherId,'infeed',
    {targetId:'REPLACE_WITH_TAG_ID'});}});
    (function(){var h,s=document.createElement('script');
    s.src= 'https://cdn.tynt.com/infeed.js';
    h=document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s,h);})();
    </script></div>
    <!-- End 33Across RevCTRL InFeed -->`;

    const infeed_selector = `REPLACE_WITH_PUBLISHER_ID In-Feed Tag <!-- Begin 33Across RevCTRL InFeed -->
    <div id='REPLACE_WITH_TAG_ID'>
      <script>
        var Tynt=Tynt||[];Tynt.cmd=Tynt.cmd||[];
        Tynt.cmd.push({
            publisherId:'REPLACE_WITH_PUBLISHER_ID',
            fn:function(){
            Tynt.ads.display(this.publisherId,'infeed',{
              targetId:'REPLACE_WITH_TAG_ID',
              location: {
                selector: 'p', // CSS Selector, can be any class, id or element
                insertionAt: 'after' // other values are 'before' and 'inside'
              }
            });
          }
        });
        (function(){var h,s=document.createElement('script');
        s.src= 'https://cdn.tynt.com/infeed.js';
        h=document.getElementsByTagName('script')[0];
        h.parentNode.insertBefore(s,h);})();
      </script>
    </div>

    <!-- End 33Across RevCTRL InFeed -->`;



    const rciv = `REPLACE_WITH_PUBLISHER_ID In-View Tag

    <!-- Begin 33Across RevCTRL InView -->
    <script>
    var Tynt=Tynt||[];Tynt.push('REPLACE_WITH_PUBLISHER_ID');
    Tynt.cmd=Tynt.cmd||[];Tynt.cmd.push(function(){
    Tynt.ads.display('','','inview');});
    (function(){var h,s=document.createElement('script');
    s.src='https://cdn.tynt.com/rciv.js';
    h=document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s,h);})();
    </script>
    <!-- End 33Across RevCTRL InView -->`;

    const ti = `REPLACE_WITH_PUBLISHER_ID In-View Tag

    <!-- Begin 33Across SiteCTRL -->
    <script>
    var Tynt=Tynt||[];Tynt.push('REPLACE_WITH_PUBLISHER_ID');
    (function(){var h,s=document.createElement('script');
    s.src= 'https://cdn.tynt.com/ti.js';
    h=document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s,h);})();
    </script>
    <!-- End 33Across SiteCTRL -->`;

    const siab = `REPLACE_WITH_SIZE_WxH REPLACE_DEVICE REPLACE_WITH_PUBLISHER_ID SIAB Tag

    <!-- Begin 33Across RevCTRL InPage -->
    <script id='REPLACE_WITH_TAG_ID'>
    var Tynt=Tynt||[];Tynt.push('REPLACE_WITH_PUBLISHER_ID');
    Tynt.cmd=Tynt.cmd||[];Tynt.cmd.push(function(){
    Tynt.ads.display('REPLACE_WITH_SIZE_WxH','REPLACE_WITH_TAG_ID','inpage');});
    (function(){var h,s=document.createElement('script');
    s.src='https://cdn.tynt.com/siab.js';
    h=document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s,h);})();
    </script>
    <!-- End 33Across RevCTRL InPage -->`;

    const siab_custom_tag = `REPLACE_WITH_SIZE_WxH REPLACE_DEVICE REPLACE_WITH_PUBLISHER_ID Custom SIAB Tag

    <!-- Begin 33Across RevCTRL InPage Custom 1 -->
    <script id='REPLACE_WITH_TAG_ID'>(function(){var d,i,s;try{
    if(window===window.top){i=document.createElement('iframe');
    s=document.getElementById('REPLACE_WITH_TAG_ID');if(i&&s){
    i.scrolling='no';i.frameBorder=i.style.margin='0';
    i.style.border='0 none';i.style.width='REPLACE_WITH_WIDTHpx';
    i.style.height='REPLACE_WITH_HEIGHTpx';i.src='about:blank';
    s.parentNode.insertBefore(i,s);d=i.contentWindow.document;
    d.open();d.write('<!DOCTYPE html><html><head><style>'+
    '*{margin:0;padding:0;}</style></head><body><s'+'cript>'+
    'var Tynt=Tynt||[];Tynt.push('REPLACE_WITH_PUBLISHER_ID');'+
    'Tynt.cmd=Tynt.cmd||[];Tynt.cmd.push(function(){'+
    'Tynt.ads.display('REPLACE_WITH_WIDTHxREPLACE_WITH_HEIGHT','','inpage');});'+
    '(function(){var h,s=document.createElement('script');'+
    's.src= 'https://cdn.tynt.com/siab.js';'+
    'h=document.getElementsByTagName('script')[0];'+
    'h.parentNode.insertBefore(s,h);})();'+
    '<'+'/'+'script></body></html>');d.close();}}}catch(e){}})();
    </script>
    <!-- End 33Across RevCTRL InPage Custom 1 -->`;


    const infeed_custom_tag = `REPLACE_WITH_PUBLISHER_ID In-Feed Custom Tag

    <!-- Begin 33Across RevCTRL InFeed Custom -->
    <div id='REPLACE_WITH_TAG_ID'><script>(function(){var c,d,i;try{
    if(window===window.top){i=document.createElement('iframe');
    c=document.getElementById('REPLACE_WITH_TAG_ID');if(i&&c){
    i.scrolling='no';i.frameBorder=i.style.margin='0';
    i.style.border='0 none';i.style.width=i.style.height='1px';
    i.src='about:blank';c.appendChild(i);d=i.contentWindow.document;
    d.open();d.write('<!DOCTYPE html><html><head><style>'+
    '*{margin:0;padding:0;}</style></head><body>' +
    '<div id='REPLACE_WITH_TAG_ID'><s'+'cript>'+
    'var Tynt=Tynt||[];Tynt.cmd=Tynt.cmd||[];'+
    'Tynt.cmd.push({publisherId:'REPLACE_WITH_PUBLISHER_ID','+
    'fn:function(){Tynt.ads.display(this.publisherId,'infeed','+
    '{targetId:'REPLACE_WITH_TAG_ID'});}});'+
    '(function(){var h,s=document.createElement('script');'+
    's.src='https://cdn.tynt.com/infeed.js';'+
    'h=document.getElementsByTagName('script')[0];'+
    'h.parentNode.insertBefore(s,h);})();'+
    '<'+'/'+'script></div></body></html>');
    d.close();}}}catch(e){}})();
    </script></div>
    <!-- End 33Across RevCTRL InFeed Custom -->`;

    for (let k = 0; k < guids.length; k++) {
      const slotid = 'x33x' + new Date().getTime() + Math.floor(Math.random() * 10000);
      if (tagtype === 'infeed') {
        const replaceSlotId = infeed.replace(/REPLACE_WITH_TAG_ID/g, slotid); // replace the slotid
        const replaceGuid = replaceSlotId.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'infeed_selector') {
        const replaceSlotId = infeed_selector.replace(/REPLACE_WITH_TAG_ID/g, slotid); // replace the slotid
        const replaceGuid = replaceSlotId.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'infeed_custom') {
        const replaceSlotId = infeed_custom_tag.replace(/REPLACE_WITH_TAG_ID/g, slotid); // replace the slotid
        const replaceGuid = replaceSlotId.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'onpage') {
        const replaceGuid = ti.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'adserver') {
        const replaceGuid = rciv.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'mediationserver') {
        const replaceGuid = mediserver.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'mediationonpage') {
        const replaceGuid = medionpage.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
        tagarr.push(replaceGuid);
      } else if (tagtype === 'siab') {
        if (sizelist.length === 1) {
          const device = this.deviceMap[sizelist[0]];
          const replaceSlotId = siab.replace(/REPLACE_WITH_TAG_ID/g, slotid); // replace the slotid
          const replaceSize = replaceSlotId.replace(/REPLACE_WITH_SIZE_WxH/g, sizelist[0]); // REPLACE_WITH_SIZE_WxH
          const replaceGuid = replaceSize.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
          const replaceDevice = replaceGuid.replace(/REPLACE_DEVICE/g, device); // replace the src
          tagarr.push(replaceDevice);
        } else {
          for (let z = 0; z < sizelist.length; z++) {
            const multislotid = 'x33x' + new Date().getTime() + Math.floor(Math.random() * 10000);
            const device = this.deviceMap[sizelist[z]];
            const multireplaceSlotId = siab.replace(/REPLACE_WITH_TAG_ID/g, multislotid); // replace the slotid
            const multireplaceSize = multireplaceSlotId.replace(/REPLACE_WITH_SIZE_WxH/g, sizelist[z]); // REPLACE_WITH_SIZE_WxH
            const multireplaceGuid = multireplaceSize.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
            const multireplaceDevice = multireplaceGuid.replace(/REPLACE_DEVICE/g, device); // replace the src
            tagarr.push(multireplaceDevice);
          }
        }
      } else if (tagtype === 'siab_custom') {
        if (sizelist.length === 1) {
          const device = this.deviceMap[sizelist[0]];
          const replaceSlotId = siab_custom_tag.replace(/REPLACE_WITH_TAG_ID/g, slotid); // replace the slotid
          const width = (sizelist[0].substring(0, sizelist[0].indexOf('x')));
          const height = (sizelist[0].substring(sizelist[0].indexOf('x') + 1));

          const replaceSize = replaceSlotId.replace(/REPLACE_WITH_SIZE_WxH/g, sizelist[0]); // REPLACE_WITH_SIZE_WxH

          const replaceWidth = replaceSize.replace(/REPLACE_WITH_WIDTH/g, width); // REPLACE_WITH_SIZE_WxH
          const replaceHeight = replaceWidth.replace(/REPLACE_WITH_HEIGHT/g, height); // REPLACE_WITH_SIZE_WxH

          const replaceGuid = replaceHeight.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
          const replaceDevice = replaceGuid.replace(/REPLACE_DEVICE/g, device); // replace the src
          tagarr.push(replaceDevice);
        } else {
          for (let z = 0; z < sizelist.length; z++) {
            const multislotid = 'x33x' + new Date().getTime() + Math.floor(Math.random() * 10000);
            const device = this.deviceMap[sizelist[z]];
            const multireplaceSlotId = siab_custom_tag.replace(/REPLACE_WITH_TAG_ID/g, multislotid); // replace the slotid
            const width = (sizelist[z].substring(0, sizelist[z].indexOf('x')));
            const height = (sizelist[z].substring(sizelist[z].indexOf('x') + 1));

            const multireplaceSize = multireplaceSlotId.replace(/REPLACE_WITH_SIZE_WxH/g, sizelist[z]); // REPLACE_WITH_SIZE_WxH

            const multireplaceWidth = multireplaceSize.replace(/REPLACE_WITH_WIDTH/g, width); // REPLACE_WITH_SIZE_WxH
            const multireplaceHeight = multireplaceWidth.replace(/REPLACE_WITH_HEIGHT/g, height); // REPLACE_WITH_SIZE_WxH

            const multireplaceGuid = multireplaceHeight.replace(/REPLACE_WITH_PUBLISHER_ID/g, guids[k]); // replace the src
            const multireplaceDevice = multireplaceGuid.replace(/REPLACE_DEVICE/g, device); // replace the src
            tagarr.push(multireplaceDevice);
          }
        }
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Something went wrong ' });
      }
    }
    return tagarr.join('\n\n\n');
  }
}
