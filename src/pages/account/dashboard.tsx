// application
import AccountPageDashboard from '../../components/account/AccountPageDashboard';
import AccountLayout from '../../components/account/AccountLayout';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

function Page() {
    return <AccountPageDashboard />;
}

Page.Layout = AccountLayout;

export default Page;
