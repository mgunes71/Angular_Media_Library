import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
// import * as Toastr from 'toastr';

interface AlertOption {
  title?: string;
  html?: string | HTMLElement;
  type?: 'success' | 'info' | 'warning' | 'danger' | null;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

interface ToastOption {
  title?: string;
  html?: string;
  type: 'success' | 'info' | 'error';
}


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  Alert(alertOption: AlertOption) {
    return Swal.fire(alertOption);
  }

  Toast(option: ToastOption) {
    const toastOptions = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '5000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      // positionClass: 'toast-top-right toast-position toast-positioning',
      positionClass: 'toast-top-center toast-position toast-positioning',
    } as any;

    // if (option.type === 'success') {
    //   Toastr.success(option.html || '', option.title, toastOptions);
    // } else if (option.type === 'error') {
    //   Toastr.error(option.html || '', option.title, toastOptions);
    // } else if (option.type === 'info') {
    //   Toastr.info(option.html || '', option.title, toastOptions);
    // }
    /*
        Swal.fire({
          ...option,
          toast: true,
          icon: option.type,
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          position: 'top-right',
          customClass: {
            container: `toast-${option.type}`
          },
          timer: 3000
        });
    */
  }

  ConfirmAlert(message: string, dangerMode?: boolean) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure?',
        html: message,
        allowOutsideClick: true,
        icon: 'warning',
        confirmButtonColor: dangerMode ? '#ff2d55' : '#16C79A',
        cancelButtonColor: dangerMode ? '#16C79A' : '#ff2d55',
        customClass: {
          container: 'confirm-alert'
        },
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
      }).then(({isConfirmed}) => {
        if (isConfirmed) {
          resolve(true);
        } else {
          reject();
        }
      });
    });
  }

  // ClearToast() {
  //   Toastr.clear();
  //   $('#toast-container').remove();
  // }
}
