export default class CredentialManager {
  static setCredentials = (username: string, password: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };

  static getCredentials = () => {
    console.log("SET CREDENTIALS");
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    return { username, password };
  };

  static getUsername = () => {
    return localStorage.getItem("username");
  };

  static clearCredentials = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };
}
