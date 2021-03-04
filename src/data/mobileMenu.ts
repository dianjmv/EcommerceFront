import {IMobileMenu} from '../interfaces/menus/mobile-menu';
import BrandsRepository from "../api/brandsRepository";
import ProductsRepository from "../api/productsRepository";
import CategoryRepository from "../api/categoryRepository";
import SegmentRepository from "../api/segmentRepository";


class MobileMenuData {
    private brandsRepository = new BrandsRepository()
    private productsRepository = new ProductsRepository()
    private categoriesRepository = new CategoryRepository()
    private segmentsRepository = new SegmentRepository()
    private dataMenu: IMobileMenu = [
        {
            type: 'link',
            title: 'Inicio',
            url: '/',
        },

        {
            type: 'link',
            title: 'Empresa',
            children: [
                {title: 'Acerca de nosotros', url:'/enterprise/about-us', type: 'link'},
                {title: 'Preguntas Frecuentes', url:'/enterprise/faqs', type: 'link'},
                {title: 'Devoluciones y Garantias', url:'/enterprise/devolutions', type: 'link'},
                {title: 'Terminos y Condiciones', url:'/enterprise/terms-conditions', type: 'link'},
                {title: 'Politicas de privacidad', url:'/enterprise/privacy', type: 'link'},
            ],
        },

        {
            type: 'link',
            title: 'Marcas',
            url: '/shop/',
            children: [  ],
        },

        {
            type: 'link',
            title: 'Productos',
            url: '/shop/',
            children: [  ],
        },

        {
            type: 'link',
            title: 'Segmentos',
            url: '/segments',
            children: [   ],
        },

        {
            type: 'link',
            title: 'Catalogo',
            url: '/catalog',
        },
        {
            type: 'link',
            title: 'Blog',
            url: '/blog'
        },
        {
            type: 'link',
            title: 'Contacto',
            url: '/contact',
        },

    ]

    public async getMobileMenu() {
        await this.setBrandsMenuUrl()
        await this.setProductsMenuUrl()
        await this.setSegmentsMenUrl()
        return this.dataMenu
    }

    private async setSegmentsMenUrl() {
        await this.segmentsRepository.getAllSegments().then(({data}) => {
            this.dataMenu.map(nav => {
                if (nav.title === 'Segmentos') {
                    data.map(brand => (
                        // @ts-ignore
                        nav.children?.push(
                            {
                                type: 'link',
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
            this.dataMenu.map(nav => {
                if (nav.title === 'Productos') {
                    data.map(brand => (
                        // @ts-ignore
                        nav.children?.push(
                            {
                                type: 'link',
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
            this.dataMenu.map(nav => {
                if (nav.title === 'Marcas') {

                    data.map(brand => (
                        // @ts-ignore
                        nav.children?.push(
                            {
                                type:'link',
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


export default MobileMenuData;
