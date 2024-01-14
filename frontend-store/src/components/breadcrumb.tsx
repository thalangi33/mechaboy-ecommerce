import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  bread: any;
  crumbs: any[];
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ bread, crumbs }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-3 flex flex-row space-x-1 text-sm scroll-m-20 font-medium tracking-tight text-muted-foreground">
      <div className="cursor-pointer" onClick={() => navigate(bread.link)}>
        {bread.name}
      </div>
      {crumbs.map((crumb) => (
        <>
          <div>/</div>
          <div className="cursor-pointer" onClick={() => navigate(crumb.link)}>
            {crumb.name}
          </div>
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
