import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../state/store";
import Breadcrumb from "../../../components/breadcrumb";
import Heading from "../../../components/ui/heading";
import { Product } from "../../../interfaces/product.interface";
import { Button } from "../../../components/ui/button";
import ProductCardFavorite from "../../../components/ui/product-card-favorite";
import { Spinner } from "../../../components/ui/spinner";

const FavoritesPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const [products, setProducts] = useState<any>(null);
  const fetchProducts = async () => {
    const response = await fetch(
      "/api/user/getFavorites",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      }
    );
    const result = await response.json();

    console.log(result);

    const formattedProducts: Product[] = result["favorites"].map(
      (item: any) => ({
        id: item._id,
        name: item.name,
        pathname: item.pathname,
        description: item.description,
        category: item.category,
        subcategory: item.subcategory,
        brand: item.brand,
        colorQuantity: item.colorQuantity,
        price: item.price,
        sold: item.sold,
        images: item.images,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        createdAt: format(Date.parse(item.createdAt), "MMMM do, yyyy"),
      })
    );

    setProducts(formattedProducts);
  };

  useEffect(() => {
    fetchProducts();
    console.log("From page", favorites);
  }, []);

  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

  const callback = async (productId: any) => {
    setProducts((prevState: any) =>
      prevState.filter((product: any) => product.id != productId)
    );
  };

  return (
    <div className="p-5">
      {/* <Breadcrumb /> */}
      <Heading
        title="Favorites"
        description="View and edit your list of favorite products"
      />
      {products ? (
        <>
          {products.length === 0 && (
            <h2 className="text-center mt-20 text-lg">
              No favorite products added.
            </h2>
          )}
          <div className="mt-5 grid grid-cols-4 gap-4">
            {products.map((product: any, index: number) => (
              <ProductCardFavorite
                key={index}
                product={product}
                callback={callback}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center pt-20">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
