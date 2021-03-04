import React, { useMemo } from 'react';
import BlockFeatures from '../blocks/BlockFeatures';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { sendContactPetition } from '../../api/contact';
import { ShowSuccesAlert } from '../../alerts/ShowSuccessAlert';
import Form from './ContactFormComponent';

const ContactForm = () => {
    const image: string = '/images/';
    const initialValues = () => ({
        email: '',
        name: '',
        issue: '',
        message: '',
    });
    const validationForm = Yup.object({
        email: Yup.string().email('El email no tiene el formato correcto').required('El email es requerído'),
        name: Yup.string().required('El nombre es requerido'),
        issue: Yup.string().required('El asunto es requerido'),
        message: Yup.string().required('El mensaje es requerido'),
    });
    const sendMessage = (values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        sendContactPetition(values)
            .then(response => {
                ShowSuccesAlert('Mensaje Enviado', 'success', 'Pronto nos pondremos en contacto con usted').then(
                    result => result
                );
                resetForm({});
            })
            .catch(err => {
                ShowSuccesAlert('Upss!!', 'error', 'Ocurrio un Error').then(result => result);
            });
    };
    return (
        <div className={'grid grid-cols-1 mt-10 contact-form '}>
            {useMemo(
                () => (
                    <BlockFeatures />
                ),
                []
            )}
            <div className={'grid md:grid-cols-2 grid-cols-1 border-gray-100 border-t-2'}>
                <div
                    className={'bg-blue-100 text-center items-center md:py-0 py-20 flex justify-center'}
                    style={{
                        backgroundImage: 'url("/images/form_contact.png")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <p className={'text-5xl text-white py-auto'}>
                        INFORMACIÓN Y <br /> <span className={'font-bold'}>COTIZACIONES</span>
                    </p>
                </div>
                <div className={'md:px-28 px-8'}>
                    <Formik initialValues={initialValues()} onSubmit={sendMessage} validationSchema={validationForm}>
                        {props => {
                            return <Form formik={props} />;
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
export default ContactForm;
