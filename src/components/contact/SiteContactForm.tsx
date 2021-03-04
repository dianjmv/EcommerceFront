import Head from "next/head";
import React from "react";
import {useCompanyInfo} from "../../store/company/companyHooks";
import {Formik} from "formik";
import Form from "./ContactFormComponent";
import * as Yup from "yup";
import {sendContactPetition} from "../../api/contact";
import {ShowSuccesAlert} from "../../alerts/ShowSuccessAlert";
import MapContainer from "../shared/MapContainer";
import SocialNetworks from "../social-networks/SocialNetworks";


const mapUrl =`https://maps.googleapis.com/maps/api/js?v=3.exp$key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`

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
            <div className={'bg-blue-700 text-center py-6 '}>
                <h1 className={'text-white text-5xl font-bold'}>Contáctanos</h1>
            </div>
            <div className={'grid md:grid-cols-2 grid-cols-1 mt-10'}>
                <div className={'md:h-full h-96'}>
                    <MapContainer />
                </div>
                <div className={'md:px-28 bg-blue-700'}>
                    <h2 className={'text-white text-2xl mt-4 px-2'}>Déjanos un comentario</h2>
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
            <SocialNetworks/>

        </div>
    )
}
export default SiteContactForm
