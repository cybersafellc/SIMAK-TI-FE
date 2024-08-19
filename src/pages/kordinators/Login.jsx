import { Button, Card, Container, Form, Toast } from "react-bootstrap";
import Section from "../../components/Section";
import React, { useEffect } from "react";
import Message from "../../components/Message";
import { adminLogin } from "../../utils/auth";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [pesan, setPesan] = React.useState("");

  const changeUsername = ({ target }) => setUsername(target.value);
  const changePassword = ({ target }) => setPassword(target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage(false);
    if (!username || !password) {
      setError(true);
      return;
    }
    await adminLogin(
      { username: username, password: password },
      (err, data) => {
        if (err) {
          setMessage(true);
          setPesan(err.message);
          return;
        }
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "/kordinators";
        return;
      }
    );
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) window.location.href = "/kordinators";
  }, []);

  return (
    <>
      <Message
        view={message}
        onClose={() => setMessage(false)}
        error={true}
        pesan={pesan}
      />
      <Section className="py-5">
        <Container className="pt-0 pt-lg-5">
          <div>
            <h2 className="text-center fw-light mb-5">Masuk Sebagai Admin</h2>
          </div>
          <Card className="w-100 w-card-login rounded-0 border-0 border-lg-1">
            <Card.Body className="p-1 px-lg-5">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1011059302"
                    onChange={changeUsername}
                    value={username}
                  />
                  {error ? (
                    <Form.Text className="text-danger">
                      Masukkan NIDN sebagai username
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    onChange={changePassword}
                    value={password}
                  />
                  {error ? (
                    <Form.Text className="text-danger">
                      Masukkan password yang valid
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSibmit">
                  <Button
                    className="w-100 bg-success border-success"
                    type="submit"
                  >
                    Masuk
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </Section>
    </>
  );
}
