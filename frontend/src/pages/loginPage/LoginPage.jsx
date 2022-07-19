import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import './LoginPage.css';
import key from './assets/key.png';
import * as Yup from 'yup';
import cn from 'classnames';
import routes from '../../routes.js';

import { useAuth } from '../../hooks/index.js';

const LoginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

function LoginPage() {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        const { from } = location.state || {
          from: { pathname: routes.chatPagePath() },
        };
        navigate(from);
      } catch (err) {
        console.error(err);
        if (!err.isAxiosError) {
          console.log('Неизвестная ошибка');
          return;
        }

        if (err.response?.status === 401) {
          setAuthFailed(true);
        } else {
          console.log('Ошибка сети');
        }
      }
    },
  });

  const inputFieldClass = cn('mb-4', {
    'is-invalid': authFailed,
  });

  return (
    <section className="login-main d-flex align-items-center flex-fill">
      <MDBContainer breakpoint="md">
        <MDBRow>
          <MDBCol center className="d-flex justify-content-center">
            <MDBCard>
              <MDBCardHeader className="display-6 text-center">
                Войти
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    className="d-flex justify-content-center mb-4 mt-4"
                    size={6}
                  >
                    <img src={key} className="img-fluid w-50" alt="login" />
                  </MDBCol>
                  <MDBCol center size={6}>
                    <form onSubmit={formik.handleSubmit}>
                      <MDBInput
                        className={inputFieldClass}
                        type="text"
                        id="username"
                        label="Ваш ник"
                        size="lg"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        autoComplete="username"
                      />
                      <MDBInput
                        className={inputFieldClass}
                        type="password"
                        id="password"
                        label="Пароль"
                        size="lg"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        autoComplete="password"
                      />
                      {authFailed && (
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block' }}
                        >
                          Неверные имя пользователя или пароль
                        </div>
                      )}
                      <MDBBtn size="lg" type="submit" className="mt-4" block>
                        Войти
                      </MDBBtn>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <MDBCardFooter className="text-center">
                Нет аккаунта?{' '}
                <Link to={routes.signupPagePath()}>Зарегестрируйтесь</Link>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default LoginPage;
