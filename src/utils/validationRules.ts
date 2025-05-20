import { RuleObject } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

export const emailRules: RuleObject[] = [
  {
    required: true,
    message: "Пожалуйста, введите свой адрес электронной почты!",
  },
  {
    type: "email",
    message: "Не является допустимым адресом электронной почты!",
  },
];

export const loginRules: RuleObject[] = [
  { required: true, message: "Пожалуйста, введите ваш логин!" },
  {
    pattern: /^[a-zA-Z]+$/,
    message: "Поле должно содержать от 2 до 60 символов латинского алфавита.",
  },
  {
    min: 2,
    message: "Логин должен содержать от 2 до 60 символов.",
  },
  {
    max: 60,
    message: "Логин должен содержать от 2 до 60 символов.",
  },
];

export const passwordRules: RuleObject[] = [
  { required: true, message: "Введите пароль!" },
  {
    min: 6,
    message: "Пароль должен содержать от 6 до 60 символов.",
  },
  {
    max: 60,
    message: "Пароль должен содержать от 6 до 60 символов.",
  },
];

export const confirmPasswordRules = (
  getFieldValue: (name: NamePath) => string
): RuleObject[] => [
  { required: true, message: "Введите пароль!" },
  {
    min: 6,
    message: "Пароль должен содержать от 6 до 60 символов.",
  },
  {
    max: 60,
    message: "Пароль должен содержать от 6 до 60 символов.",
  },
  {
    validator(_, value) {
      const password = getFieldValue("password");

      console.log(password, value);
      if (!value || password === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Пароли не совпадают!"));
    },
  },
];

export const phoneNumberRules: RuleObject[] = [
  { required: false },
  {
    pattern: /^\+\d{1,15}$/,
    message: "Введите действительный формат номера телефона (+79123456789).",
  },
];

export const usernameRules: RuleObject[] = [
  {
    required: true,
    message: "Пожалуйста, введите Ваше имя пользователя!",
  },
  {
    pattern: /^[a-zA-Zа-яА-Я]+$/,
    message:
      "Поле должно содержать символы латинского или кириллического алфавита.",
  },
  {
    min: 1,
    message: "Имя пользователя должено содержать от 1 до 60 символов.",
  },
  {
    max: 60,
    message: "Имя пользователя должено содержать от 1 до 60 символов.",
  },
];
