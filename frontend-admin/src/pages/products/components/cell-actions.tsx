import React, { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ProductColumn } from "./columns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../components/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function onCopy() {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied ID to clipboard");
  }

  function onEdit() {
    navigate(`/product/${data.id}`);
  }

  async function onDelete() {
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/product/${data.id}`,
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
      navigate(0);
      toast.success("Product deleted.");
    }
  }

  return (
    <>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy()} disabled={loading}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit()} disabled={loading}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
