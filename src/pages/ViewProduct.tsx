import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/reducers/hooks';

import { Product, getProduct } from '../store/actions/ProductAction';
import API from '../api';
import { addToCart } from '../store/reducers/CartSlice';
const ViewProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const singleProduct = useAppSelector((state) => state.products.productItem);
  // console.log('singleP', singleProduct);
  // type productParams = {
  //   id: string;
  // };

  interface RouteParams {
    id: string;
  }

  const params = useParams<RouteParams>();

  // const getSingleProduct = async (id: any) => {
  //   try {
  //     const viewData = await API.get(`/product/${id}`);
  //     console.log('view-empData->', viewData);
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // const getSingleProduct = async (id: RouteParams) => {
  //   try {
  //     dispatch(getProduct(id));
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  useEffect(() => {
    dispatch(getProduct(params));
    // getSingleProduct(params.id);
    // getSingleProduct(params);
  }, []);
  return (
    <div className="container view-cont">
      <div className="view-inn">
        <h2>{singleProduct?.name}</h2>
        <div className="row row-inn">
          <div className="col-sm-4">
            <div className="left-inner">
              <img
                className="prev-class"
                src={singleProduct.preview}
                alt={singleProduct?.name}
              />
            </div>
          </div>

          <div className="col-xs-8 col-sm-8">
            <p>
              <strong>Description:</strong> {singleProduct?.description}
            </p>
            <p>
              <strong>Brand:</strong> <span>{singleProduct?.brand}</span>
            </p>

            <div className="col-xs">
              {singleProduct?.photos &&
                singleProduct?.photos.map((imgs) => (
                  <img
                    className="sizes top-mar"
                    style={{ width: '60px' }}
                    src={imgs}
                  />
                ))}

              {singleProduct?.isAccessory == false ? (
                <>
                  <h4>
                    Type:<span style={{ color: 'red' }}> Not Accessory</span>
                  </h4>
                </>
              ) : (
                <>
                  <h4>
                    Type:<span style={{ color: 'green' }}> Accessory</span>
                  </h4>
                </>
              )}
              <p className="price-css">
                Price:{' '}
                <strong style={{ color: 'blue' }}>
                  {singleProduct?.price}
                </strong>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => dispatch(addToCart(singleProduct.id))}>
                  Add to Cart
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{customPro}</style>
    </div>
  );
};

export default ViewProduct;

const customPro = `
img.prev-class {
  width: 12rem;
  border: 1px dotted #000;
  border-radius: 10px 0px 10px 0;
}
p.price-css {
  margin-top: 20px;
  font-size: 20px;
}
.top-mar {
  margin: 15px 4px;
}
.container.inn-modal {
  margin-top: 20px;
}
.container.view-cont {
  border: 1px solid #000;
  margin-top: 35px;
  box-shadow: 0px 6px 13px 0 #000;
}
.view-inn {
  padding: 30px 15px;
}
.view-inn h2 {
  margin-bottom: 30px;
}
`;
