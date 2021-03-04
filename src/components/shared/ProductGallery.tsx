// react
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

// third-party
import classNames from 'classnames';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import Slick from 'react-slick';

// application
import AppLink from './AppLink';
import StroykaSlick, { SlickProps } from './StroykaSlick';
import ZoomIn24Svg from '../../svg/zoom-in-24.svg';
import { useDirection } from '../../store/locale/localeHooks';
import { ImageBanner } from '../../interfaces/imageBanner';
// @ts-ignore
import ReactImageZoom from 'react-image-zoom';
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION,
} from 'react-image-magnifiers';
import ReactImageMagnify from 'react-image-magnify';
const slickSettingsFeatured = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
};
const slickSettingsThumbnails = {
    standard: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 4 } },
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 5 } },
            { breakpoint: 479, settings: { slidesToShow: 4 } },
            { breakpoint: 379, settings: { slidesToShow: 3 } },
        ],
    },
    sidebar: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 5 } },
            { breakpoint: 479, settings: { slidesToShow: 4 } },
            { breakpoint: 379, settings: { slidesToShow: 3 } },
        ],
    },
    columnar: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 5 } },
            { breakpoint: 479, settings: { slidesToShow: 4 } },
            { breakpoint: 379, settings: { slidesToShow: 3 } },
        ],
    },
    quickview: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 4 } },
            { breakpoint: 767, settings: { slidesToShow: 5 } },
            { breakpoint: 479, settings: { slidesToShow: 4 } },
            { breakpoint: 379, settings: { slidesToShow: 3 } },
        ],
    },
};

type CreateGalleryFn = (
    images: PhotoSwipe.Item[],
    options: PhotoSwipe.Options
) => PhotoSwipe<PhotoSwipeUIDefault.Options>;

export type ProductGalleryLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

export interface ProductGalleryProps {
    images: ImageBanner[];
    layout: ProductGalleryLayout;
}

function ProductGallery(props: ProductGalleryProps) {
    const { layout, images } = props;
    const direction = useDirection();
    const [state, setState] = useState({ currentIndex: 0, transition: false });
    const imagesRefs = useRef<Array<HTMLImageElement | null>>([]);
    const slickFeaturedRef = useRef<Slick>(null);
    const createGalleryRef = useRef<Promise<CreateGalleryFn> | null>(null);
    const galleryRef = useRef<PhotoSwipe<PhotoSwipeUIDefault.Options> | null>(null);
    const getIndexDependOnDirRef = useRef<((index: number) => number) | null>(null);
    const unmountedRef = useRef(false);

    const getIndexDependOnDir = useCallback(
        (index: number) => {
            // we need to invert index id direction === 'rtl' due to react-slick bug
            if (direction === 'rtl') {
                return images.length - 1 - index;
            }

            return index;
        },
        [direction, images]
    );

    const openPhotoswipe = (index: number) => {
        if (!createGalleryRef.current) {
            return;
        }

        const items = imagesRefs.current.map((tag, index) => {
            if (!tag) {
                throw Error('Image ref is null');
            }

            const width = (tag.dataset.width ? parseFloat(tag.dataset.width) : null) || tag.naturalWidth;
            const height = (tag.dataset.height ? parseFloat(tag.dataset.height) : null) || tag.naturalHeight;

            return {
                src: images[index],
                msrc: images[index],
                w: width,
                h: height,
            };
        });

        if (direction === 'rtl') {
            items.reverse();
        }

        // noinspection JSUnusedGlobalSymbols
        const options: PhotoSwipe.Options = {
            getThumbBoundsFn: index => {
                // IMPORTANT: Inside this function, we can use variables and functions only through ref.
                if (!getIndexDependOnDirRef.current) {
                    return { x: 0, y: 0, w: 0 };
                }

                const dirDependentIndex = getIndexDependOnDirRef.current(index);
                const tag = imagesRefs.current[dirDependentIndex];

                if (!tag) {
                    return { x: 0, y: 0, w: 0 };
                }

                const width = tag.naturalWidth;
                const height = tag.naturalHeight;
                const rect = tag.getBoundingClientRect();
                const ration = Math.min(rect.width / width, rect.height / height);
                const fitWidth = width * ration;
                const fitHeight = height * ration;

                return {
                    x: rect.left + (rect.width - fitWidth) / 2 + window.pageXOffset,
                    y: rect.top + (rect.height - fitHeight) / 2 + window.pageYOffset,
                    w: fitWidth,
                };
            },
            index: getIndexDependOnDir(index),
            bgOpacity: 0.9,
            history: false,
        };

        createGalleryRef.current.then(createGallery => {
            // IMPORTANT: Inside this function, we can use variables and functions only through ref.

            if (unmountedRef.current) {
                return;
            }

            // @ts-ignore
            galleryRef.current = createGallery(items, options);
            galleryRef.current.listen('beforeChange', () => {
                if (galleryRef.current && slickFeaturedRef.current) {
                    slickFeaturedRef.current.slickGoTo(galleryRef.current.getCurrentIndex(), true);
                }
            });
            galleryRef.current.listen('destroy', () => {
                galleryRef.current = null;
            });

            galleryRef.current.init();
        });
    };

    const handleFeaturedClick = (event: MouseEvent, index: number) => {
        if (!createGalleryRef.current || layout === 'quickview') {
            return;
        }

        event.preventDefault();

        openPhotoswipe(index);
    };

    const handleThumbnailClick = (index: number) => {
        if (state.transition) {
            return;
        }

        setState(prev => ({ ...prev, currentIndex: index }));

        if (slickFeaturedRef.current) {
            slickFeaturedRef.current.slickGoTo(getIndexDependOnDir(index));
        }
    };

    const handleFeaturedBeforeChange: SlickProps['beforeChange'] = (oldIndex, newIndex) => {
        setState(prev => ({
            ...prev,
            currentIndex: getIndexDependOnDir(newIndex),
            transition: true,
        }));
    };

    const handleFeaturedAfterChange: SlickProps['afterChange'] = index => {
        setState(prev => ({
            ...prev,
            currentIndex: getIndexDependOnDir(index),
            transition: false,
        }));
    };

    const handleZoomButtonClick = () => {
        openPhotoswipe(state.currentIndex);
    };

    // componentDidMount
    useEffect(() => {
        createGalleryRef.current = import('../../photoswipe').then(module => module.default);
    }, []);

    // componentWillUnmount
    useEffect(
        () => () => {
            if (galleryRef.current) {
                galleryRef.current.destroy();
            }

            unmountedRef.current = true;
        },
        []
    );

    useEffect(() => {
        // this is necessary to reset the transition state,
        // because when the direction changes, the afterChange event does not fire
        const timer = setTimeout(() => {
            setState(prev => ({ ...prev, transition: false }));
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [direction]);

    useEffect(() => {
        getIndexDependOnDirRef.current = getIndexDependOnDir;
    }, [getIndexDependOnDir]);

    const featured = images.map((image, index) => (
        <div key={index} className="product-image product-image--location--gallery">
            <div className={'md:grid hidden'}>
                {/*<ReactImageZoom*/}
                {/*    img={`${process.env.NEXT_PUBLIC_BASE_URI}${image.url}`}*/}

                {/*/>*/}

                <ReactImageMagnify
                    {...{
                        className: 'bg-gray-300 z-50',
                        enlargedImageContainerClassName: 'z-50 ml-32 px-auto ',
                        enlargedImagePortalId: 'zoom-img-id',
                        enlargedImageContainerStyle: {
                            position: 'fixed',
                            left: '980px',
                            top: '170px',
                            width: '100%',
                        },
                        enlargedImageClassName: 'bg-gray-300 w-full',
                        enlargedImageStyle: {
                            width: '313px',
                            height: '594px',
                        },
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                            src: `${process.env.NEXT_PUBLIC_BASE_URI}${image.url}`,
                        },
                        largeImage: {
                            src: `${process.env.NEXT_PUBLIC_BASE_URI}${image.url}`,
                            width: 1800,
                            height: 1800,
                        },
                    }}
                />
            </div>
            <div className={'md:hidden '}>
                <AppLink
                    href={`${process.env.NEXT_PUBLIC_BASE_URI}${image.url}`}
                    className="product-image__body"
                    target="_blank"
                    onClick={(event: MouseEvent) => handleFeaturedClick(event, index)}
                >
                    {/*
                    The data-width and data-height attributes must contain the size of a larger
                    version of the product image.

                    If you do not know the image size, you can remove the data-width and data-height
                    attribute, in which case the width and height will be obtained from the
                    naturalWidth and naturalHeight property of img.product-image__img.
                    */}
                    <img
                        className="product-image__img"
                        src={`${process.env.NEXT_PUBLIC_BASE_URI}${image.url}`}
                        alt=""
                        ref={element => {
                            imagesRefs.current[index] = element;
                        }}
                        data-width="700"
                        data-height="700"
                    />
                </AppLink>
            </div>
        </div>
    ));

    const thumbnails = images.map((image, index) => {
        const classes = classNames('product-gallery__carousel-item product-image', {
            'product-gallery__carousel-item--active': index === state.currentIndex,
        });

        return (
            <button type="button" key={index} onClick={() => handleThumbnailClick(index)} className={classes}>
                <div className="product-image__body">
                    <img
                        className="product-image__img product-gallery__carousel-image"
                        src={`${process.env.NEXT_PUBLIC_BASE_URI}${image.url}`}
                        alt=""
                    />
                </div>
            </button>
        );
    });

    return (
        <div className="product__gallery">
            <div className="product-gallery">
                <div className="product-gallery__featured">
                    <StroykaSlick
                        ref={slickFeaturedRef}
                        {...slickSettingsFeatured}
                        beforeChange={handleFeaturedBeforeChange}
                        afterChange={handleFeaturedAfterChange}
                    >
                        {featured}
                    </StroykaSlick>
                </div>
                <div className="product-gallery__carousel">
                    <StroykaSlick {...slickSettingsThumbnails[layout]}>{thumbnails}</StroykaSlick>
                </div>
            </div>
        </div>
    );
}

export default ProductGallery;
