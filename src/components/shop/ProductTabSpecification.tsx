// data stubs
import dataShopProductSpec from '../../data/shopProductSpec';

function ProductTabSpecification() {
    const sections = dataShopProductSpec.map((section, index) => {
        const features = section.attributes.map((attribute, index) => (
            <div key={index} className="spec__row">
                <div className="spec__name">{attribute.name}</div>
                <div className="spec__value">{attribute.value}</div>
            </div>
        ));

        return (
            <div key={index} className="spec__section">
                <h4 className="spec__section-title">{section.name}</h4>
                {features}
            </div>
        );
    });

    return (
        <div className="spec">
            <h3 className="spec__header">Specification</h3>
            {sections}
            <div className="spec__disclaimer">
                Information on technical characteristics, the delivery set, the country of
                manufacture and the appearance of the goods is for reference only and is based on
                the latest information available at the time of publication.
            </div>
        </div>
    );
}

export default ProductTabSpecification;
