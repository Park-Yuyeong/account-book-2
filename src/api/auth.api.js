class AuthAPI {
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  // 회원가입
  async signUp(data) {
    try {
      const path = "/register";
      const response = await this.#axios.post(path, data);
      const result = response.data;

      return result;
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  // 로그인
  async logIn(data) {
    try {
      const path = "/login?expiresIn=10m";
      const response = await this.#axios.post(path, data);
      const result = response.data;
      localStorage.setItem("accessToken", result.accessToken);

      return result;
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  // 회원정보 확인
  async getUserInfo() {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const path = "/user";
        const response = await this.#axios.get(path, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = response.data;

        return result;
      } catch (error) {
        alert("회원정보 불러오기에 실패했습니다.");
        localStorage.clear();
      }
    }
  }

  // 프로필 변경
  async updateUserInfo(data) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const path = "/profile";
        const response = await this.#axios.patch(path, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = response.data;

        return result;
      } catch (error) {
        alert("프로필 업데이트를 실패했습니다.");
      }
    }
  }
}

export default AuthAPI;
