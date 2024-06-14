import axios from "axios";
import AuthAPI from "./auth.api";
import ExpenseAPI from "./expense.api";

const AUTH_BASE_URL = "https://moneyfulpublicpolicy.co.kr";
const EXPENSE_BASE_URL = "https://massive-lavish-pie.glitch.me";

class API {
  #authAxios;
  #expenseAxios;

  auth;
  expense;

  constructor() {
    this.#authAxios = axios.create({ baseURL: AUTH_BASE_URL });
    this.#expenseAxios = axios.create({ baseURL: EXPENSE_BASE_URL });

    this.auth = new AuthAPI(this.#authAxios);
    this.expense = new ExpenseAPI(this.#expenseAxios);
  }
}

const api = new API();

export default api;
