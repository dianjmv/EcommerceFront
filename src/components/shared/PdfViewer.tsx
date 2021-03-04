import { PDFViewer } from 'react-view-pdf';
import React, { useEffect, useState } from 'react';
import { useCompanyInfo } from '../../store/company/companyHooks';

const PdfViewer = () => {
    const companyInfo = useCompanyInfo();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(`${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo.catalog.url}`);
    }, [companyInfo]);
    return <PDFViewer url={url} />;
};
export default PdfViewer;
