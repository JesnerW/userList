import Swal from 'sweetalert2';
import type { User } from '../types/user';

export function useSweetAlert() {
  
  const confirmDelete = async (user: User): Promise<boolean> => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Se eliminará permanentemente el usuario:<br><strong>${user.name}</strong> (${user.email})`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    });

    return result.isConfirmed;
  };

  const showSuccess = (message: string, title: string = '¡Éxito!') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  const showError = (message: string, title: string = 'Error') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  };

  const showInfo = (message: string, title: string = 'Información') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  return {
    confirmDelete,
    showSuccess,
    showError,
    showInfo
  };
}