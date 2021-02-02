// application
import getShopPageData from '../../../store/shop/shopHelpers';
import ShopPageCategory from '../../../components/shop/ShopPageCategory';
import { wrapper } from '../../../store/store';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    await getShopPageData(context);
});

function Page() {
    return <ShopPageCategory columns={3} viewMode="grid" sidebarPosition="start" />;
}

export default Page;
