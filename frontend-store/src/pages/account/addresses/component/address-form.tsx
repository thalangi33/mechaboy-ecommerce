import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Checkbox } from "../../../../components/ui/checkbox";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  addressLine1: z.string().min(2).max(50),
  addressLine2: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  defaultAddress: z.boolean(),
});

const AddressForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      phoneNumber: "",
      defaultAddress: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-3/5">
      <div className="flex items-center mb-2">
        <div className="font-bold tracking-tight text-xl inline-block">
          Add an address
        </div>
        <Button
          variant="secondary"
          className="ml-auto font-bold tracking-tight"
        >
          Cancel
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                        First Name
                      </Label>
                      <Input
                        className="h-12 pt-9 pb-4 text-base"
                        placeholder="First Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                        Last Name
                      </Label>
                      <Input
                        className="h-12 pt-9 pb-4 text-base"
                        placeholder="Last Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                          Address Line 1
                        </Label>
                        <Input
                          className="h-12 pt-9 pb-4 text-base"
                          placeholder="Address Line 1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                          Address Line 2
                        </Label>
                        <Input
                          className="h-12 pt-9 pb-4 text-base"
                          placeholder="Address Line 2"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                        City
                      </Label>
                      <Input
                        className="h-12 pt-9 pb-4 text-base"
                        placeholder="City"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                        Country
                      </Label>
                      <Input
                        className="h-12 pt-9 pb-4 text-base"
                        placeholder="Country"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                          Phone Number
                        </Label>
                        <Input
                          className="h-12 pt-9 pb-4 text-base"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="defaultAddress"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-2">
                    <FormControl>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormControl>
                    <FormDescription className="text-primary text-base">
                      Make this my default address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
