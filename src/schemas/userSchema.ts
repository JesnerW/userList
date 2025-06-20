import * as yup from "yup";

export const userValidationSchema = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.']+$/,
      "El nombre solo puede contener letras, espacios, puntos y apostrofes"
    ),

  username: yup
    .string()
    .required("El nombre de usuario es obligatorio")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(25, "El nombre de usuario no puede exceder 25 caracteres")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    ),

  email: yup
    .string()
    .required("El email es obligatorio")
    .email("El email no es válido")
    .max(100, "El email no puede exceder 100 caracteres"),

  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(25, "El teléfono no puede exceder 20 caracteres"),
});

export type UserValidationSchema = yup.InferType<typeof userValidationSchema>;
