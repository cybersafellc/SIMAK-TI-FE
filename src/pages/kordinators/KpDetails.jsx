import { Helmet } from "react-helmet";
import UpNav from "../../components/UpNav";
import Sidebar from "../../components/Sidebar";
import FootersAuth from "../../components/FootersAuth";
import React from "react";
import { useLocation } from "react-router-dom"; // 1
import {
  getKPID,
  getPembimbing,
  kpDitolak,
  kpSetJadwal,
  kpSetujui,
} from "../../utils/all-utils";
import { Badge, Nav, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function KpDetails() {
  const [id, setId] = React.useState("");
  const [kp, setKp] = React.useState({});
  const [pembimbing, setPembimbing] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [dosenPembimbing, setDosenPembimbing] = React.useState("");
  const [keterangan, setKeterangan] = React.useState("");
  const changePembimbing = ({ target }) => setDosenPembimbing(target.value);
  const changeKeterangan = ({ target }) => setKeterangan(target.value);

  const query = useQuery(); // 3

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [tanggalMulai, setTanggalMulai] = React.useState("");
  const changeTanggalMulai = ({ target }) => setTanggalMulai(target.value);
  const [tanggalAkhir, setTanggalAkhir] = React.useState("");
  const changeTanggalAkhir = ({ target }) => setTanggalAkhir(target.value);
  const setJadwal = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        id: query.get("id"),
        tanggal_mulai_kp: tanggalMulai,
        tanggal_selesai_kp: tanggalAkhir,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          kpSetJadwal(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menolak");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
        return;
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };
  const tolak = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        id: query.get("id"),
        keterangan: keterangan,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          kpDitolak(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menolak");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
        return;
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };
  const setujui = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        pembimbing_id: dosenPembimbing,
        id: query.get("id"),
        keterangan: keterangan,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          kpSetujui(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menyetujui");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
        return;
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  React.useEffect(() => {
    if (query.get("id")) {
      setId(query.get("id"));
    }
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }

        const [kpData, pembimbing1, pembimbing2, pembimbing3] =
          await Promise.all([
            new Promise((resolve, reject) => {
              getKPID(query.get("id"), accessToken, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbing(1, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbing(2, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbing(3, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
          ]);
        setKp(kpData);
        setPembimbing([...pembimbing1, ...pembimbing2, ...pembimbing3]);
        console.log(kpData);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (err.message == `pengajuan dengan id ${query.get("id")} tidak ada`) {
          alert(err);
          window.location.href = "/kordinators/kerja-praktek";
        } else if (err.message == "Failed to fetch") {
          console.error("Error fetching data:", err);
          // Unauthorized
        } else {
          localStorage.removeItem("access_token");
          window.location.href = "/kordinators/login";
          //   Tampilkan pesan error kepada pengguna atau lakukan tindakan lain yang sesuai
        }
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };
    fetchData();
  }, []); // useEffect tetap berjalan sekali saja
  return (
    <>
      <Helmet>
        <script
          src="/assets/controller/console-bsb.js"
          type="text/javascript"
        />
        <script src="/assets/controller/chart-1.js" type="text/javascript" />
        <script src="/assets/controller/chart-3.js" type="text/javascript" />
        <script src="/assets/controller/chart-4.js" type="text/javascript" />
        {/* <script src="https://unpkg.com/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> */}
      </Helmet>
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          {" "}
          <UpNav />
          <Sidebar />
          <main id="main">
            <Message
              view={view}
              error={error}
              pesan={message}
              onClose={() => setView(false)}
            />
            {/* Section - Bootstrap Brain Component */}
            {/* Breadcrumb */}
            <section className="py-3 py-md-4 py-xl-5 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 className="h4">Details Pengajuan KP</h1>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb m-0 fs-7">
                        <li className="breadcrumb-item">
                          <a
                            className="link-primary text-decoration-none"
                            href="/kordinators"
                          >
                            Home
                          </a>
                        </li>
                        <li className="breadcrumb-item">Kerja Praktek</li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Details
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
            {/* Section - Bootstrap Brain Component */}
            <section className="pb-3 pb-md-4 pb-xl-5 bg-light">
              <div className="container">
                <div className="row gy-4 gy-lg-0">
                  <div className="col-12 col-lg-4 col-xl-3">
                    <div className="row gy-4">
                      <div className="col-12">
                        <div className="card widget-card border-light shadow-sm">
                          <div className="card-header text-bg-success">
                            Informasi Mahasiswa
                          </div>
                          <div className="card-body">
                            <div className="text-center mb-3">
                              <img
                                src="/assets/img/profile/profile-img-1.jpg"
                                className="img-fluid rounded-circle"
                                alt="Luna John"
                              />
                            </div>
                            <h5 className="text-center mb-1">
                              {kp?.mahasiswa?.nama}
                            </h5>
                            <p className="text-center text-secondary mb-4">
                              Teknik Industri
                            </p>
                            <ul className="list-group list-group-flush mb-4">
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">NIM</h6>
                                <span>{kp?.mahasiswa?.nim}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">No Hp</h6>
                                <span>{kp?.mahasiswa?.no_hp}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">PA</h6>
                                <span>
                                  {kp?.mahasiswa?.pembimbing_akademik
                                    ? kp?.mahasiswa?.pembimbing_akademik
                                    : "-"}
                                </span>
                              </li>
                            </ul>
                            <div className="d-grid m-0"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="card widget-card border-light shadow-sm">
                          <div className="card-header text-bg-success">
                            Informasi Kerja Praktek
                          </div>
                          <div className="card-body">
                            <ul className="list-group list-group-flush mb-0">
                              <li className="list-group-item">
                                <h6 className="mb-1">Judul Laporan</h6>
                                <span>
                                  {kp?.details_disetujui?.judul_laporan || "-"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing</h6>
                                <span>
                                  {kp?.details_disetujui?.pembimbing_satu
                                    ?.nama || "-"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8 col-xl-9">
                    <div className="card widget-card border-light shadow-sm">
                      <div className="card-body p-4">
                        <ul
                          className="nav nav-tabs"
                          id="profileTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="overview-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#overview-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="overview-tab-pane"
                              aria-selected="true"
                            >
                              Detail
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#profile-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="profile-tab-pane"
                              aria-selected="false"
                            >
                              Setujui
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="email-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#email-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="email-tab-pane"
                              aria-selected="false"
                            >
                              Tolak
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="password-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#password-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="password-tab-pane"
                              aria-selected="false"
                            >
                              Set Jadwal
                            </button>
                          </li>
                        </ul>
                        <div
                          className="tab-content pt-4"
                          id="profileTabContent"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="overview-tab-pane"
                            role="tabpanel"
                            aria-labelledby="overview-tab"
                            tabIndex={0}
                          >
                            <h5 className="mb-3">Data Pengajuan</h5>
                            <div className="row g-0">
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Form Rekomendasi 1</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.form_rekomendasi_pa_1}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Form Rekomendasi 2</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.form_rekomendasi_pa_2}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">
                                  Form Persetujuan Perusahaan
                                </div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.form_persetujuan_perusahaan}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Bukti Pembayaran</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.bukti_pembayaran}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">
                                  Bukti Selesai Praktikum
                                </div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.bukti_selesai_praktikum}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">IPK</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.ipk}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Jumlah SKS</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.jumlah_sks}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">KRS</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.krs}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Transkip Nilai</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.transkip_nilai}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Tanggal Pengajuan</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {`${new Date(
                                    kp?.created_at
                                  ).getDate()}-${new Date(
                                    kp?.created_at
                                  ).getMonth()}-${new Date(
                                    kp?.created_at
                                  ).getFullYear()} ${new Date(
                                    kp?.created_at
                                  ).getHours()}:${new Date(
                                    kp?.created_at
                                  ).getMinutes()}`}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Tanggal Mulai KP</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.tanggal_mulai_kp ? (
                                    `${new Date(
                                      kp.tanggal_mulai_kp
                                    ).getDate()}-${
                                      new Date(kp.tanggal_mulai_kp).getMonth() +
                                      1
                                    }-${new Date(
                                      kp.tanggal_mulai_kp
                                    ).getFullYear()} `
                                  ) : (
                                    <span className="fst-italic">-</span>
                                  )}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Tanggal Expired KP</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.tanggal_selesai_kp ? (
                                    `${new Date(
                                      kp.tanggal_selesai_kp
                                    ).getDate()}-${
                                      new Date(
                                        kp.tanggal_selesai_kp
                                      ).getMonth() + 1
                                    }-${new Date(
                                      kp.tanggal_selesai_kp
                                    ).getFullYear()} `
                                  ) : (
                                    <span className="fst-italic">-</span>
                                  )}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Keterangan</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.keterangan || "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Status</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.status === "ditolak" && (
                                    <span className="badge rounded-pill bg-danger">
                                      Ditolak
                                    </span>
                                  )}
                                  {kp?.status === "diterima" && (
                                    <span className="badge rounded-pill bg-success">
                                      Disetujui
                                    </span>
                                  )}
                                  {kp?.status === "menunggu" && (
                                    <span className="badge rounded-pill bg-warning">
                                      Menunggu
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="profile-tab-pane"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                            tabIndex={0}
                          >
                            {kp?.status === "menunggu" ? (
                              <form
                                className="row gy-3 gy-xxl-4"
                                onSubmit={setujui}
                              >
                                <div className="col-12 ">
                                  <label
                                    htmlFor="inputCountry"
                                    className="form-label"
                                  >
                                    Dosen Pembimbing
                                  </label>
                                  <select
                                    className="form-select"
                                    id="inputCountry"
                                    onChange={changePembimbing}
                                    value={dosenPembimbing}
                                  >
                                    {pembimbing.map((pembimbing, index) => {
                                      return (
                                        <option value={pembimbing?.id}>
                                          {pembimbing?.nama}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="col-12">
                                  <label
                                    htmlFor="inputAbout"
                                    className="form-label"
                                  >
                                    Keterangan
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="inputAbout"
                                    value={keterangan}
                                    onChange={changeKeterangan}
                                  />
                                </div>
                                <div className="col-12">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={loading}
                                  >
                                    Setujui
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div>Tidak Dapat Menyetujui</div>
                            )}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="email-tab-pane"
                            role="tabpanel"
                            aria-labelledby="email-tab"
                            tabIndex={0}
                          >
                            {kp?.status === "menunggu" ? (
                              <form
                                className="row gy-3 gy-xxl-4"
                                onSubmit={tolak}
                              >
                                <div className="col-12">
                                  <label
                                    htmlFor="inputAbout"
                                    className="form-label"
                                  >
                                    Keterangan
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="inputAbout"
                                    value={keterangan}
                                    onChange={changeKeterangan}
                                  />
                                </div>
                                <div className="col-12">
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                    disabled={loading}
                                  >
                                    Tolak
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div>Tidak Dapat Menyetujui</div>
                            )}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="password-tab-pane"
                            role="tabpanel"
                            aria-labelledby="password-tab"
                            tabIndex={0}
                          >
                            {kp?.status === "diterima" &&
                            kp?.tanggal_mulai_kp == null &&
                            kp?.tanggal_selesai_kp == null ? (
                              <form onSubmit={setJadwal}>
                                <div className="row gy-3 gy-xxl-4">
                                  <div className="col-12">
                                    <label
                                      htmlFor="newPassword"
                                      className="form-label"
                                    >
                                      Tanggal Mulai KP
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      id="newPassword"
                                      value={tanggalMulai}
                                      onChange={changeTanggalMulai}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <label
                                      htmlFor="confirmPassword"
                                      className="form-label"
                                    >
                                      Tanggal Expired KP
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      id="confirmPassword"
                                      value={tanggalAkhir}
                                      onChange={changeTanggalAkhir}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      Simpan Jadwal
                                    </button>
                                  </div>
                                </div>
                              </form>
                            ) : (
                              <div>Belum Bisa Set Jadwal</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <FootersAuth />
        </>
      )}
    </>
  );
}
