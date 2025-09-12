export type LoginForm = {
  email: string
  password: string
}

export type RegisterForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginResponse = {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};