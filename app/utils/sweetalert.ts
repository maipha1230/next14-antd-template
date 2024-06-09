import Swal from "sweetalert2";

export const showSuccessAlert = (msg: string) => {
  return Swal.fire({
    title: "Success",
    icon: "success",
    text: msg || "",
    timer: 5000,
  });
};

export const showWarningAlert = (msg: string) => {
  return Swal.fire({
    title: "Waring",
    icon: "warning",
    text: msg || "",
    timer: 5000,
    showCloseButton: true,
    closeButtonAriaLabel: "ปิด",
  });
};

export const showEnsureAlert = (msg: string) => {
  return Swal.fire({
    title: "Are you sure ?",
    icon: "question",
    text: msg || "",
    cancelButtonText: "ไม่",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "ใช่",
  });
};
