import React from "react";
import { useDashboardContext } from "./DashboardLayout";

export const AddJob = () => {
  const data = useDashboardContext();
  console.log(data);
  return <div>AddJob</div>;
};

export default AddJob;
