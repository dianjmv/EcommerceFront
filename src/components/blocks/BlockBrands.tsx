// application
import AppLink from '../shared/AppLink';
import StroykaSlick from '../shared/StroykaSlick';

// data stubs

const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            },
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

export default function BlockBrands() {
    return (
        <div className="block block-brands">
            <div className="container">
                <div className="block-brands__slider">
                    <StroykaSlick {...slickSettings}></StroykaSlick>
                </div>
            </div>
        </div>
    );
}
