const domain = "https://simak-ti.htp.my.id";

const getFiles = async (page, callback) => {
  try {
    const res = await fetch(`${domain}/files?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const files = await res.json();
    if (files.error) throw new Error(files.message);
    return await callback(false, files.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getFilesSearch = async (query, callback) => {
  try {
    const res = await fetch(`${domain}/files?search=${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const files = await res.json();
    if (files.error) throw new Error(files.message);
    return await callback(false, files.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getPembimbing = async (page, callback) => {
  try {
    const res = await fetch(`${domain}/pembimbing?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const files = await res.json();
    if (files.error) throw new Error(files.message);
    return await callback(false, files.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getPembimbingId = async (id, callback) => {
  try {
    const res = await fetch(`${domain}/pembimbing?id=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const files = await res.json();
    if (files.error) throw new Error(files.message);
    return await callback(false, files.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const addPembimbing = async (form, access_token, callback) => {
  try {
    const res = await fetch(`${domain}/pembimbing`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(form),
    });
    const files = await res.json();
    if (files.error) throw new Error(files.message);
    return await callback(false, files.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getPembimbingSearch = async (query, callback) => {
  try {
    const res = await fetch(`${domain}/pembimbing?search=${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const files = await res.json();
    if (files.error) throw new Error(files.message);
    return await callback(false, files.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getKP = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getKPSearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp?search=${search}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getKPID = async (id, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp?id=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getTA = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getTAID = async (id, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta?id=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getTASearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta?search=${search}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const deleteBerkas = async (id, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/files`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const addBerkas = async (access_token, formData, callback) => {
  try {
    const response = await fetch(`${domain}/files`, {
      method: "POST", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getMahasiswa = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/mahasiswa?page=${page}`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getMahasiswaSearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/mahasiswa?search=${search}`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getKordinators = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators?page=${page}`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getKordinatorsSearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators?search=${search}`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getCountMahasiswa = async (callback) => {
  try {
    const response = await fetch(`${domain}/mahasiswa/count`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getCountFiles = async (callback) => {
  try {
    const response = await fetch(`${domain}/files/count`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    alert(`${domain}/files/count}`);
    return await callback(error, false);
  }
};

const getCountKordinators = async (callback) => {
  try {
    const response = await fetch(`${domain}/kordinators/count`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getCountPembimbing = async (callback) => {
  try {
    const response = await fetch(`${domain}/pembimbing/count`, {
      method: "GET", // Assuming you want to add files, so using POST method
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const kpSetujui = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp/diterima`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const taSetujui = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta/diterima`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const kpDitolak = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp/ditolak`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const taDitolak = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta/ditolak`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const kpSetJadwal = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp/set-jadwal`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export {
  getFiles,
  getFilesSearch,
  getPembimbing,
  getPembimbingSearch,
  getKP,
  getTA,
  deleteBerkas,
  addBerkas,
  getMahasiswa,
  getMahasiswaSearch,
  getCountFiles,
  getCountKordinators,
  getCountMahasiswa,
  getCountPembimbing,
  getKordinators,
  getKordinatorsSearch,
  addPembimbing,
  getKPSearch,
  getTASearch,
  getKPID,
  kpSetujui,
  kpDitolak,
  kpSetJadwal,
  getTAID,
  getPembimbingId,
  taSetujui,
  taDitolak,
};
