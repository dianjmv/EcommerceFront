import Swal from 'sweetalert2';

export function ShowSuccesAlert(title: string, icon: 'success' | 'warning' | 'error', text: string) {
    return Swal.fire(title, text, icon);
}
