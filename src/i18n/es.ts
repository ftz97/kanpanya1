import type { Dict } from "./types";
const es: Dict = {
  app: { title: "Padavwa" },
  login: {
    title: "Iniciar sesión",
    email: "Correo",
    password: "Contraseña",
    signIn: "Entrar",
    magic: "Enlace mágico",
    or: "o",
    logout: "Cerrar sesión"
  },
  errors: {
    required: "Este campo es obligatorio.",
    invalidEmail: "Correo inválido.",
    authFailed: "Autenticación fallida."
  },
  dashboard: {
    hi: "Hola",
    yourEmail: "Tu correo"
  },
  offers: {
    title: "Ofertas",
    create: "Crear oferta",
    list: "Listar ofertas"
  }
};
export default es;
