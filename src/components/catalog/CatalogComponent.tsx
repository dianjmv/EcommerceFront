import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useCompanyInfo } from '../../store/company/companyHooks';
import AppLink from '../shared/AppLink';

import ContactForm from '../contact/ContactForm';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(import('../shared/PdfViewer'), { ssr: false });
function CatalogComponent() {
    const companyInfo = useCompanyInfo();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(`${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.catalog.url}`);
    }, [companyInfo]);

    if (process.browser) {
        return (
            <div>
                <Head>
                    <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Catálogo` : null}</title>
                </Head>
                <div className={'grid gri-cols-1 container text-center justify-center'}>
                    <h1 className={'text-5xl text-black font-bold '}> Catálogo de Productos </h1>
                    <p className={'text-center mt-6 md:px-32 px-5'}>
                        Poder para la Industria, los equipos Neo son diseñados con ingeniería de alto grado de
                        exigencia, siendo estos los de mayor calidad, expresada en su potencia y eficiencia al momento
                        de trabajar en los ambientes de altos grados de productividad, con terminados de calidad,
                        pioneros en la innovación para las soluciones Industriales.
                    </p>
                    <div className={'w-full text-center'}>
                        <div className={'md:w-192 my-10 mx-auto'}>
                            {companyInfo !== undefined && process.browser ? <PdfViewer /> : null}
                        </div>
                    </div>

                    <AppLink
                        href={`${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.catalog.url}`}
                        className={'btn btn-primary mx-auto'}
                    >
                        <a download target={'_blank'}>
                            Descargar
                        </a>
                    </AppLink>
                </div>
                <ContactForm />
            </div>
        );
    } else {
        return null;
    }
}

export default CatalogComponent;
