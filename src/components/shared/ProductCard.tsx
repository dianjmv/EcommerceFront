// react
import {Fragment, memo, useState} from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from './AppLink';
import AsyncAction from './AsyncAction';
import Compare16Svg from '../../svg/compare-16.svg';
import CurrencyFormat from './CurrencyFormat';
import Quickview16Svg from '../../svg/quickview-16.svg';
import Rating from './Rating';
import url from '../../services/url';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
import {IProduct} from '../../interfaces/product';
import {useCompareAddItem} from '../../store/compare/compareHooks';
import {useQuickviewOpen} from '../../store/quickview/quickviewHooks';
import {useWishlistAddItem} from '../../store/wishlist/wishlistHooks';
import {useCartAddItem} from '../../store/cart/cartHooks';
import BaseRepository from "../../api/repository/baseRepository";

export type ProductCardLayout = 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal';

export interface ProductCardProps {
    product: IProduct;
    layout?: ProductCardLayout;
}

function ProductCard(props: ProductCardProps) {
    const baseUrl = new BaseRepository();
    const {product, layout} = props;
    const containerClasses = classNames('product-card', {
        'product-card--layout--grid product-card--size--sm': layout === 'grid-sm',
        'product-card--layout--grid product-card--size--nl': layout === 'grid-nl',
        'product-card--layout--grid product-card--size--lg': layout === 'grid-lg',
        'product-card--layout--list': layout === 'list',
        'product-card--layout--horizontal': layout === 'horizontal',
    });
    const cartAddItem = useCartAddItem();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    const quickviewOpen = useQuickviewOpen();
    const [showDetail, setShowDetail] = useState(false)

    const badges = [];
    let image;
    let price;
    let features;

    // if (product.is_sale) {
    //     badges.push(<div key="sale" className="product-card__badge product-card__badge--sale">Venta</div>);
    // }
    if (product.is_hot) {
        badges.push(<div key="hot" className="product-card__badge product-card__badge--hot">Promoción</div>);
    }
    // if (product.badges.includes('new')) {
    //     badges.push(<div key="new" className="product-card__badge product-card__badge--new">New</div>);
    // }

    if (product.images && product.images.length > 0) {
        image = (
            <div className="product-card__image product-image" onMouseEnter={() => setShowDetail(true)}
                 onMouseLeave={() => setShowDetail(false)}>

                {
                    showDetail ?
                        <AppLink href={`/shop/products/${product.slug}`} className="product-image__body bg-blue-600 text-white">
                            <div className={'product-image__img text-sm text-center grid grid-cols-1'}>
                                <span className={'text-xl font-bold'}>{product.title}</span>
                                <span>Modelo: {product.model}</span>
                                <div>
                                    <span>Datos Técnicos:</span>
                                    <ul>
                                        {
                                            product.caracteristicas.map((especification) => (
                                                <li key={especification.id}>
                                                    <span className={'font-bold'}>{especification.title}</span>

                                                    <br/>
                                                    <span>{especification.descripcion}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </AppLink>
                        :
                        <AppLink href={`/shop/products/${product.slug}`} className="product-image__body">
                            <img className="product-image__img" src={`${baseUrl.getBaseUrl()}${product.images[0].url}`}
                                 alt=""/>
                        </AppLink>
                }
            </div>
        );
    }


price = (
    <div className="product-card__prices">
        <CurrencyFormat value={product.sale_price}/>
    </div>
);


if (product.caracteristicas)
    {
        features = (
            <ul className="product-card__features-list">
                {product.caracteristicas.filter((x) => x.id).map((attribute, index) => (
                    <li key={index}>{`${attribute.descripcion}`}</li>
                ))}
            </ul>
        );
    }

return (
    <div className={containerClasses} onMouseLeave={() => setShowDetail(false)}>

        {badges.length > 0 && showDetail === false? (
            <div className="product-card__badges-list">{badges}</div>
        ):null}
        {image}
        <div className="product-card__info">
            <div className="product-card__name">
                <AppLink href={`/shop/products/${product.slug}`}>{product.title}</AppLink>
            </div>
            {features}
        </div>
        <div className="product-card__actions">
            <div className="product-card__availability">

            </div>
            <div className={'mt-1 text-sm'}>

                {
                    !product.is_out_of_stock?<span className="text-success"> En Stock</span>:<span className="text-red-500"> No Disponible</span>
                }

            </div>

            {price}
            <div className="product-card__buttons">
                <AsyncAction
                    action={() => cartAddItem(product)}
                    render={({run, loading}) => (
                        <Fragment>
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-primary product-card__addtocart', {
                                    'btn-loading': loading,
                                })}
                            >
                                Agregar al Carrito
                            </button>
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-secondary product-card__addtocart product-card__addtocart--list', {
                                    'btn-loading': loading,
                                })}
                            >
                                Agregar al Carrito
                            </button>
                        </Fragment>
                    )}
                />
            </div>
        </div>
    </div>
);
}

export default memo(ProductCard);
