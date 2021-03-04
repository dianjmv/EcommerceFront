// application
import Fi24Hours48Svg from '../../svg/fi-24-hours-48.svg';
import FiFreeDelivery48Svg from '../../svg/fi-free-delivery-48.svg';
import FiPaymentSecurity48Svg from '../../svg/fi-payment-security-48.svg';
import FiTag48Svg from '../../svg/fi-tag-48.svg';

export type BlockFeaturesLayout = 'classic' | 'boxed';

export interface BlockFeaturesProps {
    layout?: BlockFeaturesLayout;
}

function BlockFeatures(props: BlockFeaturesProps) {
    const { layout = 'classic' } = props;

    return (
        <div className={`block block-features block-features--layout--${layout} mb-0`}>
            <div className="block-features__list border-none mb-0">
                <div className="block-features__item md:ml-20">
                    <div className="block-features__icon">
                        <FiFreeDelivery48Svg />
                    </div>
                    <div className="block-features__content">
                        <div className="block-features__title text-white">Envio Seguro</div>
                        <div className="block-features__subtitle text-white">A todas las ciudades del País.</div>
                    </div>
                </div>

                <div className="block-features__item">
                    <div className="block-features__icon">
                        <Fi24Hours48Svg />
                    </div>
                    <div className="block-features__content">
                        <div className="block-features__title text-white">Soporte 24/7</div>
                        <div className="block-features__subtitle text-white">Respuesta inmediata</div>
                    </div>
                </div>

                <div className="block-features__item">
                    <div className="block-features__icon">
                        <FiTag48Svg />
                    </div>
                    <div className="block-features__content">
                        <div className="block-features__title text-white">Compra Online</div>
                        <div className="block-features__subtitle text-white">Respuesta inmediata</div>
                    </div>
                </div>

                <div className="block-features__item">
                    <div className="block-features__icon">
                        <FiPaymentSecurity48Svg />
                    </div>
                    <div className="block-features__content">
                        <div className="block-features__title text-white">100% Segura</div>
                        <div className="block-features__subtitle text-white">Respuesta inmediata</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockFeatures;
