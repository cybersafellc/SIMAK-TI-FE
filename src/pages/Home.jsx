import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Section from "../components/Section";
import Navbars from "../components/Navbars";
import Footers from "../components/Footers";
import Cards from "../components/Home/Cards";

export default function Home() {
  const handleLogin = () => {
    window.location.href = "/mahasiswa/login";
  };
  return (
    <>
      <Navbars />
      <Section className="d-flex align-items-center bg-body-tertiary pt-10 pb-5">
        <Container>
          <div>
            <Row>
              <Col lg="6">
                <h1 className="display-5 fw-bold">
                  Sistem Informasi Manajemen Kerja Praktek dan Tugas Akhir
                  Teknik Industri
                </h1>
                <p className="fs-5 pt-3 fw-light">
                  Dengan sistem ini, mahasiswa dapat mengelola dan memantau
                  seluruh proses Kerja Praktek (KP) dan Tugas Akhir (TA) secara
                  efektif. Mulai dari pengajuan proposal hingga seminar hasil,
                  semua dapat diakses dan diurus dalam satu platform yang
                  user-friendly, memastikan proses berjalan lancar dan efisien.
                </p>

                <div className="d-flex gap-2 pt-3">
                  <Button
                    className="fs-6 p-3 bg-success border-success"
                    onClick={handleLogin}
                  >
                    Pengajuan KP
                  </Button>
                  <Button
                    className="fs-6 p-3 bg-transparent text-success border-success"
                    onClick={handleLogin}
                  >
                    Pengajuan TA
                  </Button>
                </div>
              </Col>
              <Col lg="6">
                <Image
                  className="w-100 rounded-5 d-none d-lg-block"
                  src="Gedung_Rektorat5.jpg"
                />
              </Col>
            </Row>
          </div>
        </Container>
      </Section>
      <Section className="py-5">
        <Container>
          <div>
            <div className="mb-5">
              <h1 className="fw-light text-center">Layanan</h1>
            </div>
            <Row className="g-4">
              <Col md="8">
                <Cards
                  url="#"
                  title={"Tugas Akhir"}
                  icon={<i class="bx bxs-graduation fs-1"></i>}
                  text="Kami menyediakan layanan lengkap untuk membantu mahasiswa dalam proses Tugas Akhir (TA), yang mencakup pengajuan proposal, seminar proposal, dan seminar hasil. Layanan kami memastikan setiap tahapan dilalui dengan lancar, dengan dukungan administrasi dan bimbingan yang memadai agar mahasiswa dapat fokus pada kualitas penelitian mereka."
                />
              </Col>
              <Col md="4" className="d-md-block d-none"></Col>
              <Col md="4" className="d-md-block d-none"></Col>
              <Col md="8">
                <Cards
                  url="#"
                  title={"Kerja Praktek"}
                  icon={<i class="bx bxs-briefcase fs-1"></i>}
                  text="Kami menyediakan layanan untuk memfasilitasi proses Kerja Praktek (KP) mahasiswa, mulai dari pendaftaran hingga evaluasi akhir. Dengan layanan ini, mahasiswa dapat dengan mudah mengajukan tempat KP, mendapatkan bimbingan dari dosen pembimbing, dan memastikan bahwa semua tahapan KP tercatat dan dievaluasi secara komprehensif."
                />
              </Col>
              <Col md="8">
                <Cards
                  url="#"
                  title={"Seminar"}
                  icon={<i class="bx bxs-slideshow fs-1"></i>}
                  text="Kami mendukung mahasiswa dalam penyelenggaraan seminar, termasuk Seminar Proposal, Seminar Hasil, dan Seminar Kerja Praktek (KP). Layanan ini mencakup bantuan dalam proses pendaftaran, penjadwalan, hingga pelaporan hasil seminar, memastikan setiap tahap berjalan sesuai dengan standar akademik dan jadwal yang ditetapkan.."
                />
              </Col>
              {/* <Col md="4" className="d-md-block d-none"></Col> */}
              {/* <Col md="4" className="d-md-block d-none"></Col> */}
            </Row>
          </div>
        </Container>
      </Section>
      <div className="">
        <Container>
          <div className="mt-5">
            <div className="mb-5">
              <h1 className="fw-light text-center">Alamat</h1>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1366.8112726651389!2d101.41557204967526!3d0.49856374910056045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1723787512475!5m2!1sen!2sid"
              width="100%"
              height="450"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Container>
      </div>

      <Footers />
    </>
  );
}
