import React from "react";
import {useCompanyInfo} from "../../store/company/companyHooks";
import BaseRepository from "../../api/repository/baseRepository";
import AppLink from "../shared/AppLink";
import Link from "next/link";
// @ts-ignore
import ResponsiveEmbed from "react-responsive-embed";
import Iframe from 'react-iframe'

const SocialNetworks = () => {
    const companyInfo = useCompanyInfo();
    const baseUrl = new BaseRepository();
    const year = new Date()
    const faceBookUrl = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FdanRivC%2F&tabs=timeline&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
    return (
        <div className={'container mt-10'}>
            <div className={'mt-3 row'}>
                <div className={'col-lg-8'}>
                    <div className="block-header d-block">
                        <h3 className={'block-header__title font-bold'}>Síguenos en:</h3>
                        <div className="block-header__divider m-0 mt-2"/>
                    </div>

                    <div className={'social-network h-full'}>
                        <Iframe
                            url={faceBookUrl}
                            width={'350px'}
                            height={'500px'}
                        />
                        <Iframe url={'https://youtube.com/embed/videoseries?list=PLvAQRm0AjsSrKWm3ef91CY93yMpMCfcOP'}
                                width={'350px'}
                                height={'500px'}
                        />

                        {/*{*/}
                        {/*    companyInfo.social_networks.map((social) => {*/}
                        {/*        return (*/}
                        {/*            <AppLink key={social.image.id} href={social.link} target='_blank'>*/}
                        {/*                <img className={'social-network__image'}  src={`${baseUrl.getBaseUrl()}${social.image.url}`} alt={`${social.name}`}/>*/}
                        {/*            </AppLink>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </div>
                </div>
                <div className={'col-lg-4'}>
                    <div className="block-header d-block">
                        <h3 className={'block-header__title font-bold'}>Catálogo {year.getFullYear()}</h3>
                        <div className="block-header__divider m-0 mt-2"/>
                    </div>
                    <div className={'text-center'}>
                        <p>Descarga nuestro catálogo de productos 2020, en Southimport todos nuestros productos tienen 1
                            año de garantía REAL</p>
                        {
                            companyInfo.catalog_cover ?
                                <img src={`${baseUrl.getBaseUrl()}${companyInfo.catalog_cover.url}`} alt=""
                                     className={'mt-4 mx-auto'}/>
                                : null
                        }

                        {
                            companyInfo.catalog ?
                                <Link href={`${baseUrl.getBaseUrl()}${companyInfo.catalog.url}`}>
                                    <a target='_blank' className={`btn btn-lg btn-black md:mt-28`}
                                       download>Descargar</a>
                                </Link> : null
                        }
                    </div>
                </div>

            </div>
        </div>

    )
}
export default SocialNetworks;
