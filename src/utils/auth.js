const domain = "https://simak-ti.htp.my.id";

const adminLogin = async ({ username, password }, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const mahasiswaLogin = async ({ username, password }, callback) => {
  try {
    const response = await fetch(`${domain}/mahasiswa/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const mahasiswaDaftar = async (form, callback) => {
  try {
    const response = await fetch(`${domain}/mahasiswa`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const pembimbingLogin = async ({ username, password }, callback) => {
  try {
    const response = await fetch(`${domain}/pembimbing/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const adminVerifyToken = async (access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators/token-verify`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export {
  adminLogin,
  adminVerifyToken,
  mahasiswaLogin,
  pembimbingLogin,
  mahasiswaDaftar,
};
