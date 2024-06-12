import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import { destroyCookie, parseCookies } from "nookies";

const clearAllCookies = () => {
  const cookies = parseCookies();

  Object.keys(cookies).forEach((cookieName) => {
    destroyCookie(null, cookieName);
  });
};

export const postDataApi = async (endpoint: string, data: any = {}) => {
  const userToken: string | undefined = getCookie("token");
  const url = `${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        ...(data.headers || {}),
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401 || res.status === 403) {
      clearAllCookies();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
      // window.location.replace("/login");
    }
    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    window.location.replace("/login");
    return error;
  }
};
export const profileDataPost = async (endpoint: string, photoUrl: any) => {
  const userToken: string | undefined = getCookie("token");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const formdata = new FormData();

  if (photoUrl !== undefined && photoUrl) {
    formdata.append("file", photoUrl, photoUrl?.name);
  }
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: formdata,
  };
  const url = `${endpoint}`;
  try {
    const fetchResponse = await fetch(url, requestOptions);
    if (fetchResponse.status === 401 || fetchResponse.status === 403) {
      clearAllCookies();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
      window.location.replace("/login");
    }
    const data = await fetchResponse.json();
    data.status = fetchResponse.status;
    return data;
  } catch (e) {
    return e;
  }
};
export const postDataApiWithType = async (endpoint: string, data: any = {}) => {
  const msisdn: string | undefined = getCookie("user_msisdn");
  const userToken: string | undefined = getCookie("token");
  const url = `${endpoint}`;
  // const userToken = localStorage.getItem("token");
  // const userToken = token;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        type: "1",
        "Content-Type": "application/json",

        msisdn: msisdn,
        ...(data.headers || {}),
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401 || res.status === 403) {
      clearAllCookies();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
      window.location.replace("/login");
    }
    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    // // window.location.reload();
    return error;
  }
};

export const postWithHeader = async (endpoint: string, options: any = {}) => {
  const msisdn: any = getCookie("user_msisdn");
  const userToken: string | undefined = getCookie("token");
  const url = `${endpoint}`;
  const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("msisdn", msisdn);

  const raw = JSON.stringify(options);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const fetchResponse = await fetch(url, requestOptions);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const postWithHeaderAndBody = async (
  endpoint: string,
  options: any = {},
) => {
  const msisdn: any = getCookie("user_msisdn");
  const userToken: any = getCookie("token");
  const url = `${endpoint}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("msisdn", msisdn);
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const raw = JSON.stringify({
    ...options,
    msisdn: msisdn,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const fetchResponse = await fetch(url, requestOptions);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const getDataApi = async (endpoint: string, options: any = {}) => {
  const userToken: string | undefined = getCookie("token");
  const url = `${endpoint}` + (options.query || "");

  try {
    const response = await fetch(url, {
      ...options,
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (response.status === 401 || response.status === 403) {
      clearAllCookies();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
      window.location.replace("/login");
    }
    return await response.json();
  } catch (error) {
    // console.log("error", error);
    return error;
  }
};

export const deleteDataApi = async (endpoint: string, data: any = {}) => {
  const userToken: string | undefined = getCookie("token");
  const url = `${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      // body: JSON.stringify(data),
    });

    if (res.status === 401 || res.status === 403) {
      clearAllCookies();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
      window.location.replace("/login");
    }
    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    // console.log("error", error);
    // // window.location.reload();
    return error;
  }
};

export const patchDataApi = async (endpoint: string, data: any = {}) => {
  const userToken: string | undefined = getCookie("token");
  const url = `${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        ...(data.headers || {}),
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401 || res.status === 403) {
      clearAllCookies();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
      window.location.replace("/login");
    }
    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    // console.log(error);
    // // window.location.reload();
    return error;
  }
};

export const patchDataApiWithoutToken = async (
  endpoint: string,
  data: any = {},
) => {
  const url = `${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putDataApiWithoutToken = async (
  endpoint: string,
  data: any = {},
) => {
  const url = `${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postApiWithoutToken = async (
  endpoint: string,
  options: any = {},
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(options);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  try {
    const fetchResponse = await fetch(endpoint, requestOptions);

    const data = await fetchResponse.json();
    data.status = fetchResponse.status;
    return data;
  } catch (e) {
    return e;
  }
};

export const documentUploadWithFormData = async (
  endpoint: string,
  options: any = {},
) => {
  const userToken: string | undefined = getCookie("token");

  let formData = new FormData();
  options.files?.forEach((element: any, index: number) => {
    formData.append("files", element);
  });
  formData.append("admin_id", options.admin_id);
  formData.append("record_type_id", options.record_type_id);
  formData.append("filename", options.filename);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      ...(options.headers || {}),
    },
    body: formData,
  };
  const url = `${endpoint}`;
  try {
    const fetchResponse = await fetch(url, requestOptions);
    if (fetchResponse.status === 401 || fetchResponse.status === 403) {
      localStorage.clear();
      await Swal.fire({
        icon: "warning",
        text: "Session expired",
        showConfirmButton: true,
        timer: 4000,
      });
    }
    const data = await fetchResponse.json();
    data.status = fetchResponse.status;
    return data;
  } catch (e) {
    return e;
  }
};

export const postApiWithoutTokenWithFormData = async (
  endpoint: string,
  options: any = {},
) => {
  const myHeaders = new Headers();

  let formData = new FormData();
  formData.append("call_id", options.call_id);
  options.files?.forEach((element: any, index: number) => {
    formData.append("reports", element);
  });
  formData.append("reason", options.reason);
  formData.append("patient_id", options.patient_id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };
  const url = `${endpoint}`;
  try {
    const fetchResponse = await fetch(url, requestOptions);

    const data = await fetchResponse.json();
    data.status = fetchResponse.status;
    return data;
  } catch (e) {
    return e;
  }
};

export const deleteDataApiWithoutToken = async (endpoint: string) => {
  const url = `${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let response = await res.json();
    response.status = res.status;

    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
