import Swal from 'sweetalert2';

export function ShowConfirmAlert(
    icon: string,
    text: string,
    title: string,
    cancelButtonText: string,
    confirmButtonText: string
) {
    // @ts-ignore
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    });
}
