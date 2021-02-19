import React, {useEffect, useState} from "react";
import SitePageAboutUs from "../../components/site/SitePageAboutUs";
import {useCompanyAddInfo} from "../../store/company/companyHooks";
import CompanyRepository from "../../api/companyInfo";
import {ICompanyInfo} from "../../interfaces/company-info";

function Page(){
    const addCompanyInfo = useCompanyAddInfo()
    const companyRepository = new CompanyRepository();
    const [company, setCompany] = useState<ICompanyInfo>();
    useEffect(() => {
        companyRepository.getCompanyInfo().then(({data}) => {
            setCompany(data[0])
            addCompanyInfo(data[0])
        })
    }, [])
    if (company){
        return(
            <SitePageAboutUs content={company.terms_and_conditions} banner={company.terms_and_conditions_banner.url} tittle={'Términos y Condiciones'} />
        )
    }else{
        return null
    }
}
export default Page
