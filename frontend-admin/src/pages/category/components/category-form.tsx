import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
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
import ComboboxDemo from "./subcategory-combobox";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

export interface CategoryFormData {
  id: string;
  name: string;
  description: string;
  subcategories: any[] | [];
}

interface CategoryFormProps {
  initialData: CategoryFormData | null;
  subcategoryChoices: object[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  subcategoryChoices,
}: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [subcategories, setSubcategories] = useState(
    initialData?.subcategories || [],
  );
  const [errorSubcategory, setErrorSubcategory] = useState("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  async function onDelete() {
    if (initialData) {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/category/${initialData.id}`,
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
        navigate("/category", { replace: true });
        toast.success("Category deleted.");
      }
    }
  }

  function subcategoriesValidation() {
    if (subcategories.filter((v) => v._id === "").length > 0) {
      setErrorSubcategory("Subcategories are not selected properly");
      return false;
    }
    const uniqueSubcategories = new Set(subcategories?.map((v) => v._id));
    if (uniqueSubcategories.size < subcategories?.length) {
      setErrorSubcategory("Duplicate subcategories are not allowed");
      return false;
    }
    setErrorSubcategory("");
    return true;
  }

  useEffect(() => {
    subcategoriesValidation();
  }, [subcategories]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!subcategoriesValidation()) {
      return false;
    }
    const subcategoriesIds = subcategories.map(
      (subcategory) => subcategory._id,
    );

    setLoading(true);
    let response;

    if (initialData) {
      console.log(initialData.id);
      response = await fetch(
        `http://localhost:4000/api/category/${initialData.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, subcategoriesIds, products: [] }),
        },
      );
    } else {
      response = await fetch("http://localhost:4000/api/category/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subcategoriesIds, products: [] }),
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
      navigate("/category", { replace: true });
      toast.success(initialData ? "Category updated." : "Category created.");
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
          title={initialData ? "Edit category" : "Create category"}
          description={
            initialData ? "Edit current category" : "Create a new category"
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
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Category description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label
                className={cn(
                  "",
                  errorSubcategory !== "" ? "text-destructive" : "",
                )}
              >
                Subcategories
              </Label>
              {subcategories?.map((subcategory, index) => (
                <div className="flex items-center">
                  <ComboboxDemo
                    index={index}
                    selectedSubcategory={subcategory}
                    setSelectedSubcategories={setSubcategories}
                    subcategories={subcategories}
                    subcategoryChoices={subcategoryChoices}
                  />
                  <Button
                    className="ml-2"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      subcategories.splice(index, 1);
                      setSubcategories([...subcategories]);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <p className="text-sm font-medium text-destructive">
                {errorSubcategory}
              </p>
              <div>
                <Button
                  type="button"
                  onClick={() =>
                    setSubcategories([
                      ...(subcategories ?? []),
                      { name: "", _id: "" },
                    ])
                  }
                >
                  Add subcategory
                </Button>
              </div>
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {initialData ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
