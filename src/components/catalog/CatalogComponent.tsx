import React, {Fragment} from "react";
import Head from "next/head";
import {useCompanyInfo} from "../../store/company/companyHooks";
import AppLink from "../shared/AppLink";
import {PDFViewer} from 'react-view-pdf';
import ContactForm from "../contact/ContactForm";


function CatalogComponent() {
    const companyInfo = useCompanyInfo();

    return (
        <Fragment>
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Catálogo` : null}</title>
            </Head>
            <div className={'grid gri-cols-1 container text-center justify-center'}>
                <h1 className={'text-3xl text-black font-bold '}> Catálogo de Productos </h1>
                <div className={'w-192 my-10'}>
                    {
                        companyInfo !== undefined ?
                            <PDFViewer url={`${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.catalog.url}`}/> : null
                    }
                </div>
                <AppLink href={`${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.catalog.url}`}
                         className={'btn btn-primary mx-auto'}>
                    <a download target={'_blank'}>
                        Descargar
                    </a>
                </AppLink>
            </div>
            <ContactForm/>

        </Fragment>
    )
}

export default CatalogComponent;
