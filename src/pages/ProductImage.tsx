import React, { useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import { listProducts, Product } from '../store/actions/ProductAction';
import { useAppDispatch, useAppSelector } from '../store/reducers/hooks';
type props = {
  id: string;
};
const ProductImage: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state) => state.products.productsItem);
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  const settings = {
    // customPaging: function (i: any) {
    //   return (
    //     <a>
    //       <img src={`/abstract0${i + 1}.jpg`} />
    //     </a>
    //   );
    // },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h2>Custom Paging</h2>
      <Slider {...settings}>
        {productsList &&
          productsList?.map((product) => (
            <>
              {product.photos &&
                product.photos.map((imgs) => (
                  <div>
                    <img
                      className="sizes"
                      style={{ width: '60px' }}
                      src={imgs}
                    />
                  </div>
                ))}
            </>
          ))}
      </Slider>
    </div>
  );
};

export default ProductImage;
