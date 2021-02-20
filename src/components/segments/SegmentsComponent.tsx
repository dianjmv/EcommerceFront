import React, {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import {useCompanyInfo} from "../../store/company/companyHooks";
import ContactForm from "../contact/ContactForm";
import {ISegment} from "../../interfaces/segment";
import SegmentRepository from "../../api/segmentRepository";
import AppLink from "../shared/AppLink";
import {IBrand} from "../../interfaces/brand";

export interface ILevelBrand{
    segmentId : number;
    levels :number[];
    product_brand : IBrand;
}


function Segments() {
    const companyInfo = useCompanyInfo();
    const [segments, setSegments] = useState<ISegment[]>([]);
    const [level , setLevel] = useState <ILevelBrand[]>([]);
    const segmentsRepository = new SegmentRepository();
    useEffect(() => {
        segmentsRepository.getAllSegments().then(({data}) => {
            return setSegments(data);
        })
    }, [])
    let levelsTemp:ILevelBrand[] = []
    for (let segment of segments){
        for (let level of segment.level){
            const brands = levelsTemp.filter(levels => level.product_brand.id === levels.product_brand.id && levels.segmentId === segment.id)
            if (brands.length <1 ){
                const tempLavel= {levels:[level.level], product_brand:level.product_brand, segmentId: segment.id }
                levelsTemp.push(tempLavel)
            }else{
                levelsTemp.map(leve => {
                    if (leve.segmentId === segment.id && leve.product_brand.id === level.product_brand.id){
                        return leve.levels.push(level.level)
                    }
                })

            }
        }
    }
    console.log(levelsTemp)


    return (
        <Fragment>
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name} | Segmentos` : null}</title>
            </Head>
            <div className={'grid grid-cols-1 container mt-16'}>
                <div className={'grid grid-cols-3 text-center'}>
                    <span className={'border-gray-200 border-2'}>Segmento</span>
                    <span className={'border-gray-200 border-2'}>Marcas y niveles de uso</span>
                    <span className={'border-gray-200 border-2'}>Aplicaciones</span>
                </div>
                {segments.map((segment,index) => (
                    <div className={`grid grid-cols-3 bg-gray-200 ${index>=1? 'my-1': ''}`}>
                        <div className={'text-white flex flex-wrap text-center content-center '} style={{
                            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URI}${segment.thumbnail.url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}>
                            <div className={'grid grid-cols-1 mx-auto'}>
                                <h4 className={'text-2xl'}>Segmento </h4>
                                <p className={'font-bold text-3xl'}>{segment.name}</p>
                                <AppLink href={`/shop/segments/${segment.slug} `} className={'mt-2 btn btn-white'}>
                                    Ver Productos
                                </AppLink>
                            </div>
                        </div>
                        <div className={'text-center'}>
                            {
                                levelsTemp.map(level => (
                                    level.segmentId === segment.id ? <div className={'grid grid-cols-1 text-center'}>
                                        <img className={'mx-auto my-2'}
                                             src={`${process.env.NEXT_PUBLIC_BASE_URI}${level.product_brand.thumbnail_image.url}`}
                                             alt=""/>
                                        <span>Niveles de uso</span>
                                        <div className={'text-black flex text-center mx-auto my-2'}>
                                            {
                                                level.levels.map(levelsInteger =>(
                                                    <span className={'bg-white w-14 mx-1'}>{levelsInteger}</span>
                                                ))
                                            }
                                        </div>
                                    </div>: null
                                ))


                            }


                        </div>
                        <div className={'flex flex-wrap text-center content-center'}>
                            <p className={'mx-auto px-16 py-10'}>
                                {segment.description}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
            <ContactForm/>
        </Fragment>
    )
}

export default Segments;
