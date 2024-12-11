import * as Yup from "yup";

export function inititalValues() {
  return {
    number_cip: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    number_cip: Yup.number()
      .required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
  });
}
