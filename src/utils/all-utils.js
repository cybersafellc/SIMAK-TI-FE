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

const getSeminarKP = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/kp?page=${page}`, {
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

const getSeminarProposal = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/proposal?page=${page}`, {
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

const getSeminarHasil = async (page, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/hasil?page=${page}`, {
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

const getSeminarKPID = async (id, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/kp?id=${id}`, {
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

const getSeminarProposalID = async (id, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/proposal?id=${id}`, {
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

const getSeminarHasilID = async (id, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/hasil?id=${id}`, {
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

const getSeminarKPSearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/kp?search=${search}`, {
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
const getSeminarProposalSearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(
      `${domain}/seminar/ta/proposal?search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return await callback(false, data.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getSeminarHasilSearch = async (search, access_token, callback) => {
  try {
    const response = await fetch(
      `${domain}/seminar/ta/hasil?search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
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

const pengajuanTa = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const pengajuanKp = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const pengajuanSeminarKp = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/kp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const pengajuanSeminarProposal = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/proposal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const pengajuanSeminarHasil = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/hasil`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const revisiTa = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/ta/revisi`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const revisiKp = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp/revisi`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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

const getMahasiswaProfile = async (access_token, callback) => {
  try {
    const response = await fetch(`${domain}/mahasiswa/profile`, {
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

const getPembimbingProfile = async (access_token, callback) => {
  try {
    const response = await fetch(`${domain}/pembimbing/profile`, {
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

const getKordinatorsProfile = async (access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators/profile`, {
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

const updatePembimbingProfile = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/pembimbing/profile`, {
      method: "PUT", // Assuming you want to add files, so using POST method
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

const updateKordinatorsProfile = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators/profile`, {
      method: "PUT", // Assuming you want to add files, so using POST method
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

const updatePembimbingPassword = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/pembimbing/password`, {
      method: "PUT", // Assuming you want to add files, so using POST method
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

const updateKordinatorsPassword = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kordinators/password`, {
      method: "PUT", // Assuming you want to add files, so using POST method
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

const SeminarKpSetujui = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/kp/disetujui`, {
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

const SeminarProposalDisetujui = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/proposal`, {
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

const SeminarHasilDisetujui = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/hasil`, {
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

const SeminarKpPenilaian = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/kp/penilaian`, {
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

const SeminarProposalPenilaian = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/proposal/penilaian`, {
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

const SeminarHasilPenilaian = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/seminar/ta/hasil/penilaian`, {
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

const kpSetJudul = async (form, access_token, callback) => {
  try {
    const response = await fetch(`${domain}/kp/set-judul-laporan`, {
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
  kpSetJudul,
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
  getMahasiswaProfile,
  getPembimbingProfile,
  updatePembimbingProfile,
  getKordinatorsProfile,
  updatePembimbingPassword,
  updateKordinatorsProfile,
  updateKordinatorsPassword,
  pengajuanTa,
  revisiTa,
  revisiKp,
  pengajuanKp,
  getSeminarKP,
  getSeminarKPSearch,
  getSeminarKPID,
  SeminarKpSetujui,
  SeminarKpPenilaian,
  getSeminarProposal,
  getSeminarProposalID,
  getSeminarProposalSearch,
  SeminarProposalPenilaian,
  SeminarProposalDisetujui,
  getSeminarHasil,
  getSeminarHasilSearch,
  getSeminarHasilID,
  SeminarHasilDisetujui,
  SeminarHasilPenilaian,
  pengajuanSeminarKp,
  pengajuanSeminarProposal,
  pengajuanSeminarHasil,
};
