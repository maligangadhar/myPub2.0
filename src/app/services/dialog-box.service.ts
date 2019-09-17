import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../layout/components/header/header.component';

@Injectable({
    providedIn: 'root'
})
export class DialogBoxService {

    closeResult: any;
    constructor(private modalService: NgbModal) { }
    async onClickDialog(content) {

     await this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

        this.closeResult = result;
        }, (reason) => {
            this.closeResult = this.getDismissReason(reason);
        });
        return this.closeResult;
    }

    private getDismissReason(reason: any): number {
        if (reason === ModalDismissReasons.ESC) {
            return 0;
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 0;
        } else {
            return 1;
        }
    }
}
