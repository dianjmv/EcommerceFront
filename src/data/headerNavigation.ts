import { INav } from '../interfaces/menus/nav';
import {getCompanyBrands} from "../api/brand";

const dataHeaderNavigation: INav = [
    {
        title: 'Inicio',
        url: '/',
    },
    {
        title: 'Empresa',
        url: '',
    },
    {
        title: 'Marcas',
        url: '/shop/category-grid-3-columns-sidebar',
        submenu: {
            type: 'menu',
            menu: [
                {
                    title: 'Shop Grid',
                    url: '/shop/category-grid-3-columns-sidebar',
                    children: [
                        { title: '3 Columns Sidebar', url: '/shop/category-grid-3-columns-sidebar' },
                        { title: '4 Columns Full', url: '/shop/category-grid-4-columns-full' },
                        { title: '5 Columns Full', url: '/shop/category-grid-5-columns-full' },
                    ],
                },
                { title: 'Shop List', url: '/shop/category-list' },
                { title: 'Shop Right Sidebar', url: '/shop/category-right-sidebar' },
                {
                    title: 'Product',
                    url: '/shop/product-standard',
                    children: [
                        { title: 'Product', url: '/shop/product-standard' },
                        { title: 'Product Alt', url: '/shop/product-columnar' },
                        { title: 'Product Sidebar', url: '/shop/product-sidebar' },
                    ],
                },
                { title: 'Cart', url: '/shop/cart' },
                { title: 'Checkout', url: '/shop/checkout' },
                { title: 'Order Success', url: '/shop/checkout/success' },
                { title: 'Wishlist', url: '/shop/wishlist' },
                { title: 'Compare', url: '/shop/compare' },
                { title: 'Track Order', url: '/shop/track-order' },
            ],
        },
    },
    {
        title: 'Productos',
        url: '/account/login',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'Login', url: '/account/login' },
                { title: 'Dashboard', url: '/account/dashboard' },
                { title: 'Edit Profile', url: '/account/profile' },
                { title: 'Order History', url: '/account/orders' },
                {
                    title: 'Order Details',
                    url: { href: '/account/orders/[orderId]', as: '/account/orders/5', prefetch: false },
                },
                { title: 'Address Book', url: '/account/addresses' },
                {
                    title: 'Edit Address',
                    url: { href: '/account/addresses/[addressId]', as: '/account/addresses/5', prefetch: false },
                },
                { title: 'Change Password', url: '/account/password' },
            ],
        },
    },
    {
        title: 'Segmentos',
        url: '/blog/category-classic',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'Blog Classic', url: '/blog/category-classic' },
                { title: 'Blog Grid', url: '/blog/category-grid' },
                { title: 'Blog List', url: '/blog/category-list' },
                { title: 'Blog Left Sidebar', url: '/blog/category-left-sidebar' },
                { title: 'Post Page', url: '/blog/post-classic' },
                { title: 'Post Without Sidebar', url: '/blog/post-full' },
            ],
        },
    },
    {
        title: 'Catalogo',
        url: '/site/about-us',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'About Us', url: '/site/about-us' },
                { title: 'Contact Us', url: '/site/contact-us' },
                { title: 'Contact Us Alt', url: '/site/contact-us-alt' },
                { title: '404', url: '/site/not-found' },
                { title: 'Terms And Conditions', url: '/site/terms' },
                { title: 'FAQ', url: '/site/faq' },
                { title: 'Components', url: '/site/components' },
                { title: 'Typography', url: '/site/typography' },
            ],
        },
    },
    {
        title: 'Blog',
        url: '/site/about-us',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'About Us', url: '/site/about-us' },
                { title: 'Contact Us', url: '/site/contact-us' },
                { title: 'Contact Us Alt', url: '/site/contact-us-alt' },
                { title: '404', url: '/site/not-found' },
                { title: 'Terms And Conditions', url: '/site/terms' },
                { title: 'FAQ', url: '/site/faq' },
                { title: 'Components', url: '/site/components' },
                { title: 'Typography', url: '/site/typography' },
            ],
        },
    },
    {
        title: 'Contacto',
        url: '/site/about-us',

    },

];
const categories = []
const brands = ()=>{
    getCompanyBrands().then(brand=>{

    }).catch(err=>{
        console.error(err)
    })
}

export default dataHeaderNavigation;
