import React, {useEffect, useState} from "react";
import SitePageAboutUs from "../../components/site/SitePageAboutUs";
import {useCompanyAddInfo} from "../../store/company/companyHooks";
import CompanyRepository from "../../api/companyInfo";
import {ICompanyInfo} from "../../interfaces/company-info";

function AboutUs(){
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
            <SitePageAboutUs content={company.about_us} banner={company.about_us_banner.url} tittle={'Sobre Nosotros'} />
        )
    }else{
        return null
    }


}
export default AboutUs
