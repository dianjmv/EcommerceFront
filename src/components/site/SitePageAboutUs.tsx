// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import StroykaSlick from '../shared/StroykaSlick';
import url from '../../services/url';

// data stubs
import theme from '../../data/theme';
import {useCompanyAddInfo, useCompanyInfo} from "../../store/company/companyHooks";
// @ts-ignore
import MDReactComponent from 'markdown-react-js';
import CompanyRepository from "../../api/companyInfo";
import {useEffect, useState} from "react";
import {ICompanyInfo} from "../../interfaces/company-info";
import {
    ShopPageCategoryColumns,
    ShopPageCategorySidebarPosition,
    ShopPageCategoryViewMode
} from "../shop/ShopPageCategory";

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 379,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
interface SitePageAboutUsProps {
    banner: string;
    content: string;
    tittle:string
}

function SitePageAboutUs(props:SitePageAboutUsProps) {
    const {banner, content, tittle} = props
    const companyInfo = useCompanyInfo();

    return (
        <div className="block about-us">
            <Head>
                <title>{`${companyInfo.company_name} | ${tittle}`}</title>
            </Head>

            <div className="about-us__image"
                 style={{backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URI}${companyInfo ? banner : ''}")`}}/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <h1 className="about-us__title text-5xl font-bold">{tittle}</h1>
                            <div className="about-us__text typography">
                                <MDReactComponent text={content}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
