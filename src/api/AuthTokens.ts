class AuthTokens {
  private static instance: AuthTokens;
  private token: string = "";
  private constructor() {}

  public static getInstance(): AuthTokens {
    if (!AuthTokens.instance) {
      AuthTokens.instance = new AuthTokens();
    }
    return AuthTokens.instance;
  }

  public setAccessToken(token: string): void {
    this.token = token;
  }

  public getAccessToken(): string {
    return this.token;
  }

  public removeAccessToken(): void {
    this.token = "";
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem("refreshToken", token);
  }
  public getRefreshToken(): string {
    const token = localStorage.getItem("refreshToken");
    return typeof token === "string" ? token : "";
  }

  public removeTokens(): void {
    this.token = "";
    localStorage.removeItem("refreshToken");
  }
}

export default AuthTokens;
