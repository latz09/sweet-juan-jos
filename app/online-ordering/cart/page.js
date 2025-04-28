import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ONLINE_ORDERING_SETTINGS_QUERY as query } from '@/data/queries/online-ordering/FETCH_ONLINE_ORDERING_SETTINGS_QUERY';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import Image from 'next/image';
import logo from '@/public/images/logo/transparent-juanjos.png';

const OnlineOrderCartPage = async () => {
  const settings = await sanityClient.fetch(query);

  return (
    <div className="relative overflow-hidden min-h-[80vh]">
      {/* Watermark logo behind everything */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-[170px] lg:w-[300px] max-w-[50vw]">
          <Image
            src={logo}
            alt="Watermark Logo"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Checkout content */}
      <div className="relative z-10">
        <CheckoutPage settings={settings} />
      </div>
    </div>
  );
};

export default OnlineOrderCartPage;

export const revalidate = 10;
