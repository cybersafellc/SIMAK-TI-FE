import { Button, Card, Container, Form, Toast } from "react-bootstrap";
import Section from "../../components/Section";
import React, { useEffect } from "react";
import Message from "../../components/Message";
import { adminLogin, mahasiswaLogin } from "../../utils/auth";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [pesan, setPesan] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const changeUsername = ({ target }) => setUsername(target.value);
  const changePassword = ({ target }) => setPassword(target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading();
    setError(false);
    setMessage(false);
    setLoading(true);
    if (!username || !password) {
      setLoading(false);
      setError(true);
      return;
    }
    await mahasiswaLogin(
      { username: username, password: password },
      (err, data) => {
        if (err) {
          setMessage(true);
          setPesan(err.message);
          setLoading(false);
          return;
        }
        localStorage.setItem("mhs_token", data.access_token);
        window.location.href = "/mahasiswa";
        return;
      }
    );
  };

  useEffect(() => {
    const access_token = localStorage.getItem("mhs_token");
    if (access_token) window.location.href = "/mahasiswa";
  }, []);
  return (
    <>
      <Message
        view={message}
        onClose={() => setMessage(false)}
        error={true}
        pesan={pesan}
      />
      <main id="main">
        {/* Login 13 - Bootstrap Brain Component */}
        <section className="bg-light py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="text-center mb-3">
                      <a href="index.html">
                        <img
                          src="/LOGO-UMRI-COLOR-ORI.webp"
                          alt="BootstrapBrain Logo"
                          width={90}
                          height="auto"
                        />
                      </a>
                    </div>
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                      Masuk Sebagai Mahasiswa
                    </h2>
                    <form onSubmit={handleLogin}>
                      <div className="row gy-2 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="1011059302"
                              onChange={changeUsername}
                              value={username}
                            />
                            <label htmlFor="email" className="form-label">
                              Nim
                            </label>
                            {error ? (
                              <Form.Text className="text-danger">
                                Masukkan Nim sebagai username
                              </Form.Text>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              name="password"
                              id="password"
                              defaultValue=""
                              type="password"
                              placeholder="********"
                              onChange={changePassword}
                              value={password}
                            />
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            {error ? (
                              <Form.Text className="text-danger">
                                Masukkan password yang valid
                              </Form.Text>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex gap-2 justify-content-between">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue=""
                                name="rememberMe"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label text-secondary"
                                htmlFor="rememberMe"
                              >
                                Tetap masuk
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid my-3">
                            <button
                              className="btn btn-success btn-lg "
                              disabled={loading}
                              type="submit"
                            >
                              Log in
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 text-secondary text-center">
                            Tidak Memiliki Akun Kordinator?{" "}
                            <a
                              href="auth-register.html"
                              className="link-primary text-decoration-none"
                            >
                              Sign up
                            </a>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
