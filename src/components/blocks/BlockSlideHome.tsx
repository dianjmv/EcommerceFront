// react
import { useEffect, useRef, useState } from 'react';

// third-party
import classNames from 'classnames';
// @ts-ignore
import MDReactComponent from 'markdown-react-js';

// application
import AppLink from '../shared/AppLink';
import departmentsService from '../../services/departmentsService';
import StroykaSlick from '../shared/StroykaSlick';
import { useDirection } from '../../store/locale/localeHooks';
import { useMedia } from '../../services/hooks';
import { getCompanyBanners } from '../../api/companyInfo';
import { IBanners } from '../../interfaces/banners';
import { useCompanyInfo } from '../../store/company/companyHooks';

export interface BlockSlideShowProps {
    withDepartments?: boolean;
    banners: IBanners[];
}

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const _slides = [
    {
        title: 'Big choice of<br>Plumbing products',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
        image_classic: {
            ltr: '/images/slides/slide-1-ltr.jpg',
            rtl: '/images/slides/slide-1-rtl.jpg',
        },
        image_full: {
            ltr: '/images/slides/slide-1-full-ltr.jpg',
            rtl: '/images/slides/slide-1-full-rtl.jpg',
        },
        image_mobile: {
            ltr: '/images/slides/slide-1-mobile.jpg',
            rtl: '/images/slides/slide-1-mobile.jpg',
        },
    },
    {
        title: 'Screwdrivers<br>Professional Tools',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
        image_classic: {
            ltr: '/images/slides/slide-2-ltr.jpg',
            rtl: '/images/slides/slide-2-rtl.jpg',
        },
        image_full: {
            ltr: '/images/slides/slide-2-full-ltr.jpg',
            rtl: '/images/slides/slide-2-full-rtl.jpg',
        },
        image_mobile: {
            ltr: '/images/slides/slide-2-mobile.jpg',
            rtl: '/images/slides/slide-2-mobile.jpg',
        },
    },
    {
        title: 'One more<br>Unique header',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
        image_classic: {
            ltr: '/images/slides/slide-3-ltr.jpg',
            rtl: '/images/slides/slide-3-rtl.jpg',
        },
        image_full: {
            ltr: '/images/slides/slide-3-full-ltr.jpg',
            rtl: '/images/slides/slide-3-full-rtl.jpg',
        },
        image_mobile: {
            ltr: '/images/slides/slide-3-mobile.jpg',
            rtl: '/images/slides/slide-3-mobile.jpg',
        },
    },
];

function BlockSlideHome(props: BlockSlideShowProps) {
    const { withDepartments = false, banners = [] } = props;
    const direction = useDirection();
    const departmentsAreaRef = useRef<HTMLDivElement | null>(null);
    const isDesktop = useMedia('(min-width: 992px)');
    const companyInfo = useCompanyInfo();
    const [slides, setSlides] = useState<IBanners[] | []>([]);

    useEffect(
        () => () => {
            departmentsService.area = null;
        },
        []
    );

    useEffect(() => {
        departmentsService.area = departmentsAreaRef.current;
    }, [isDesktop, departmentsAreaRef]);

    useEffect(() => {
        setSlides(companyInfo.banners);
    }, []);

    const setDepartmentsAreaRef = (ref: HTMLDivElement | null) => {
        departmentsAreaRef.current = ref;

        if (isDesktop) {
            departmentsService.area = departmentsAreaRef.current;
        }
    };

    const blockClasses = classNames('block-slideshow block', {
        'block-slideshow--layout--full': !withDepartments,
        'block-slideshow--layout--with-departments': withDepartments,
    });

    // @ts-ignore
    const slidesList = companyInfo.banners.map(slide => {
        return (
            <div key={slide.id} className="block-slideshow__slide">
                <div
                    className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
                    style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URI}${slide.image_full.url})`,
                    }}
                />
                <div
                    className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
                    style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URI}${slide.image_mobile.url})`,
                    }}
                />
                <div className={`block-slideshow__slide-content w-full`}>
                    {slide.banner_description ? (
                        <div
                            className={`block-slideshow__slide-text w-90 text-${
                                slide.banner_description.text_color === 'white'
                                    ? 'white'
                                    : slide.banner_description.text_color + '-500'
                            } position-${slide.banner_description.orientation}`}
                        >
                            <MDReactComponent text={slide.banner_description.description} />
                        </div>
                    ) : null}

                    <div
                        className={`block-slideshow__slide-button md:mt-0 mt-48 w-90 position-${slide.link_purchase.orientation}`}
                    >
                        <AppLink
                            href={slide.link_purchase.link}
                            className={`btn btn-lg btn-${slide.link_purchase.button_color}`}
                        >
                            {slide.link_purchase.text_link}
                        </AppLink>
                    </div>
                </div>
            </div>
        );
    });
    if (companyInfo.banners.length > 0) {
        return (
            <div className="block-slideshow block block-slideshow--layout--full">
                <div className={'w-full'}>
                    <div className="block-slideshow__body">
                        <StroykaSlick {...slickSettings}>{slidesList}</StroykaSlick>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default BlockSlideHome;
