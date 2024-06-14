class ExpenseAPI {
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  // Read: 지출 리스트
  async getExpenses() {
    try {
      const path = "/expenses";
      const response = await this.#axios.get(path);
      const result = response.data;

      return result;
    } catch (error) {
      alert("지출 데이터를 불러오는 도중 오류가 발생했습니다.");
    }
  }

  // Read: 지출 아이템 상세 정보
  async getExpenseItem(expenseId) {
    try {
      const path = `/expenses/${expenseId}`;
      const response = await this.#axios.get(path);
      const result = response.data;

      return result;
    } catch (error) {
      alert("지출 데이터를 불러오는 도중 오류가 발생했습니다.");
    }
  }

  // Create: 새로운 지출 아이템 정보 추가
  async createExpenseItem(data) {
    try {
      const path = "/expenses";
      const response = await this.#axios.post(path, data);
      const result = response.data;

      return result;
    } catch (error) {
      alert("지출 데이터를 생성하는 도중 오류가 발생했습니다.");
    }
  }

  // Update: 지출 아이템 정보 수정
  async updateExpenseItem(data) {
    try {
      const path = `/expenses/${data.id}`;
      const response = await this.#axios.patch(path, data);
      const result = response.data;

      return result;
    } catch (error) {
      alert("지출 데이터를 수정하는 도중 오류가 발생했습니다.");
    }
  }

  // Delete: 지출 아이템 삭제
  async deleteExpenseItem(expenseId) {
    try {
      const path = `/expenses/${expenseId}`;
      const response = await this.#axios.delete(path);
      const result = response.data;

      return result;
    } catch (error) {
      alert("지출 데이터를 삭제하는 도중 오류가 발생했습니다.");
    }
  }
}

export default ExpenseAPI;
