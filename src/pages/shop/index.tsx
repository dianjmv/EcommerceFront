import React, { useEffect } from 'react';
import ShopPageCategory from '../../components/shop/ShopPageCategory';
import { useResetFilters } from '../../store/filter/filterHooks';
const ShopList = () => {
    const resetFilter = useResetFilters();
    useEffect(() => {
        resetFilter();
    }, []);
    return <ShopPageCategory columns={4} viewMode="grid" />;
};
export default ShopList;
