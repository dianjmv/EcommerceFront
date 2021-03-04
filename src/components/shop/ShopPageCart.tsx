// react
import { Fragment, useState } from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import AsyncAction from '../shared/AsyncAction';
import Cross12Svg from '../../svg/cross-12.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import { CartItem } from '../../store/cart/cartTypes';

// data stubs
import theme from '../../data/theme';
import { useCart, useCartRemoveItem, useCartUpdateQuantities } from '../../store/cart/cartHooks';
import { useCompanyInfo } from '../../store/company/companyHooks';
import ContactForm from '../contact/ContactForm';
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis';

export interface Quantity {
    itemId: number;
    value: string | number;
}

function ShopPageCart() {
    const [quantities, setQuantities] = useState<Quantity[]>([]);
    const cart = useCart();
    const cartRemoveItem = useCartRemoveItem();
    const cartUpdateQuantities = useCartUpdateQuantities();
    const companyInfo = useCompanyInfo();

    const updateQuantities = () =>
        cartUpdateQuantities(
            quantities.map(x => ({
                ...x,
                value: typeof x.value === 'string' ? parseFloat(x.value) : x.value,
            }))
        );

    const cartNeedUpdate = () =>
        quantities.filter(x => {
            const item = cart.items.find(item => item.id === x.itemId);

            return item && item.quantity !== x.value && x.value !== '';
        }).length > 0;

    const getItemQuantity = (item: CartItem) => {
        const quantity = quantities.find(x => x.itemId === item.id);

        return quantity ? quantity.value : item.quantity;
    };

    const handleChangeQuantity = (item: CartItem, quantity: string | number) => {
        setQuantities(prevState => {
            const index = prevState.findIndex(x => x.itemId === item.id);

            if (index === -1) {
                return [
                    ...prevState,
                    {
                        itemId: item.id,
                        value: quantity,
                    },
                ];
            }

            return [
                ...prevState.slice(0, index),
                {
                    ...prevState[index],
                    value: quantity,
                },
                ...prevState.slice(index + 1),
            ];
        });
    };

    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Shopping Cart', url: '' },
    ];

    let content;

    if (cart.quantity) {
        const cartItems = cart.items.map(item => {
            let image;
            let options;

            if (item.product.images.length > 0) {
                image = (
                    <div className="product-image">
                        <AppLink href={url.product(item.product)} className="product-image__body">
                            <img
                                className="product-image__img"
                                src={`${process.env.NEXT_PUBLIC_BASE_URI}${item.product.images[0].url}`}
                                alt=""
                            />
                        </AppLink>
                    </div>
                );
            }

            if (item.options.length > 0) {
                options = (
                    <ul className="cart-table__options">
                        {item.options.map((option, index) => (
                            <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                        ))}
                    </ul>
                );
            }

            const removeButton = (
                <AsyncAction
                    action={() => cartRemoveItem(item.id)}
                    render={({ run, loading }) => {
                        const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                            'btn-loading': loading,
                        });

                        return (
                            <button type="button" onClick={run} className={classes}>
                                <Cross12Svg />
                            </button>
                        );
                    }}
                />
            );

            return (
                <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--remove">{removeButton}</td>
                    <td className="cart-table__column cart-table__column--image">{image}</td>
                    <td className="cart-table__column cart-table__column--product">
                        <AppLink href={url.product(item.product)} className="cart-table__product-name">
                            <LinesEllipsis
                                text={item.product.descripcion}
                                maxLine="2"
                                ellipsis="..."
                                trimRight
                                basedOn="letters"
                            />
                        </AppLink>
                        {options}
                    </td>
                    <td className="cart-table__column cart-table__column--price" data-title="Precio">
                        <CurrencyFormat value={item.price} />
                    </td>
                    <td className="cart-table__column cart-table__column--quantity" data-title="Cantidad">
                        <InputNumber
                            onChange={quantity => handleChangeQuantity(item, quantity)}
                            value={getItemQuantity(item)}
                            min={1}
                        />
                    </td>
                    <td className="cart-table__column cart-table__column--total" data-title="Total">
                        <CurrencyFormat value={item.total} />
                    </td>
                </tr>
            );
        });

        const cartTotals = cart.totals.length > 0 && (
            <Fragment>
                <thead className="cart__totals-header">
                    <tr>
                        <th>Subtotal</th>
                        <td>
                            <CurrencyFormat value={cart.subtotal} />
                        </td>
                    </tr>
                </thead>
                <tbody className="cart__totals-body">
                    {cart.totals.map((extraLine, index) => {
                        let calcShippingLink;

                        if (extraLine.type === 'shipping') {
                            calcShippingLink = (
                                <div className="cart__calc-shipping">
                                    <AppLink href="/">Calculate Shipping</AppLink>
                                </div>
                            );
                        }

                        return (
                            <tr key={index}>
                                <th>{extraLine.title}</th>
                                <td>
                                    <CurrencyFormat value={extraLine.price} />
                                    {calcShippingLink}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Fragment>
        );

        const updateCartButton = (
            <AsyncAction
                action={() => updateQuantities()}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-primary cart__update-button', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes} disabled={!cartNeedUpdate()}>
                            Actualizar el Carrito
                        </button>
                    );
                }}
            />
        );

        content = (
            <div className="cart block">
                <div className="container">
                    <table className="cart__table cart-table">
                        <thead className="cart-table__head bg-black text-white text-center">
                            <tr className="cart-table__row">
                                <th className="cart-table__column cart-table__column--remove" aria-label="Remove" />
                                <th className="cart-table__column cart-table__column--image">Producto</th>
                                <th className="cart-table__column cart-table__column--product">Descripción</th>
                                <th className="cart-table__column cart-table__column--price">Precio</th>
                                <th className="cart-table__column cart-table__column--quantity">Cantidad</th>
                                <th className="cart-table__column cart-table__column--total">Total</th>
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">{cartItems}</tbody>
                    </table>
                    <div className="cart__actions">
                        <form className="cart__coupon-form">
                            <label htmlFor="input-coupon-code" className="sr-only">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="input-coupon-code"
                                placeholder="Código del Cupón"
                            />
                            <button type="submit" className="btn btn-primary">
                                Aplicar Cupón
                            </button>
                        </form>
                        <div className="cart__buttons">
                            <AppLink href="/" className="btn btn-light">
                                Continua Comprando
                            </AppLink>
                            {updateCartButton}
                        </div>
                    </div>

                    <div className="row justify-content-end pt-md-5 pt-4">
                        <div className="col-12 col-md-7 col-lg-6 col-xl-5">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Total</h3>
                                    <table className="cart__totals">
                                        {cartTotals}
                                        <tfoot className="cart__totals-footer">
                                            <tr>
                                                <th>Total</th>
                                                <td>
                                                    <CurrencyFormat value={cart.total} />
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <AppLink
                                        href={url.checkout()}
                                        className="btn btn-primary btn-xl btn-block cart__checkout-button"
                                    >
                                        Proceder con el Pago
                                    </AppLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Tu carrito está vacío</div>
                        <div className="block-empty__actions">
                            <AppLink href="/" className="btn btn-primary btn-sm">
                                Continuar
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{companyInfo !== undefined ? `${companyInfo.company_name}` : null} Carrito</title>
            </Head>

            {content}
            <ContactForm />
        </Fragment>
    );
}

export default ShopPageCart;
