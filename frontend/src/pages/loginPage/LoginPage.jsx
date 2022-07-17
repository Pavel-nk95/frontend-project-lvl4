import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

const LoginSchema = Yup.object({
  name: Yup.string().required(),
  password: Yup.string().required(),
});

function LoginPage() {
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
                        id="name"
                        label="Ваш ник"
                        size="lg"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        autoComplete="name"
                      />
                      <MDBInput
                        className={inputFieldClass}
                        type="password"
                        id="password"
                        label="Пароль"
                        size="lg"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        autoComplete="password"
                      />
                      {authFailed ? (
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block' }}
                        >
                          Неверные имя пользователя или пароль
                        </div>
                      ) : null}
                      <MDBBtn size="lg" type="submit" className="mt-4" block>
                        Войти
                      </MDBBtn>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <MDBCardFooter className="text-center">
                Нет аккаунта? <Link to="/signup">Зарегестрируйтесь</Link>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default LoginPage;
