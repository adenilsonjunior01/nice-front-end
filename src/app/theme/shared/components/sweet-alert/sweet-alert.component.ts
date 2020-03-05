import Swal, { SweetAlertIcon } from 'sweetalert2';

export class SweetAlertComponent {

  constructor() { }

  public toastCustom(icon?: SweetAlertIcon, message?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon,
      title: message
    });
  }
}
