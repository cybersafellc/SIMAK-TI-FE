import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import React, { useEffect } from "react";
import {
  addPembimbing,
  getPembimbing,
  getPembimbingSearch,
} from "../../utils/all-utils";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; // 1
import DeleteBerkas from "../../components/kordinators/DeleteBerkas";
import UpNav from "../../components/UpNav";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import Message from "../../components/Message";
import FootersAuth from "../../components/FootersAuth";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function Pembimbings() {
  const [namaDosen, setNamaDosen] = React.useState("");
  const changeNamaDosen = ({ target }) => setNamaDosen(target.value);
  const [nidn, setNidn] = React.useState("");
  const changeNidn = ({ target }) => setNidn(target.value);
  const [noHp, setNoHp] = React.useState("");
  const changeNoHp = ({ target }) => setNoHp(target.value);
  const [jabatan, setJabatan] = React.useState("");
  const changeJabatan = ({ target }) => setJabatan(target.value);
  const [email, setEmail] = React.useState("");
  const changeEmail = ({ target }) => setEmail(target.value);
  const [password, setPassword] = React.useState("");
  const changePassword = ({ target }) => setPassword(target.value);

  const [berkas, setBerkas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading
  const [page, setPage] = React.useState(1);
  const query = useQuery(); // 3
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [deskripsi, setDeskripsi] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [pembimbing, setPembimbing] = React.useState([]);
  const changeFile = ({ target }) => setFile(target.files[0]);
  const changeDeskripsi = ({ target }) => setDeskripsi(target.value);
  const navigateIncrement = () => {
    window.location.href =
      "/kordinators/pembimbing?page=" + (parseInt(page) + 1);
  };
  const navigateDecrement = () => {
    if (page < 2) return;
    window.location.href =
      "/kordinators/pembimbing?page=" + (parseInt(page) - 1);
  };
  const changeSearch = async ({ target }) => {
    setSearch(target.value);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      const [mahasiswa] = await Promise.all([
        new Promise((resolve, reject) => {
          getPembimbingSearch(target.value, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      setPembimbing(mahasiswa);
      console.log(mahasiswa);
    } catch (err) {
      // Tangani error dengan lebih hati-hati, misalnya:
      if (err.message !== "Failed to fetch") {
        // Unauthorized
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
      } else {
        console.error("Error fetching data:", err);
        // Tampilkan pesan error kepada pengguna atau lakukan tindakan lain yang sesuai
      }
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };
  const addPembimbingsss = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        nama: namaDosen,
        no_hp: noHp,
        nidn: nidn,
        jabatan: jabatan,
        password: password,
        email: email,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          addPembimbing(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menambahkan");
        setShow(false);
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setShow(false);
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
  useEffect(() => {
    if (query.get("page")) {
      setPage(query.get("page"));
    }
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }
        const [berkas] = await Promise.all([
          new Promise((resolve, reject) => {
            getPembimbing(query.get("page") || 1, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setPembimbing(berkas);
        console.log(berkas);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (err.message !== "Failed to fetch") {
          // Unauthorized
          localStorage.removeItem("access_token");
          window.location.href = "/kordinators/login";
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
      <Helmet>
        <script
          src="/assets/controller/console-bsb.js"
          type="text/javascript"
        />
        <script src="/assets/controller/chart-1.js" type="text/javascript" />
        <script src="/assets/controller/chart-3.js" type="text/javascript" />
        <script src="/assets/controller/chart-4.js" type="text/javascript" />
      </Helmet>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Dosen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="text"
              placeholder="Nama Dosen"
              value={namaDosen}
              onChange={changeNamaDosen}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="text"
              placeholder="NIDN"
              value={nidn}
              onChange={changeNidn}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="text"
              placeholder="Nomor Handphone"
              value={noHp}
              onChange={changeNoHp}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="text"
              placeholder="Jabatan"
              value={jabatan}
              onChange={changeJabatan}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={changeEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={changePassword}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={addPembimbingsss}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          <Sidebar />
          <UpNav />
          <section className="py-3 py-md-4 py-xl-5 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="h4">Dosen Pembimbing</h1>
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Pembimbing
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <Section className="bg-light pb-5">
            <Message
              view={view}
              error={error}
              pesan={message}
              onClose={() => setView(false)}
            />

            <Container className="">
              <div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Cari Dosen Pembimbing</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nidn / Nama"
                    value={search}
                    onChange={changeSearch}
                  />
                  <Form.Text className="text-muted text-capitalize">
                    Untuk Mencari Dosen Pembimbing, Silahkan Masukkan nidn atau
                    nama Dosen Pembimbing
                  </Form.Text>
                </Form.Group>
              </div>
              <div>
                <Card>
                  <Card.Header className="fw-bold text-uppercase">
                    LIST DOSEN PEMBIMBING
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Table
                      striped
                      hover
                      size="sm"
                      responsive="sm"
                      className="w-100 overflow-scroll"
                    >
                      <thead>
                        <tr className="text-uppercase">
                          <th>nidn</th>
                          <th>nama</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pembimbing?.map((data, index) => {
                          return (
                            <tr>
                              <td>{data?.nidn}</td>
                              <td>{data?.nama}</td>
                              <td>
                                <Badge className="bg-success">
                                  {data?.status}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                        {pembimbing.length < 1 ? (
                          <tr>
                            <td colSpan={5} className="text-center">
                              Tidak Ada
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-end py-2">
                      <Button
                        className="d-flex justify-conent-between align-items-center bg-success border-success"
                        onClick={() => setShow(true)}
                      >
                        <i class="bx bx-plus"></i>Tambahkan
                      </Button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-4">
                      <Button
                        disabled={page < 2}
                        className="bg-transparent border-success text-success"
                        onClick={navigateDecrement}
                      >
                        <i class="bx bxs-left-arrow"></i>Prev
                      </Button>
                      <span> Page {page}</span>
                      <Button
                        disabled={berkas.length < 30}
                        className="bg-transparent border-success text-success"
                        onClick={navigateIncrement}
                      >
                        Next<i class="bx bxs-right-arrow"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Container>
          </Section>
          <FootersAuth />
        </>
      )}
    </>
  );
}
