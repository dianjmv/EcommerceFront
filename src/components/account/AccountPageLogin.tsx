// react
import React, { Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import Check9x7Svg from '../../svg/check-9x7.svg';
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import AccountLoginForm from './AccountLoginForm';
import AccountRegisterForm from './AccountRegisterForm';
import * as Yup from 'yup';
import { sendContactPetition } from '../../api/contact';
import { ShowSuccesAlert } from '../../alerts/ShowSuccessAlert';
import Form from '../contact/ContactFormComponent';
import { Formik } from 'formik';
import AuthRepository from '../../api/authRepository';
import { toast } from 'react-toastify';
import { useAddUser, useRemoveUserLogged, useUserLogged } from '../../store/auth/authHooks';
import { useRouter } from 'next/router';
import { useCompanyInfo } from '../../store/company/companyHooks';

export default function AccountPageLogin() {
    const authRepository = new AuthRepository();
    const userLogged = useUserLogged();
    const resetUser = useRemoveUserLogged();
    const addUserForLogin = useAddUser();
    const router = useRouter();
    const companyInfo = useCompanyInfo();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
    useEffect(() => {
        resetUser();
    }, []);

    const breadcrumb = [
        { title: 'Inicio', url: '/' },
        { title: 'Mi Cuenta', url: '' },
    ];

    const initialValuesLogin = () => ({
        login_email: '',
        login_password: '',
    });

    const initialValuesRegister = () => ({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    const validationFormLogin = Yup.object({
        login_email: Yup.string().email('El email no tiene el formato correcto').required('El email es requerído'),
        login_password: Yup.string()
            .required('La contraseña es requerida')
            .min(8, 'La contraseña debe tener mínimo 8 caracteres'),
    });

    const validationFormRegister = Yup.object({
        first_name: Yup.string().required('El nombre es requerído'),
        last_name: Yup.string().required('El apellido es requerido'),
        email: Yup.string().email('El email no tiene el formato correcto').required('El email es requerído'),
        username: Yup.string().required('El username es requerido'),
        password: Yup.string()
            .required('La contraseña es requerida')
            .min(8, 'La contraseña debe tener mínimo 8 caracteres'),
        password_confirmation: Yup.string()
            .required('La validacion de contraseña es requerida')
            .min(8, 'La contraseña debe tener mínimo 8 caracteres')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
    });

    const login = (values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        setLoading(true);
        authRepository
            .login({ email: values.login_email, password: values.login_password })
            .then(({ data }) => {
                addUserForLogin(data);
            })
            .catch(({ response }) => {
                setLoading(false);
                toast.error(response.data.message[0].messages[0].message);
            })
            .finally(() => {
                setLoading(false);
                router.push('/');
                resetForm({});
            });
    };

    const registerUser = (values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        setLoadingRegister(true);
        authRepository
            .register({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                username: values.username,
            })
            .then(({ data }) => {
                addUserForLogin(data);
            })
            .catch(({ response }) => {
                toast.error(response.data.message[0].messages[0].message);
                setLoadingRegister(false);
            })
            .finally(() => {
                setLoadingRegister(false);
                router.push('/');
                resetForm({});
            });
    };

    return (
        <Fragment>
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Mi Cuenta` : null}</title>
            </Head>

            <PageHeader header="Mi Cuenta" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">Iniciar Sesión</h3>
                                    <Formik
                                        initialValues={initialValuesLogin()}
                                        onSubmit={login}
                                        validationSchema={validationFormLogin}
                                    >
                                        {props => {
                                            return <AccountLoginForm formik={props} loading={loading} />;
                                        }}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">Registrarse</h3>
                                    <Formik
                                        initialValues={initialValuesRegister()}
                                        onSubmit={registerUser}
                                        validationSchema={validationFormRegister}
                                    >
                                        {props => {
                                            return <AccountRegisterForm formik={props} loading={loadingRegister} />;
                                        }}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
