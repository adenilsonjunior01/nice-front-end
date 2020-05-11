import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes-colaborador',
  templateUrl: './detalhes-colaborador.component.html',
  styleUrls: ['./detalhes-colaborador.component.scss']
})
export class DetalhesColaboradorComponent implements OnInit {
  @Input() datas: any;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'modal-lg modal-detalhes'});
  }
}
