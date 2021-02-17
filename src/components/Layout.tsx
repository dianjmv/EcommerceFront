// react
import {Fragment, PropsWithChildren, useEffect} from 'react';

// third-party
import {ToastContainer} from 'react-toastify';

// application
import Footer from './footer/Footer';
import Header, {HeaderLayout} from './header/Header';
import MobileHeader from './mobile/MobileHeader';
import MobileMenu from './mobile/MobileMenu';
import Quickview from './shared/Quickview';

import {useCompanyAddInfo} from "../store/company/companyHooks";
import {useAddProducts} from "../store/product/productHooks";
import CompanyRepository from "../api/companyInfo";

export interface LayoutProps extends PropsWithChildren<{}> {
    headerLayout: HeaderLayout;
}

function Layout(props: LayoutProps) {

    const {children, headerLayout} = props;
    const addCompanyInfo = useCompanyAddInfo()
    const companyRepository= new CompanyRepository()
    useEffect(()=>{
        companyRepository.getCompanyInfo().then(({data})=>addCompanyInfo(data[0]))
    },[])


    return (
        <Fragment>
            <div id="fb-root"/>


            <ToastContainer autoClose={5000} hideProgressBar/>

            <Quickview/>

            <MobileMenu/>

            <div className="site">
                <header className="site__header d-lg-none">
                    <MobileHeader/>
                </header>

                <header className="site__header d-lg-block d-none">
                    <Header layout={headerLayout}/>
                </header>

                <div className="site__body">
                    {children}
                </div>

                <footer className="site__footer">
                    <Footer/>
                </footer>
            </div>
            <script async defer crossOrigin="anonymous"
                    src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v9.0" nonce="SJcSspgl"/>
        </Fragment>
    );
}

export default Layout;
