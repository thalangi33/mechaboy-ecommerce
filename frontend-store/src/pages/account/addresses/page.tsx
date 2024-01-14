import { Button } from "../../../components/ui/button";
import Breadcrumb from "../../../components/breadcrumb";
import Heading from "../../../components/ui/heading";
import React from "react";
import AddressForm from "./component/address-form";

const AddressesPage = () => {
  return (
    <div className="p-5">
      {/* <Breadcrumb /> */}
      <Heading
        title="Address"
        description="Manage your addresses for delivery"
      />
      <div className="my-5 space-y-5">
        <Button variant="secondary" className="font-bold tracking-tight">
          Add an address
        </Button>
        <div className="tracking-tight">
          There are no addresses. Please add one.
        </div>
        <AddressForm />
      </div>
    </div>
  );
};

export default AddressesPage;
