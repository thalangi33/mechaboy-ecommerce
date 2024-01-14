import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/ui/heading";
import { Trash } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import AlertModal from "../../../components/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { CategoryFormData } from "../../category/components/category-form";
import { BrandFormData } from "../../brand/components/brand-form";
import { Checkbox } from "../../../components/ui/checkbox";
import ImageDropzone from "../../../components/ui/image-dropzone";
import { cn } from "../../../lib/utils";
import { ColorFormData } from "../../color/components/color-form";
import { Card } from "../../../components/ui/card";
import { Textarea } from "../../../components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  pathname: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  category: z.string().min(2).max(50),
  subcategory: z.string().min(2).max(50),
  brand: z.string().min(2).max(50),
  colorQuantity: z.array(
    z.object({
      color: z.string().min(2),
      quantity: z.coerce.number().min(1),
    }),
  ),
  price: z.coerce.number().min(1),
  sold: z.coerce.number().min(0),
  images: z.any(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export interface IImage {
  name: string;
  key: string;
}

export interface ProductFormData {
  id: string;
  name: string;
  pathname: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  color: string;
  quantity: number;
  price: number;
  sold: number;
  images: IImage[];
  isFeatured: boolean;
  isArchived: boolean;
}

interface ProductFormProps {
  initialData: ProductFormData | null;
  categories: CategoryFormData[];
  brands: BrandFormData[];
  colors: ColorFormData[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  brands,
  colors,
}: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selecetdCategoryId, setSelectedCategoryId] = useState(
    initialData?.category || "",
  );
  const [hint, setHint] = useState("");

  const navigate = useNavigate();

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      if (!initialData) {
        return;
      }

      const filesToChange = [...files];

      for (const image of initialData.images) {
        console.log(image.key);
        await fetch(image.key)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], image.name, {
              type: blob.type,
            });
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
            filesToChange.push(file);
          });
      }

      setFiles(filesToChange);
    }
    fetchFiles();
  }, []);

  console.log(initialData);
  console.log(files);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      pathname: "",
      description: "",
      // category: "",
      // subcategory: "",
      // brand: "",
      colorQuantity: [{ color: "6558851c28f8a833974bfe59", quantity: 0 }],
      price: 0,
      sold: 0,
      isFeatured: false,
      isArchived: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "colorQuantity",
    control: form.control,
  });

  async function onDelete() {
    if (initialData) {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/product/${initialData.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        toast.error(json.error);
      }

      if (response.ok) {
        setLoading(false);
        navigate("/product", { replace: true });
        toast.success("Product deleted.");
      }
    }
  }

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (
      values.colorQuantity.length > 1 &&
      values.colorQuantity.filter((e) => e.color === "6558851c28f8a833974bfe59")
        .length > 0
    ) {
      form.setError("colorQuantity", {
        message: '"No color" cannot be included with other colors',
      });
      return;
    }

    if (
      new Set(values.colorQuantity.map((item) => item.color)).size !==
      values.colorQuantity.length
    ) {
      form.setError("colorQuantity", {
        message: "No duplicate colors are allowed",
      });
      return;
    }

    setLoading(true);
    let response;

    if (initialData) {
      if (!files) {
        return;
      }

      const formData = new FormData();

      files?.forEach((file) => {
        formData.append("images", file, file.name);
      });

      formData.append("info", JSON.stringify({ ...values }));

      response = await fetch(
        `http://localhost:4000/api/product/${initialData.id}`,
        {
          method: "PATCH",
          body: formData,
        },
      );
    } else {
      console.log("bye");
      console.log("values", values);

      if (!files) {
        return;
      }

      const formData = new FormData();

      files?.forEach((file) => {
        formData.append("images", file, file.name);
      });

      formData.append("info", JSON.stringify({ ...values }));

      response = await fetch("http://localhost:4000/api/product/", {
        method: "POST",
        body: formData,
      });
    }

    const json = await response.json();

    console.log(response.ok);

    if (!response.ok) {
      setLoading(false);
      toast.error(json.error);
      console.log("hello");
    }

    if (response.ok) {
      setLoading(false);
      navigate("/product", { replace: true });
      toast.success(initialData ? "Product updated." : "Product created.");
    }

    console.log(values);
  }

  return (
    <div className="space-y-4">
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={initialData ? "Edit product" : "Create product"}
          description={
            initialData ? "Edit current product" : "Create a new product"
          }
        />
        {initialData ? (
          <Button
            className="ml-auto"
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageDropzone
                    files={files}
                    setFiles={setFiles}
                    onChange={(event) =>
                      field.onChange(setFiles(Array.from(event.target.files)))
                    }
                  />
                  {/* <Input
                    type="file"
                    multiple
                    name="images"
                    disabled={loading}
                    onChange={(event) =>
                      // field.onChange(Array.from(event.target.files || []))
                      // field.onChange(event.target.files)
                      field.onChange(setFileList(event.target.files))
                    }
                  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pathname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pathname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product pathname"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Product description"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("subcategory", "");
                        form.register("subcategory");
                        setHint("Please select a subcategory");
                        setSelectedCategoryId(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn("", hint !== "" ? "text-destructive" : "")}
                  >
                    Subcategory
                  </FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setHint("");
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Subcategory"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          .find(
                            (category) => category.id === selecetdCategoryId,
                          )
                          ?.subcategories.map((subcategory) => (
                            <SelectItem
                              key={subcategory._id}
                              value={subcategory._id}
                            >
                              {subcategory.name}
                            </SelectItem>
                          ))}
                        {/* {subcategoryChoices.map((choice) => (
                          <SelectItem key={choice.id} value={choice.id}>
                            {choice.name}
                          </SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <p className="text-sm font-medium text-destructive">{hint}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Brand"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card className="col-span-2 p-4 space-y-2">
              <div className="flex space-x-4 ">
                <FormLabel className="w-full">Color</FormLabel>
                <FormLabel className="w-full">Quantity</FormLabel>
              </div>
              {fields.map((field, index) => (
                <div className="flex flex-row space-x-4">
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`colorQuantity.${index}.color`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Color"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                  {color.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`colorQuantity.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Quantity"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index > 0 && (
                    <Button
                      className="ml-auto"
                      variant="destructive"
                      size="sm"
                      disabled={loading}
                      onClick={() => remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <FormMessage>
                {form.formState.errors.colorQuantity?.message}
              </FormMessage>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="mt-2"
                onClick={() => {
                  append({ color: "6558851c28f8a833974bfe59", quantity: 0 });
                }}
              >
                Add color
              </Button>
            </Card>
            <FormField
              control={form.control}
              name="sold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sold</FormLabel>
                  <FormControl>
                    <Input placeholder="Sold" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      The product will be featured at the homepage
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      The product will be not be listed on the website
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            // disabled={loading}
          >
            {initialData ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
