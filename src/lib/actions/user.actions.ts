import axios from "axios";
import axiosClient from "../axios-functions/client";

const url = "/api/user";

const userEndpoints = {
  login: url + "/login",
  logout: url + "/logout",
  register: url + "/register",
  fetchUser: url + "/userDetails",
  fetchMembers: url + "/members",
  fetchMember: url + "/member",
  updateMember: url + "/member",
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
export async function fetchUser(cookie: string | undefined) {
  try {
    if (cookie) {
      const response = await axiosClient.get("/user/userDetails", {
        //@ts-ignore
        cookie: cookie,
      });

      if (response) {
        return { user: response.data };
      }
    }
    throw Error("User not found");
  } catch (err) {
    // console.log(err);

    return { err };
  }
}

export async function fetchMembers() {
  try {
    const response = await axios.get(userEndpoints.fetchMembers);

    return { response: response.data.data };
  } catch (err) {
    return { err };
  }
}

export async function fetchMember(memberId: string) {
  try {
    const response = await axios.post(userEndpoints.fetchMember, {
      id: memberId,
    });

    return { response: response.data.data };
  } catch (err) {
    return { err };
  }
}

export async function updateMember(member: any) {
  try {
    const response = await axios.put(userEndpoints.updateMember, member);

    return { response: response.data.data, success: response.data.success };
  } catch (err) {
    return { err };
  }
}
