import { Helmet } from "react-helmet";

import FootersAuth from "../../components/FootersAuth";
import React from "react";
import { useLocation } from "react-router-dom"; // 1
import {
  getKPID,
  getPembimbing,
  getPembimbingProfile,
  kpDitolak,
  kpSetJadwal,
  kpSetJudul,
  kpSetujui,
} from "../../utils/all-utils";
import { Badge, Nav, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
import UpNav from "../../components/pembimbing/UpNav";
import Sidebar from "../../components/pembimbing/Sidebar";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function KpDetailsPmb() {
  const [id, setId] = React.useState("");
  const [kp, setKp] = React.useState({});
  const [pembimbing, setPembimbing] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [profile, setProfile] = React.useState({});

  const [dosenPembimbing, setDosenPembimbing] = React.useState("");
  const [keterangan, setKeterangan] = React.useState("");
  const changePembimbing = ({ target }) => setDosenPembimbing(target.value);
  const changeKeterangan = ({ target }) => setKeterangan(target.value);

  const query = useQuery(); // 3

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [judulLaporan, setJudulLaporans] = React.useState("");
  const changeJudulLaporan = ({ target }) => setJudulLaporans(target.value);
  const [tanggalAkhir, setTanggalAkhir] = React.useState("");
  const changeTanggalAkhir = ({ target }) => setTanggalAkhir(target.value);
  const setJudulLaporan = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("pmb_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/pembimbing/login";
        return;
      }
      setLoading(true);
      const form = {
        id: query.get("id"),
        judul_laporan: judulLaporan,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          kpSetJudul(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Set Judul");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan pmb_token valid") {
        localStorage.removeItem("pmb_token");
        window.location.href = "/pembimbing/login";
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
        const accessToken = localStorage.getItem("pmb_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/pembimbing/login";
          return;
        }

        const [kpData, profile] = await Promise.all([
          new Promise((resolve, reject) => {
            getKPID(query.get("id"), accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getPembimbingProfile(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setKp(kpData);
        setProfile(profile);
        setJudulLaporans(kpData?.judul_laporan);
        console.log(kpData);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (
          err.message ==
          `tidak ada mahasiswa bimbingan dengan id ${query.get("id")}`
        ) {
          alert(err);
          window.location.href = "/pembimbings/kerja-praktek";
        } else if (err.message == "tolong masukkan access_token valid") {
          localStorage.removeItem("pmb_token");
          window.location.href = "/pembimbing/login";

          // Unauthorized
        } else {
          console.error("Error fetching data:", err);
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
          <UpNav user={profile} />
          <Sidebar />
          <main id="main" className="min-vh-100 bg-light">
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
                            href="/pembimbings"
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
                              {kp?.detail_mahasiswa?.nama}
                            </h5>
                            <p className="text-center text-secondary mb-4">
                              Teknik Industri
                            </p>
                            <ul className="list-group list-group-flush mb-4">
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">NIM</h6>
                                <span>{kp?.detail_mahasiswa?.nim}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">No Hp</h6>
                                <span>{kp?.detail_mahasiswa?.no_hp}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">PA</h6>
                                <span>
                                  {kp?.detail_mahasiswa?.pembimbing_akademik
                                    ? kp?.detail_mahasiswa?.pembimbing_akademik
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
                                <span>{kp?.judul_laporan || "-"}</span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing</h6>
                                <span>{profile?.nama || "-"}</span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Tanggal Disetujui</h6>
                                <span>
                                  {`${new Date(kp?.created_at).getDate()}-${
                                    new Date(kp?.created_at).getMonth() + 1
                                  }-${new Date(
                                    kp?.created_at
                                  ).getFullYear()} ${new Date(
                                    kp?.created_at
                                  ).getHours()}:${new Date(
                                    kp?.created_at
                                  ).getMinutes()}`}
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
                              id="password-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#password-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="password-tab-pane"
                              aria-selected="false"
                            >
                              Set Judul Laporan
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
                                    href={
                                      kp?.detail_pengajuan_kp
                                        ?.form_rekomendasi_pa_1
                                    }
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
                                    href={
                                      kp?.detail_pengajuan_kp
                                        ?.form_rekomendasi_pa_2
                                    }
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
                                    href={
                                      kp?.detail_pengajuan_kp
                                        ?.form_persetujuan_perusahaan
                                    }
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
                                    href={
                                      kp?.detail_pengajuan_kp?.bukti_pembayaran
                                    }
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
                                    href={
                                      kp?.detail_pengajuan_kp
                                        ?.bukti_selesai_praktikum
                                    }
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
                                  {kp?.detail_pengajuan_kp?.ipk}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Jumlah SKS</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.detail_pengajuan_kp?.jumlah_sks}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">KRS</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.detail_pengajuan_kp?.krs}
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
                                    href={
                                      kp?.detail_pengajuan_kp?.transkip_nilai
                                    }
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
                                    kp?.detail_pengajuan_kp?.created_at
                                  ).getDate()}-${
                                    new Date(
                                      kp?.detail_pengajuan_kp?.created_at
                                    ).getMonth() + 1
                                  }-${new Date(
                                    kp?.detail_pengajuan_kp?.created_at
                                  ).getFullYear()} ${new Date(
                                    kp?.detail_pengajuan_kp?.created_at
                                  ).getHours()}:${new Date(
                                    kp?.detail_pengajuan_kp?.created_at
                                  ).getMinutes()}`}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Tanggal Mulai KP</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.detail_pengajuan_kp?.tanggal_mulai_kp ? (
                                    `${new Date(
                                      kp.detail_pengajuan_kp?.tanggal_mulai_kp
                                    ).getDate()}-${
                                      new Date(
                                        kp.detail_pengajuan_kp?.tanggal_mulai_kp
                                      ).getMonth() + 1
                                    }-${new Date(
                                      kp.detail_pengajuan_kp?.tanggal_mulai_kp
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
                                  {kp?.detail_pengajuan_kp
                                    ?.tanggal_selesai_kp ? (
                                    `${new Date(
                                      kp.detail_pengajuan_kp?.tanggal_selesai_kp
                                    ).getDate()}-${
                                      new Date(
                                        kp.detail_pengajuan_kp?.tanggal_selesai_kp
                                      ).getMonth() + 1
                                    }-${new Date(
                                      kp.detail_pengajuan_kp?.tanggal_selesai_kp
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
                                  {kp?.detail_pengajuan_kp?.keterangan || "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Status</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.detail_pengajuan_kp?.status ===
                                    "ditolak" && (
                                    <span className="badge rounded-pill bg-danger">
                                      Ditolak
                                    </span>
                                  )}
                                  {kp?.detail_pengajuan_kp?.status ===
                                    "diterima" && (
                                    <span className="badge rounded-pill bg-success">
                                      Disetujui
                                    </span>
                                  )}
                                  {kp?.detail_pengajuan_kp?.status ===
                                    "menunggu" && (
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
                            id="password-tab-pane"
                            role="tabpanel"
                            aria-labelledby="password-tab"
                            tabIndex={0}
                          >
                            {true ? (
                              <form onSubmit={setJudulLaporan}>
                                <div className="row gy-3 gy-xxl-4">
                                  <div className="col-12">
                                    <label
                                      htmlFor="newPassword"
                                      className="form-label"
                                    >
                                      Judul Laporan
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="newPassword"
                                      value={judulLaporan}
                                      onChange={changeJudulLaporan}
                                    />
                                  </div>

                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      Set Judul
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
