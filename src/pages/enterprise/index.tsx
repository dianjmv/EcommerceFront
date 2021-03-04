import { useEffect, useState } from 'react';
import { IBrand } from '../../interfaces/brand';
import BrandsRepository from '../../api/brandsRepository';
import Head from 'next/head';

const Page = () => {
    const [brands, setBrands] = useState<IBrand[]>([]);
    const brandsRepository = new BrandsRepository();
    useEffect(() => {
        brandsRepository.getAllBrands().then(({ data }) => setBrands(data));
    }, []);

    return (
        <>
            <Head>
                <title>SouthImport | Conócenos</title>
            </Head>
            <div
                className={'about-header text-center py-14'}
                style={{
                    background: "url('/images/about_us_background.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className={'text-white font-bold text-5xl'}>Conócenos</h1>
            </div>
            <div className={'grid grid-cols-1 text-center container md:px-64 px-5'}>
                <p className={'text-4xl text-blue-700 font-bold mt-4'}>
                    Somos los importadores oficiales de GBS para el Ecuador.
                </p>
                <p className={'mt-4'}>
                    Poder para la Industria, los equipos Neo son diseñados con ingeniería de alto grado de exigencia,
                    siendo estos los de mayor calidad, expresada en su potencia y eficiencia al momento de trabajar en
                    los ambientes de altos grados de productividad, con terminados de calidad, pioneros en la innovación
                    para las soluciones Industriales.
                </p>
                <div className={'text-center'}>
                    <div className={'flex justify-center'}>
                        {brands.map(brand => (
                            <img src={`${process.env.NEXT_PUBLIC_BASE_URI}${brand.thumbnail_image.url}`} alt="" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Page;
