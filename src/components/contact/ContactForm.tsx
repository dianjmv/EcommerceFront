import React, {useMemo} from "react";
import BlockFeatures from "../blocks/BlockFeatures";
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup';
import {sendContactPetition} from "../../api/contact";
import {ShowConfirmAlert} from "../../alerts/ShowConfirmAlert";
import {ShowSuccesAlert} from "../../alerts/ShowSuccessAlert";
import result from "postcss/lib/result";

const Form = ({formik}: any) => {
    return (
        <form action="" className={'grid grid-cols-1  form-group my-10'} onSubmit={formik.handleSubmit}>
            <input type="text"
                   placeholder={'Nombre'}
                   id='name'
                   className={formik.touched.name && formik.errors.name ? 'form-control is-invalid' : 'form-control my-2'}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.name}</p>
                </div>
            ) : null}
            <input type="email"
                   placeholder={'Tu correo Electrónico'}
                   id='email'
                   className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control my-2'}
                   value={formik.values.email}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.email}</p>
                </div>
            ) : null}
            <input
                type="text"
                id="issue"
                placeholder={'Asunto'}
                className={formik.touched.issue && formik.errors.issue ? 'form-control is-invalid' : 'form-control my-2'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.issue}

            />
            {formik.touched.issue && formik.errors.issue ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.issue}</p>
                </div>
            ) : null}
            <textarea
                placeholder={'Mensaje'}
                id={'message'}
                className={formik.touched.message && formik.errors.message ?
                    'form-control is-invalid' : 'form-control my-2'} rows={6}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.message}</p>
                </div>
            ) : null}
            <input type="submit" className={formik.errors? 'btn btn-black mx-32 my-2': 'btn btn-black md:mx-32 '} value={'Enviar'}/>
        </form>
    )
}
const ContactForm = () => {
    const image: string = '/images/'
    const initialValues = () => ({
        email: '',
        name: '',
        issue: '',
        message: ''
    })
    const validationForm = Yup.object({
        email: Yup.string().email('El email no tiene el formato correcto').required('El email es requerído'),
        name: Yup.string().required('El nombre es requerido'),
        issue: Yup.string().required('El asunto es requerido'),
        message: Yup.string().required('El mensaje es requerido')
    })
    const sendMessage = (values: any, {setSubmitting, setErrors, setStatus, resetForm}:any) => {
        sendContactPetition(values).then((response)=>{
            ShowSuccesAlert('Mensaje Enviado', 'success', 'Pronto nos pondremos en contacto con usted').then(result => (result))
            resetForm({})
        }).catch(err=>{
            ShowSuccesAlert('Upss!!', 'error', 'Ocurrio un Error').then(result=>result)
        })
    }
    return (
        <div className={'grid grid-cols-1 mt-10 contact-form '}>
            {useMemo(() => <BlockFeatures/>, [])}
            <div className={'grid md:grid-cols-12 grid-cols-1 border-gray-100 border-t-2'}>
                <div className={'hidden md:grid  md:col-start-1 md:col-span-5 bg-blue-100 text-center items-center'}
                     style={{backgroundImage: 'url("/images/form-contact-back.png")', backgroundSize: 'cover',
                         backgroundRepeat  : 'no-repeat',
                         backgroundPosition: 'center',}}>
                    <p className={'text-5xl text-white py-auto'}>INFORMACIÓN Y <br/> <span
                        className={'font-bold'}>COTIZACIONES</span></p>
                </div>
                <div className={'md:col-start-6 md:col-span-6 col-start-1 md:px-64 px-8'}>
                    <Formik initialValues={initialValues()} onSubmit={sendMessage}

                            validationSchema={validationForm}>
                        {
                            props => {
                                return (<Form formik={props}/>)
                            }
                        }

                    </Formik>
                </div>
            </div>
        </div>
    )

}
export default ContactForm;
