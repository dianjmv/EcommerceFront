// application
import AppLink from '../shared/AppLink';
import Indicator from './Indicator';
import Person20Svg from '../../svg/person-20.svg';
import url from '../../services/url';
import { useAddUser, useRemoveUserLogged, useUserLogged } from '../../store/auth/authHooks';
import React, { Component, useEffect, useState } from 'react';
import { IUserLogged } from '../../interfaces/user';
import * as Yup from 'yup';
import AccountLoginForm from '../account/AccountLoginForm';
import { Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import AuthRepository from '../../api/authRepository';

function IndicatorAccount() {
    const userLogged = useUserLogged();
    const removeUser = useRemoveUserLogged();
    const [userInfo, setUserInfo] = useState<IUserLogged | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
    const authRepository = new AuthRepository();
    const router = useRouter();
    const addUserForLogin = useAddUser();
    useEffect(() => {
        setUserInfo(userLogged.userLogged);
    }, [userLogged.userLogged]);

    function logout() {
        removeUser();
    }

    const initialValuesLogin = () => ({
        login_email: '',
        login_password: '',
    });
    const validationFormLogin = Yup.object({
        login_email: Yup.string().email('El email no tiene el formato correcto').required('El email es requerído'),
        login_password: Yup.string()
            .required('La contraseña es requerida')
            .min(8, 'La contraseña debe tener mínimo 8 caracteres'),
    });
    const login = (values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        setLoading(true);
        <ToastContainer autoClose={5000} hideProgressBar />;
        authRepository
            .login({ email: values.login_email, password: values.login_password })
            .then(({ data }) => {
                addUserForLogin(data);
                console.log(data);
                toast.success(`Bienvenido ${data.user.first_name} ${data.user.last_name}`);
            })
            .catch(({ response }) => {
                toast.error(response.data.message[0].messages[0].message);
                setLoading(false);
            })
            .finally(() => {
                resetForm({});
                setLoading(false);
            });
    };
    const imageAvatar = () => {
        if (userLogged.userLogged?.user.avatar) {
            return (
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URI}${userLogged.userLogged.user.avatar.url}`}
                    alt=""
                    className={'w-full h-full'}
                />
            );
        } else {
            return <img src="/images/avatars/avatar-3.jpg" alt="" />;
        }
    };

    const dropdown = (
        <div className="account-menu">
            {userInfo === null ? (
                <div className={'px-2 py-2'}>
                    <div className="account-menu__form-title">Ingresa a tu cuenta</div>
                    <Formik
                        initialValues={initialValuesLogin()}
                        onSubmit={login}
                        validationSchema={validationFormLogin}
                    >
                        {props => {
                            return <AccountLoginForm formik={props} loading={loading} />;
                        }}
                    </Formik>
                    <AppLink className={'text-sm my-2'} href={'/account/login'}>
                        Registrate aqui
                    </AppLink>
                </div>
            ) : (
                <div>
                    <div className="account-menu__divider" />
                    <AppLink href={url.accountDashboard()} className="account-menu__user">
                        <div className="account-menu__user-avatar">{imageAvatar()}</div>
                        <div className="account-menu__user-info">
                            <div className="account-menu__user-name">{`${userInfo.user.first_name} ${userInfo.user.last_name}`}</div>
                            <div className="account-menu__user-email">{`${userInfo.user.email}`}</div>
                        </div>
                    </AppLink>
                    <div className="account-menu__divider" />
                    <ul className="account-menu__links">
                        <li>
                            <AppLink href={url.accountProfile()}>Editar Perfil</AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountOrders()}>Historial de Ordenes</AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountPassword()}>Cambiar Contraseña</AppLink>
                        </li>
                    </ul>
                    <div className="account-menu__divider" />
                    <ul className="account-menu__links">
                        <li>
                            <AppLink onClick={() => logout()}>Cerrar Sesión</AppLink>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );

    return <Indicator url={url.accountSignIn()} dropdown={dropdown} icon={<Person20Svg />} />;
}

export default IndicatorAccount;
