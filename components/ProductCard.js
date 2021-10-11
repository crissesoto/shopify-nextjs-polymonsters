import Image from 'next/image';
import { formatter } from '../utils/helpers';

function ProductCard({node}) {
    const {id, images, title, handle, priceRange } = node;
    const image = images.edges[0].node;
    const price = priceRange.minVariantPrice.amount;

    return (
        <div className="group relative" id={id}>
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img src={image.originalSrc} alt={image.altText} style={{height: "-webkit-fill-available"}} />
            </div>
            <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-900">
                <a href={`/products/${id}`}>
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {title}
                </a>
                </h3>
            </div>
            <p className="text-sm font-medium text-gray-700">{formatter.format(price)}</p>
            </div>
        </div>
    )
}

export default ProductCard
