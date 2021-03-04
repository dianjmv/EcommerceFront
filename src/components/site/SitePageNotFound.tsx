// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

// data stubs
import theme from '../../data/theme';

function SitePageNotFound() {
    return (
        <div className="block">
            <Head>
                <title>{`SouthImport | 404 Página no encontrada`}</title>
            </Head>

            <div className="container">
                <div className="not-found">
                    <div className="not-found__404">Oops! Error 404</div>

                    <div className="not-found__content">
                        <h1 className="not-found__title">Página no encontrada</h1>

                        <p className="not-found__text">
                            La página que estas buscando no existe o no tienes permiso para ingresar.
                            <br />
                            Prueba iniciando sesión
                        </p>

                        <p className="not-found__text">O vuelve a la pagina principal</p>

                        <AppLink href={url.home()} className="btn btn-secondary btn-sm">
                            Volver a la página principal
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageNotFound;
