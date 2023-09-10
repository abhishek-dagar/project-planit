import axios from "axios";

const url = "/api/user";

const userEndpoints = {
  login: url + "/login",
  logout: url + "/logout",
  register: url + "/register",
  fetchUser: url + "/userDetails",
};

export async function loginAction({
  emailOrUsername,
  password,
}: {
  emailOrUsername: string;
  password: string;
}) {
  try {
    const response = await axios.post(userEndpoints.login, {
      emailOrUsername,
      password,
    });
    return { response: response.data };
  } catch (err) {
    return { err };
  }
}
export async function logoutAction() {
  try {
    const response = await axios.post(userEndpoints.logout, {});
    return { response: response.data };
  } catch (err) {
    return { err };
  }
}
export async function userRegisterAction(data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const response = await axios.post(userEndpoints.register, data);

    return { response: response.data };
  } catch (err) {
    return { err };
  }
}
export async function fetchUser() {
  try {
    const response = await axios.get(userEndpoints.fetchUser);

    return { response: response.data.data };
  } catch (err) {
    return { err };
  }
}
