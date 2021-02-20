import Head from "next/head";
import React from "react";
import {useCompanyInfo} from "../../store/company/companyHooks";
import {Formik} from "formik";
import Form from "./ContactFormComponent";
import * as Yup from "yup";
import {sendContactPetition} from "../../api/contact";
import {ShowSuccesAlert} from "../../alerts/ShowSuccessAlert";

function SiteContactForm(){
    const companyInfo = useCompanyInfo()
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
        <div>
            <Head>
                <title>{`${companyInfo.company_name} | Contactenos`}</title>
            </Head>
            <div className={'bg-blue-700 text-center py-6'}>
                <h1 className={'text-white text-5xl font-bold'}>Contáctanos</h1>
            </div>
            <div className={'grid grid-cols-2 mt-10'}>
                <div>

                </div>
                <div className={'md:px-32 bg-blue-700'}>
                    <h2 className={'text-white text-2xl mt-4'}>Déjanos un comentario</h2>
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
export default SiteContactForm
