// third-party
import Head from 'next/head';

// data stubs
import theme from '../../data/theme';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import AccountLoginForm from './AccountLoginForm';
import { Formik } from 'formik';
import React from 'react';
import AuthRepository from '../../api/authRepository';
import AccountChangePasswordForm from './AccountChangePasswordForm';
import { useAddUser, useUserLogged } from '../../store/auth/authHooks';
import { useCompanyInfo } from '../../store/company/companyHooks';

export default function AccountPagePassword() {
    const authRepository = new AuthRepository();
    const userLogged = useUserLogged();
    const addUser = useAddUser();
    const companyInfo = useCompanyInfo();

    const initialValuesChangePassword = () => ({
        password: '',
        password_confirmation: '',
    });
    const validationFormChangePassword = Yup.object({
        password: Yup.string()
            .required('La contraseña es requerida')
            .min(8, 'La contraseña debe tener mínimo 8 caracteres'),
        password_confirmation: Yup.string()
            .required('La validación de contraseña es requerida')
            .min(8, 'La contraseña debe tener mínimo 8 caracteres')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
    });
    const changePassword = (values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        // @ts-ignore
        authRepository.resetPassword(values.password, userLogged.userLogged?.user.id).then(({ data }) => {
            const dataUser = {
                jwt: localStorage.getItem('access_token'),
                user: data,
            };
            // @ts-ignore
            addUser(dataUser);
            toast.success('Contraseña actualizada');
        });
        resetForm({});
    };

    return (
        <div className="card">
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Cambiar Contraseña` : null}</title>
            </Head>

            <div className="card-header">
                <h5>Cambiar Contraseña</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <Formik
                        initialValues={initialValuesChangePassword()}
                        onSubmit={changePassword}
                        validationSchema={validationFormChangePassword}
                    >
                        {props => {
                            return <AccountChangePasswordForm formik={props} />;
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
