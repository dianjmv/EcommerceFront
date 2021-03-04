// application
import getShopPageData from '../../store/shop/shopHelpers';
import ShopPageCategory from '../../components/shop/ShopPageCategory';
import { wrapper } from '../../store/store';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps(async context => {
    await getShopPageData(context, 'power-tools');
});

function Page() {
    return <ShopPageCategory columns={3} viewMode="grid" sidebarPosition="end" />;
}

export default Page;
