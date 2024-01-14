import { Minus, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Carousel from "../home/components/carousel";
import { useDispatch } from "react-redux";
import { addItem } from "../../state/shopping-cart/shoppingCartSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "../../components/ui/spinner";
import ImageCarousel from "./components/image-carousel";

const ProductsPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [color, setColor] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const response = await fetch(
      `/api/product/?pathname=${location.pathname.split("/")[3]}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();

    console.log(result);
    setProduct({
      id: result.product._id,
      pathname: result.product.pathname,
      name: result.product.name,
      description: result.product.description,
      category: result.product.category,
      subcategory: result.product.subcategory,
      brand: result.product.brand,
      colorQuantity: result.product.colorQuantity,
      price: result.product.price,
      sold: result.product.sold,
      images: result.product.images,
      isFeatured: result.product.isFeatured,
      isArchived: result.product.isArchived,
    });

    setColor(result.product.colorQuantity.map((obj: any) => obj.color));
  };

  const [selectedColor, setSelectedColor] = useState(0);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [window.location.href]);

  const dispatch = useDispatch();

  return (
    <div className="p-5">
      {product && (
        <Breadcrumb
          bread={{ name: "Home", link: "/" }}
          crumbs={[
            {
              name: product.category.name,
              link: `/${product.category.pathname}`,
            },
            {
              name: product.brand.name,
              link: `/${product.category.pathname}/${product.brand.pathname}`,
            },
          ]}
        />
      )}
      {product ? (
        <div className="flex flex-row max-md:flex-col space-x-4 max-md:space-x-0 gap-x-7">
          <div className="basis-4/6 grid grid-cols-2 gap-4 max-md:hidden">
            {product.images.map((image: any) => (
              <img
                src={image.key}
                key={image.key}
                className="rounded-md object-cover aspect-square"
              />
            ))}
          </div>
          <ImageCarousel images={product.images} />
          <div className="basis-2/6 space-y-4 ">
            <h4
              className="scroll-m-20 text-2xl font-medium tracking-tight text-muted-foreground cursor-pointer"
              onClick={() =>
                navigate(
                  `/${product.category.pathname}/${product.brand.pathname}`
                )
              }
            >
              {product.brand.name}
            </h4>
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
              {product.name}
            </h2>
            <p className="scroll-m-20 text-base font-medium tracking-tight text-muted-foreground">
              {product.description}
            </p>
            <p className="scroll-m-20 text-2xl font-bold tracking-tight">
              ${product.price}
            </p>

            <div className="flex flex-row space-x-2 items-center">
              <p>Color:</p>
              <p className="scroll-m-20 font-semibold tracking-tight">
                {color[selectedColor].name}
              </p>
              <div
                className="border p-3 rounded-full"
                style={{ backgroundColor: color[selectedColor].value }}
              ></div>
            </div>
            <div className="space-x-2">
              {color &&
                color.map((color: any, index: number) => (
                  <Button
                    key={index}
                    variant={index == selectedColor ? "default" : "outline"}
                    onClick={() => {
                      setSelectedColor(index);
                      setQuantity(1);
                    }}
                  >
                    {color.name}
                  </Button>
                ))}
            </div>

            <p>Quantity:</p>
            <div className="flex flex-row items-center space-x-3">
              <Button
                className=""
                variant="outline"
                size="sm"
                onClick={() => setQuantity((prevState) => prevState + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <div className="scroll-m-20 text-lg font-semibold tracking-tight">
                {quantity}
              </div>
              <Button
                className=""
                variant="outline"
                size="sm"
                onClick={() => {
                  if (quantity > 1) setQuantity((prevState) => prevState - 1);
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="text-base"
              onClick={() => {
                dispatch(
                  addItem({
                    id: product.id,
                    name: product.name,
                    color: color[selectedColor],
                    quantity: quantity,
                    price: product.price,
                    image: product.images[0],
                  })
                );
                toast.success("Added to the shopping cart");
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-32">
          <Spinner size={32} className="m-auto" />
        </div>
      )}
      {/* {product && <ImageCarousel images={product.images} />} */}

      <div className="my-16"></div>
      <Carousel heading="Best Seller" fetchAPI="/api/product/best-sellers" />
    </div>
  );
};

export default ProductsPage;
