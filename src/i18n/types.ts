export type Lang = "fr" | "en" | "gcf" | "es";
export type Dict = {
  app: { title: string };
  login: {
    title: string;
    email: string;
    password: string;
    signIn: string;
    magic: string;
    or: string;
    logout: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    authFailed: string;
  };
  dashboard: {
    hi: string;
    yourEmail: string;
  };
  offers: {
    title: string;
    create: string;
    list: string;
  };
};
