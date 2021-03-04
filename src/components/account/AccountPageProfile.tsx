// third-party
import Head from 'next/head';

// data stubs
import theme from '../../data/theme';
import React, { useMemo, useState } from 'react';
import UploadRepository from '../../api/uploadRepository';
import { toast } from 'react-toastify';
import { ImageBanner } from '../../interfaces/imageBanner';
import * as Yup from 'yup';
import { useAddUser, useUserLogged } from '../../store/auth/authHooks';
import AccountLoginForm from './AccountLoginForm';
import { Formik } from 'formik';
import FormProfile from './FormProfile';
import AuthRepository from '../../api/authRepository';
import { IUser } from '../../interfaces/user';
import { data } from 'autoprefixer';
import SitePageNotFound from '../site/SitePageNotFound';
import { useCompanyInfo } from '../../store/company/companyHooks';

export default function AccountPageProfile() {
    const uploadRepository = new UploadRepository();
    const [image, setImage] = useState<any>([]);
    const [imageSelected, setImageSelected] = useState<any>([]);
    const [uploadedImage, setUploadedImage] = useState<number>(0);
    const authRepository = new AuthRepository();
    const addUser = useAddUser();
    const userLogged = useUserLogged();
    const companyInfo = useCompanyInfo();
    const [loading, setLoading] = useState<boolean>(false);

    function handdleSelectImage(event: any) {
        setImage(event.target.files);
        setImageSelected(URL.createObjectURL(event.target.files[0]));
    }

    function uploadFile() {
        const data = new FormData();
        if (image[0].type === 'image/jpeg') {
            Array.from(image).forEach((img: any) => {
                data.append('files', img);
            });
            uploadRepository
                .uploadImage(data)
                .then(({ data }) => setUploadedImage(data[0].id))
                .catch(error => console.log(error))
                .finally(() => toast.success('Imágen subida con éxito'));
        } else {
            toast.error('La imagen debe ser JPEG');
        }
    }
    const initialValuesProfile = () => ({
        first_name: userLogged.userLogged ? userLogged.userLogged?.user.first_name : '',
        last_name: userLogged.userLogged ? userLogged.userLogged?.user.last_name : '',
        email: userLogged.userLogged ? userLogged.userLogged?.user.email : '',
        username: userLogged.userLogged ? userLogged.userLogged?.user.username : '',
        phone_number: userLogged.userLogged ? userLogged.userLogged?.user.phone_number : '',
    });

    const validationFormProfile = Yup.object({
        first_name: Yup.string().required('El nombre es requerído'),
        last_name: Yup.string().required('El apellido es requerido'),
        email: Yup.string().email('El email no tiene el formato correcto').required('El email es requerído'),
        username: Yup.string().required('El username es requerido'),
        phone_number: Yup.number(),
    });

    const updateProfile = (values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        setLoading(true);
        const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            username: values.username,
            phone_number: values.phone_number,
            id: userLogged.userLogged?.user.id,
        };

        authRepository
            .uploadUser(userData, uploadedImage)
            .then(({ data }) => {
                const dataUser = {
                    jwt: localStorage.getItem('access_token'),
                    user: data,
                };
                // @ts-ignore
                addUser(dataUser);
            })
            .catch(err => {
                setLoading(false);
                toast.error('Ocurrió un error');
            })
            .finally(() => {
                setLoading(false);
                toast.success('Perfil actualizado');
            });
    };

    const imageAvatar = () => {
        if (imageSelected.length > 0) {
            return <img src={imageSelected} alt="" className={'w-full h-full'} />;
        } else if (userLogged.userLogged?.user.avatar) {
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
    if (userLogged.userLogged?.user) {
        return (
            <div className="card">
                <Head>
                    <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Cambiar Perfil` : null}</title>
                </Head>

                <div className="card-header">
                    <h5>Edita tu perfil</h5>
                </div>
                <div className="card-divider" />
                <div className="card-body">
                    <div className="row no-gutters">
                        <Formik
                            initialValues={useMemo(() => initialValuesProfile(), [])}
                            onSubmit={updateProfile}
                            validationSchema={validationFormProfile}
                        >
                            {props => {
                                return <FormProfile formik={props} loading={loading} />;
                            }}
                        </Formik>

                        <div className={'col-lg-5 col-xl-6'}>
                            <div className="form-group text-center">
                                <label htmlFor="profile-phone">Avatar</label>
                                <div className="profile-card__avatar mx-auto">
                                    {imageAvatar()}

                                    <input
                                        id={'avatar-upload'}
                                        onChange={handdleSelectImage}
                                        className="w-20 h-20 cursor-pointer block absolute mb-0 opacity-0 cursor-pointer"
                                        type="file"
                                        style={{
                                            top: '32px',
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={uploadFile}
                                    className="bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 inline-flex items-center"
                                >
                                    <span className="ml-2">Subir Avatar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <SitePageNotFound />;
    }
}
