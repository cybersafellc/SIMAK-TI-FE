import {
  Badge,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";

import React, { useEffect } from "react";
import { getKP, getTA } from "../../utils/all-utils";
import UpNav from "../../components/UpNav";
import { Helmet } from "react-helmet";

export default function Kordinators() {
  const [kp, setKp] = React.useState([]);
  const [ta, setTa] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }

        const [kpData, taData] = await Promise.all([
          new Promise((resolve, reject) => {
            getKP(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getTA(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);

        setKp(kpData);
        setTa(taData);
        console.log(taData);
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
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <Section>
          <Sidebar active={"0"} />
          <UpNav />
          <Container fluid className="ctr">
            <div className="mb-5">
              <Row className="g-4">
                <Col lg="3">
                  <Card className="h-100">
                    <Card.Body className="p-4 shadow bg-danger text-white text-uppercase rounded-0 ">
                      <h5 className="fw-bold">Mahasiswa</h5>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <h1 className="fw-light">404</h1>
                        <i class="bx bx-user fs-1"></i>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg="3">
                  <Card className="h-100">
                    <Card.Body className="p-4 shadow bg-warning text-white text-uppercase rounded-0 ">
                      <h5 className="fw-bold">Dosen Pembimbing</h5>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <h1 className="fw-light">404</h1>
                        <i class="bx bx-user fs-1"></i>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg="3">
                  <Card className="h-100">
                    <Card.Body className="p-4 shadow bg-primary text-white text-uppercase rounded-0 ">
                      <h5 className="fw-bold">Berkas</h5>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <h1 className="fw-light">404</h1>
                        <i class="bx bx-file fs-1"></i>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg="3">
                  <Card className="h-100">
                    <Card.Body className="p-4 shadow bg-success text-white text-uppercase rounded-0 ">
                      <h5 className="fw-bold">Kordinator</h5>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <h1 className="fw-light">404</h1>
                        <i class="bx bx-user fs-1"></i>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              <Row className="g-4">
                <Col lg="6">
                  <Card>
                    <Card.Header className="fw-bold text-uppercase">
                      Pengajuan Kerja Praktek
                    </Card.Header>
                    <Card.Body className="p-2">
                      <Table striped hover size="sm" responsive="md">
                        <thead>
                          <tr className="text-uppercase">
                            <th>NO</th>
                            <th>Nim</th>
                            <th>nama</th>
                            <th>tanggal</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kp?.map((data, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data?.mahasiswa?.nim}</td>
                                <td>{data?.mahasiswa?.nama}</td>
                                <td>{`${new Date(
                                  data?.created_at
                                ).getDate()}-${new Date(
                                  data?.created_at
                                ).getMonth()}-${new Date(
                                  data?.created_at
                                ).getFullYear()} ${new Date(
                                  data?.created_at
                                ).getHours()}:${new Date(
                                  data?.created_at
                                ).getMinutes()}`}</td>
                                <td>
                                  {data?.status === "menunggu" ? (
                                    <Badge pill bg="warning" text="dark">
                                      <span className="fst-italic">
                                        Menunggu
                                      </span>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                  {data?.status === "diterima" ? (
                                    <Badge pill bg="success" text="white">
                                      <span className="fst-italic">
                                        Disetujui
                                      </span>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                  {data?.status === "ditolak" ? (
                                    <Badge pill bg="danger" text="white">
                                      <span className="fst-italic">
                                        Ditolak
                                      </span>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          {kp.length < 1 ? (
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
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg="6">
                  <Card>
                    <Card.Header className="fw-bold text-uppercase">
                      Pengajuan Kerja Praktek
                    </Card.Header>
                    <Card.Body className="p-2">
                      <Table striped hover size="sm" responsive="md">
                        <thead>
                          <tr className="text-uppercase">
                            <th>NO</th>
                            <th>Nim</th>
                            <th>nama</th>
                            <th>tanggal</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ta?.map((data, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{data?.mahasiswa?.nim}</td>
                                <td>{data?.mahasiswa?.nama}</td>
                                <td>{`${new Date(
                                  data?.created_at
                                ).getDate()}-${new Date(
                                  data?.created_at
                                ).getMonth()}-${new Date(
                                  data?.created_at
                                ).getFullYear()} ${new Date(
                                  data?.created_at
                                ).getHours()}:${new Date(
                                  data?.created_at
                                ).getMinutes()}`}</td>
                                <td>
                                  {data?.status === "menunggu" ? (
                                    <Badge pill bg="warning" text="dark">
                                      <span className="fst-italic">
                                        Menunggu
                                      </span>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                  {data?.status === "diterima" ? (
                                    <Badge pill bg="success" text="white">
                                      <span className="fst-italic">
                                        Disetujui
                                      </span>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                  {data?.status === "ditolak" ? (
                                    <Badge pill bg="danger" text="white">
                                      <span className="fst-italic">
                                        Ditolak
                                      </span>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          {ta.length < 1 ? (
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
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
