import { Helmet } from "react-helmet";
import UpNav from "../../components/mahasiswa/UpNav";
import Sidebar from "../../components/mahasiswa/SideBar";
import FootersAuth from "../../components/FootersAuth";
import React from "react";
import {
  getKP,
  getMahasiswaProfile,
  getPembimbing,
  getPembimbingId,
  getSeminarHasil,
  getSeminarKP,
  getSeminarProposal,
  getTA,
  pengajuanKp,
  pengajuanSeminarHasil,
  pengajuanSeminarKp,
  pengajuanSeminarProposal,
  pengajuanTa,
  revisiKp,
  revisiTa,
} from "../../utils/all-utils";
import { Alert, Nav, Spinner } from "react-bootstrap";
import Message from "../../components/Message";

export default function SeminarHasilMhs() {
  const [profile, setProfile] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading
  const [detailTa, setDetailTa] = React.useState({});
  const [pembimbing, setPembimbing] = React.useState([]);

  const [pb1, setPb1] = React.useState("");
  const [pb2, setPb2] = React.useState("");
  const [pb3, setPb3] = React.useState("");
  const [pb4, setPb4] = React.useState("");

  const [formRekomendasi1, setFormRekomendasi1] = React.useState("");
  const changgeFormRekomendasi1 = ({ target }) =>
    setFormRekomendasi1(target.value);
  const [formRekomendasi2, setFormRekomendasi2] = React.useState("");
  const changgeFormRekomendasi2 = ({ target }) =>
    setFormRekomendasi2(target.value);

  const [formPersetujuanPerusahaan, setFormPersetujuanPerusahaan] =
    React.useState("");
  const changgeFormPersetujuanPerusahaan = ({ target }) =>
    setFormPersetujuanPerusahaan(target.value);
  const [judul1, setJudul1] = React.useState("");
  const changeJudul1 = ({ target }) => setJudul1(target.value);
  const [judul2, setJudul2] = React.useState("");
  const changeJudul2 = ({ target }) => setJudul2(target.value);
  const [deskripsi1, setDeskripsi1] = React.useState("");
  const changeDeskripsi1 = ({ target }) => setDeskripsi1(target.value);
  const [deskripsi2, setDeskripsi2] = React.useState("");
  const changeDeskripsi2 = ({ target }) => setDeskripsi2(target.value);
  const [pembimbing1, setPembimbing1] = React.useState("");
  const changePembimbin1 = ({ target }) => setPembimbing1(target.value);
  const [pembimbing2, setPembimbing2] = React.useState("");
  const changePembimbin2 = ({ target }) => setPembimbing2(target.value);
  const [pembimbing3, setPembimbing3] = React.useState("");
  const changePembimbin3 = ({ target }) => setPembimbing3(target.value);
  const [pembimbing4, setPembimbing4] = React.useState("");
  const changePembimbin4 = ({ target }) => setPembimbing4(target.value);
  const [buktiPembayaran, setBuktiPembayaran] = React.useState("");
  const changeBuktiPembayaran = ({ target }) =>
    setBuktiPembayaran(target.value);
  const [buktiSelesaiPraktikum, setBuktiSelesaiPraktikum] = React.useState("");
  const changebuktiSelesaiPraktikum = ({ target }) =>
    setBuktiSelesaiPraktikum(target.value);
  const [buktiSelesaiKp, setBuktiSelesaiKp] = React.useState("");
  const changeBuktiSelesaiKp = ({ target }) => setBuktiSelesaiKp(target.value);
  const [ipk, setIpk] = React.useState("");
  const changeIpk = ({ target }) => setIpk(target.value);
  const [jumlahSks, setJumlahSks] = React.useState("");
  const changeSks = ({ target }) => setJumlahSks(target.value);
  const [krs, setKrs] = React.useState("");
  const changeKrs = ({ target }) => setKrs(target.value);
  const [transkipNilai, setTranskipNilai] = React.useState("");
  const changetranskipNilaiKrs = ({ target }) => setTranskipNilai(target.value);

  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [buktiAccPembimbing, setBuktiAccPembimbing] = React.useState("");
  const changeBuktiAccPembimbing = ({ target }) =>
    setBuktiAccPembimbing(target.value);

  const handleAjukanSeminarKp = async () => {
    try {
      const accessToken = localStorage.getItem("mhs_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/mahasiswa/login";
        return;
      }
      setLoading(true);
      const form = {
        bukti_acc_pembimbing: buktiAccPembimbing,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          pengajuanSeminarHasil(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Mengajkuan Seminar!");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message == "tolong masukkan access_token valid") {
        localStorage.removeItem("mhs_token");
        window.location.href = "/mahasiswa/login";
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
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("mhs_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/mahasiswa/login";
          return;
        }

        const [mahasiswaProfile, seminarKp] = await Promise.all([
          new Promise((resolve, reject) => {
            getMahasiswaProfile(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getSeminarHasil(1, accessToken, (err, data) => {
              if (err) resolve(undefined);
              else resolve(data);
            });
          }),
        ]);
        setProfile(mahasiswaProfile);
        setDetailTa(seminarKp);
        console.log(seminarKp);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (err.message == "tolong masukkan access_token valid") {
          // Unauthorized
          localStorage.removeItem("mhs_token");
          window.location.href = "/mahasiswa/login";
        } else {
          console.error("Error fetching data:", err);
          // Tampilkan pesan error kepada pengguna atau lakukan tindakan lain yang sesuai
        }
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };
    fetchData();
  }, []); // useEffect tetap berjalan sekali saja
  return (
    <>
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          <UpNav user={profile} />
          <Sidebar />
          <Helmet>
            <script
              src="/assets/controller/console-bsb.js"
              type="text/javascript"
            />
            <script
              src="/assets/controller/chart-1.js"
              type="text/javascript"
            />
            <script
              src="/assets/controller/chart-3.js"
              type="text/javascript"
            />
            <script
              src="/assets/controller/chart-4.js"
              type="text/javascript"
            />
          </Helmet>
          <Message
            view={view}
            error={error}
            pesan={message}
            onClose={() => setView(false)}
          />
          <main id="main" className="min-vh-100 bg-light">
            {/* Section - Bootstrap Brain Component */}
            {/* Breadcrumb */}
            <section className="py-3 py-md-4 py-xl-5 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 className="h4">Seminar Hasil</h1>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb m-0 fs-7">
                        <li className="breadcrumb-item">
                          <a
                            className="link-primary text-decoration-none"
                            href="index.html"
                          >
                            Home
                          </a>
                        </li>

                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Seminar Hasil
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
            {/* Section - Bootstrap Brain Component */}
            <section className="pb-3 pb-md-4 pb-xl-5 bg-light min-vh-100">
              <div className="container">
                <div className="row gy-4 gy-lg-0">
                  <div className="col-12 col-lg-4 col-xl-3">
                    <div className="row gy-4">
                      <div className="col-12">
                        <div className="card widget-card border-light shadow-sm">
                          <div className="card-header text-bg-success">
                            Informasi Tugas Akhir
                          </div>
                          <div className="card-body">
                            <ul className="list-group list-group-flush mb-0">
                              <li className="list-group-item">
                                <h6 className="mb-1">Judul Penelitian</h6>
                                <span>
                                  {detailTa?.details_seminar
                                    ?.judul_penelitian || "-"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing 1</h6>
                                <span>
                                  {detailTa?.details_seminar?.pembimbing_satu
                                    ?.nama || "-"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing 2</h6>
                                <span>
                                  {detailTa?.details_seminar?.pembimbing_dua
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
                            {detailTa?.status &&
                            detailTa?.status !== "ditolak" ? (
                              <>
                                <h5 className="mb-3">Data Seminar Hasil</h5>
                                <div className="row g-0">
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">
                                      Bukti Acc Dari Pembimbing
                                    </div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      <Nav.Link
                                        target="_blank"
                                        className="text-primary text-decoration-underline"
                                        href={detailTa?.bukti_acc_pembimbing}
                                      >
                                        {detailTa?.bukti_acc_pembimbing
                                          ? "Lihat Disini"
                                          : "-"}
                                      </Nav.Link>
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Tanggal Seminar</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.tanggal_seminar
                                        ? `${new Date(
                                            detailTa?.tanggal_seminar
                                          ).getDate()}-${
                                            new Date(
                                              detailTa?.tanggal_seminar
                                            ).getMonth() + 1
                                          }-${new Date(
                                            detailTa?.tanggal_seminar
                                          ).getFullYear()} `
                                        : "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Jam Mulai Seminar</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.jam_mulai_seminar
                                        ? `${new Date(
                                            detailTa?.jam_mulai_seminar
                                          ).getDate()}-${
                                            new Date(
                                              detailTa?.jam_mulai_seminar
                                            ).getMonth() + 1
                                          }-${new Date(
                                            detailTa?.jam_mulai_seminar
                                          ).getFullYear()} ${
                                            new Date(
                                              detailTa?.jam_mulai_seminar
                                            ).getHours() + 1
                                          }:${new Date(
                                            detailTa?.jam_mulai_seminar
                                          )
                                            .getMinutes()
                                            .toString()
                                            .padStart(2, "0")}`
                                        : "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">
                                      Jam Selesai Seminar
                                    </div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.jam_akhir_seminar
                                        ? `${new Date(
                                            detailTa?.jam_akhir_seminar
                                          ).getDate()}-${
                                            new Date(
                                              detailTa?.jam_akhir_seminar
                                            ).getMonth() + 1
                                          }-${new Date(
                                            detailTa?.jam_akhir_seminar
                                          ).getFullYear()} ${
                                            new Date(
                                              detailTa?.jam_akhir_seminar
                                            ).getHours() + 1
                                          }:${new Date(
                                            detailTa?.jam_akhir_seminar
                                          )
                                            .getMinutes()
                                            .toString()
                                            .padStart(2, "0")}`
                                        : "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Ruangan</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.ruangan || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Lampiran</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.lampiran || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Penguji 1</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.penguji?.penguji_satu || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Penguji 2</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.penguji?.penguji_dua || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Nilai</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.penilaian?.nilai_semhas || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">
                                      Nilai Komprehensif
                                    </div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.penilaian
                                        ?.nilai_sidang_komprehensif || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">
                                      Nilai Pembimbing 1
                                    </div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.penilaian
                                        ?.nilai_pembimbing_satu || "-"}
                                    </div>
                                  </div>
                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">
                                      Nilai Pembimbing 2
                                    </div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.penilaian
                                        ?.niali_pembimbing_dua || "-"}
                                    </div>
                                  </div>

                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Tanggal Pengajuan</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {`${new Date(
                                        detailTa?.created_at
                                      ).getDate()}-${
                                        new Date(
                                          detailTa?.created_at
                                        ).getMonth() + 1
                                      }-${new Date(
                                        detailTa?.created_at
                                      ).getFullYear()} ${new Date(
                                        detailTa?.created_at
                                      ).getHours()}:${new Date(
                                        detailTa?.created_at
                                      )
                                        .getMinutes()
                                        .toString()
                                        .padStart(2, "0")}`}
                                    </div>
                                  </div>

                                  <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                    <div className="p-2">Status</div>
                                  </div>
                                  <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                    <div className="p-2">
                                      {detailTa?.status === "ditolak" && (
                                        <span className="badge rounded-pill bg-danger">
                                          Ditolak
                                        </span>
                                      )}
                                      {detailTa?.status === "disetujui" && (
                                        <span className="badge rounded-pill bg-success">
                                          Disetujui
                                        </span>
                                      )}
                                      {detailTa?.status === "menunggu" && (
                                        <span className="badge rounded-pill bg-warning">
                                          Menunggu
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div>
                                <div className="row gy-3 gy-xxl-4">
                                  <div className="col-12">
                                    <Alert variant="warning">
                                      <h6>Penting !</h6>
                                      <ul>
                                        <li>
                                          Pastikan anda sudah Mengajukan Tugas
                                          Akhir (TA) Di Sistem
                                        </li>
                                        <li>
                                          Pastikan kordinator Sudah Menyetujui
                                          Pengajuan Tugas Akhir (TA) anda.
                                        </li>
                                        <li>
                                          Pastikan anda Sudah Menyelesaikan
                                          Tahap Seminar Proposal anda.
                                        </li>
                                      </ul>
                                    </Alert>
                                  </div>
                                  <div className="col-12">
                                    <label
                                      htmlFor="inputFirstName"
                                      className="form-label"
                                    >
                                      Form bukti acc pembimbing, bukti
                                      Pembayaran dan Bukti Sudah Turnitin{" "}
                                      <span className="fst-italic text-danger">
                                        (cantumkan link google drive)
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputFirstName"
                                      value={buktiAccPembimbing}
                                      onChange={changeBuktiAccPembimbing}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <button
                                      className="btn btn-success"
                                      onClick={handleAjukanSeminarKp}
                                    >
                                      Ajukan Seminar Hasil
                                    </button>
                                  </div>
                                </div>
                              </div>
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
