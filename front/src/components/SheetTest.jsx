import React, { useState } from "react";
import XLSX from "xlsx";

export default () => {
  const [workbook, setWorkbook] = useState({});
  const handleInputChange = (e) => {
    const target = e.target;
    const fileExt = e.target.value.slice(e.target.value.indexOf("."));
    if (fileExt == ".xls" || fileExt == ".xlsx" || fileExt == ".ods") {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        let data = new Uint8Array(e.target.result);
        setWorkbook(XLSX.read(data, { type: "array" }));
      };
    } else {
      alert(
        `${fileExt} extension not supported. Please use "xls", "xlsx" or "ods"`
      );
    }
  };
  let hoja;
  let planilla;
  workbook.Sheets ? (hoja = Object.keys(workbook.Sheets)[0]) : null;
  workbook.Sheets ? (planilla = workbook.Sheets[hoja]) : null;
  console.log(planilla);
  return (
    <input
      required
      type="file"
      name="file"
      id="file"
      onChange={handleInputChange}
    />
  );
};
