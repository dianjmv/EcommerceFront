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

import {useCompanyAddInfo, useCompanyInfo} from "../store/company/companyHooks";
import {useAddProducts} from "../store/product/productHooks";
import CompanyRepository from "../api/companyInfo";
import AppLink from "./shared/AppLink";
import AuthRepository from "../api/authRepository";
import {useAddUser, useUserLogged} from "../store/auth/authHooks";
import {useLoadingState} from "../store/loading/loadingHooks";
import BlockLoader from "./blocks/BlockLoader";



export interface LayoutProps extends PropsWithChildren<{}> {
    headerLayout: HeaderLayout;
}

function Layout(props: LayoutProps) {

    const {children, headerLayout} = props;
    const addCompanyInfo = useCompanyAddInfo()
    const companyRepository= new CompanyRepository()
    const companyInfo = useCompanyInfo();
    const authRepository = new AuthRepository()
    const userLogged = useUserLogged()
    const addUserLogged = useAddUser()
    const stateLoader = useLoadingState()

    useEffect(()=>{
        companyRepository.getCompanyInfo().then(({data})=>addCompanyInfo(data[0]))
        if (userLogged.userLogged?.user && localStorage.getItem('access_token') !== null){
            const jwt = localStorage.getItem('access_token')!== null? localStorage.getItem('access_token'):''
            if (userLogged.userLogged.user.id != null) {
                authRepository.me(userLogged.userLogged.user.id).then(({data}) => {
                    const dataUser = {
                        jwt: userLogged.userLogged?.jwt,
                        user: data
                    }
                    // @ts-ignore
                    addUserLogged(dataUser)
                })
            }
        }

    },[])

    if (stateLoader.loading ){
        return <BlockLoader/>
    }else{
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
                    <AppLink href={`https://wa.me/${companyInfo.whatsapp_number}?text=${companyInfo.whatsapp_message}`} className={'ws_icon'}>
                        <img src="/images/ws_icon.png" alt=""/>
                    </AppLink>
                </div>
                <script async defer crossOrigin="anonymous"
                        src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v9.0" nonce="SJcSspgl"/>
            </Fragment>
        );
    }


}

export default Layout;
