// react
import {Fragment, useState} from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from './AppLink';
import AsyncAction from './AsyncAction';
import Compare16Svg from '../../svg/compare-16.svg';
import CurrencyFormat from './CurrencyFormat';
import InputNumber from './InputNumber';
import ProductGallery from './ProductGallery';
import Rating from './Rating';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
import {IProduct} from '../../interfaces/product';
import {useCompareAddItem} from '../../store/compare/compareHooks';
import {useWishlistAddItem} from '../../store/wishlist/wishlistHooks';
import {useCartAddItem} from '../../store/cart/cartHooks';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

export interface ProductProps {
    product: IProduct;
    layout: ProductLayout;
}

function Product(props: ProductProps) {
    const {product, layout} = props;
    const [quantity, setQuantity] = useState<number | string>(1);
    const cartAddItem = useCartAddItem();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();

    const addToCart = () => {
        if (typeof quantity === 'string') {
            return Promise.resolve();
        }

        return cartAddItem(product, [], quantity);
    };

    let prices;


    return (
        <div className={`product product--layout--${layout}`}>
            <div className="product__content">
                <ProductGallery layout={layout} images={product.images}/>

                <div className="product__info">
                    <div className="product__wishlist-compare">
                        <AsyncAction
                            action={() => wishlistAddItem(product)}
                            render={({run, loading}) => (
                                <button
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Wishlist"
                                    onClick={run}
                                    className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Wishlist16Svg/>
                                </button>
                            )}
                        />
                        <AsyncAction
                            action={() => compareAddItem(product)}
                            render={({run, loading}) => (
                                <button
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Compare"
                                    onClick={run}
                                    className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Compare16Svg/>
                                </button>
                            )}
                        />
                    </div>
                    <h1 className="product__name text-black font-bold">{product.title}</h1>
                    <h4 className={'text-black font-bold text-lg'}>Modelo: {product.model}</h4>
                    <div className={'mt-2'}>
                        <span className={'font-bold text-lg '}>{`$${product.price}`}</span>
                    </div>
                    <div className="product__description mb-3">

                        <h5 className={'text-lg font-bold mb-3 mt-2 border-b-4 border-blue-600'}>Datos Técnicos</h5>

                        <ul>
                            {product.caracteristicas.map((item, ) => {
                                return (
                                    <li className={'grid grid-cols-2 border-b-2 border-blue-500'} key={`${product.id}-${product.code}`}>
                                        <span>{item.title}</span>
                                        <span>{item.descripcion}</span>
                                    </li>)
                            })}
                        </ul>

                    </div>
                    <div className={'mt-2'}>
                        <p className={'font-bold text-black'}>SKU:{product.code}</p>
                        <div className={'flex font-bold'}><span className={'text-black'}>Categorias: </span>
                            <ul>
                                {
                                    product.product_categories.map((categories) => {
                                        return (<li className={'mx-2'} key={categories.id}>
                                            <AppLink
                                                href={`/shop/categories/${categories.slug}`}>{categories.name}</AppLink>,
                                        </li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <ul className="product__features">
                        <li>Speed: 750 RPM</li>
                        <li>Power Source: Cordless-Electric</li>
                        <li>Battery Cell Type: Lithium</li>
                        <li>Voltage: 20 Volts</li>
                        <li>Battery Capacity: 2 Ah</li>
                    </ul>
                    <div className="product__share-links share-links flex">
                        <p className={'text-black font-bold mr-2'}>Compartir: </p>
                        <ul className="share-links__list">
                            <li className="share-links__item share-links__item--type--like">
                                <AppLink href="/">Like</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--tweet">
                                <AppLink href="/">Tweet</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--pin">
                                <AppLink href="/">Pin It</AppLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="product__sidebar">
                    <form className="product__options mt-4">
                        <div className="form-group product__option">
                            <div className="product__actions">
                                <div className="product__actions-item">
                                    <InputNumber
                                        id="product-quantity"
                                        aria-label="Quantity"
                                        className="product__quantity"
                                        size="lg"
                                        min={1}
                                        value={quantity}
                                        onChange={setQuantity}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--addtocart">
                                    <AsyncAction
                                        action={() => addToCart()}
                                        render={({run, loading}) => (
                                            <button
                                                type="button"
                                                onClick={run}
                                                disabled={!quantity}
                                                className={classNames('btn btn-primary btn-lg', {
                                                    'btn-loading': loading,
                                                })}
                                            >
                                                Agregar al carrito
                                            </button>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="product__footer">


                </div>
            </div>
        </div>
    );
}

export default Product;
