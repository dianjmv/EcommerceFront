import {INav} from '../interfaces/menus/nav';
import BrandsRepository from "../api/brandsRepository";
import {IMegamenu} from "../interfaces/menus/megamenu";
import ProductsRepository from "../api/productsRepository";
import CategoryRepository from "../api/categoryRepository";
import SegmentRepository from "../api/segmentRepository";

const brandsRepository = new BrandsRepository()
const brands = () => {
    brandsRepository.getCompanyBrands().then(({data}) => {
        return data.map(brand => ({
            title: brand.name,
            url: `/shop/brands/${brand.slug}`
        }))

    }).catch(err => {
        console.error(err)
    })
}


class HeaderNavigationData {
    private brandsRepository = new BrandsRepository()
    private productsRepository = new ProductsRepository()
    private categoriesRepository = new CategoryRepository()
    private segmentsRepository = new SegmentRepository()
    private dataHeaderNavigation: INav = [
        {
            title: 'Inicio',
            url: '/',
        },
        {
            title: 'Empresa',
            submenu: {
                type: 'menu',
                menu: [
                    {title: 'Acerca de nosotros', url:'/enterprise/about-us'},
                    {title: 'Preguntas Frecuentes', url:'/enterprise/faqs'},
                    {title: 'Devoluciones y Garantias', url:'/enterprise/devolutions'},
                    {title: 'Terminos y Condiciones', url:'/enterprise/terms-conditions'},
                    {title: 'Politicas de privacidad', url:'/enterprise/privacy'},
                ]
            }
        },
        {
            title: 'Marcas',
            url: '/shop/',
            submenu: {
                type: 'menu',
                menu: []
            },
        },
        {
            title: 'Productos',
            url: '/shop/',
            submenu: {
                type: 'menu',
                menu: [],
            },
        },
        {
            title: 'Segmentos',
            url: '/segments',
            submenu: {
                type: 'menu',
                menu: [],
            },
        },
        {
            title: 'Catalogo',
            url: '/catalog',
        },
        {
            title: 'Blog',
            url: '/blog'
        },
        {
            title: 'Contacto',
            url: '/contact',
        },
    ]

    public async getDataHeaderNavigation() {
        await this.setBrandsMenuUrl()
        await this.setProductsMenuUrl()
        await this.setSegmentsMenUrl()
        console.log('Desde la clase ', this.dataHeaderNavigation)
        return this.dataHeaderNavigation

    }

    private async setSegmentsMenUrl() {
        await this.segmentsRepository.getAllSegments().then(({data}) => {
            this.dataHeaderNavigation.map(nav => {
                if (nav.title === 'Segmentos') {
                    data.map(brand => (
                        // @ts-ignore
                        nav.submenu?.menu.push(
                            {
                                title: brand.name,
                                url: `/shop/segments/${brand.slug}`
                            }
                        )
                    ))
                }
            })
        })
    }

    private async setProductsMenuUrl() {
        await this.productsRepository.getAllProducts().then(({data}) => {
            this.dataHeaderNavigation.map(nav => {
                if (nav.title === 'Productos') {
                    data.map(brand => (
                        // @ts-ignore
                        nav.submenu?.menu.push(
                            {
                                title: brand.title,
                                url: `/shop/products/${brand.slug}`
                            }
                        )
                    ))
                }
            })
        })
    }

    private async setBrandsMenuUrl() {
        await this.brandsRepository.getCompanyBrands().then(({data}) => {
            this.dataHeaderNavigation.map(nav => {
                if (nav.title === 'Marcas') {

                    data.map(brand => (
                        // @ts-ignore
                        nav.submenu?.menu.push(
                            {
                                title: brand.name,
                                url: `/shop/brands/${brand.slug}`
                            }
                        )

                    ))
                }
            })
        })
    }
}

export default HeaderNavigationData;
