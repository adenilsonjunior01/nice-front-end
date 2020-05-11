import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-detalhes-empresa',
  templateUrl: './modal-detalhes-empresa.component.html',
  styleUrls: ['./modal-detalhes-empresa.component.scss']
})
export class ModalDetalhesEmpresaComponent implements OnInit {
  @Input() datas: any
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() { }


  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'modal-lg modal-detalhes', });
  }

}
