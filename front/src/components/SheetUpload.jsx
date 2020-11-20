import React, { useState } from "react";
import XLSX from "xlsx";

export default () => {
  const [sheets, setSheets] = useState([]);
  const [selectedFileDocument, setDocument] = useState({});
  const [name, setName] = useState("");
  const [workbook, setWorkbook] = useState({});
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setName({ [name]: value });
    const hojas = [];
    if (true) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        let data = new Uint8Array(e.target.result);
        setWorkbook(XLSX.read(data, { type: "array" }));
        workbook.SheetNames.map((sheetName) => {
          let XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          hojas.push({
            data: XL_row_object,
            sheetName,
          });
        });
      };
    }
    setDocument(target.files[0]);
    setSheets(hojas);
  };
  workbook.Sheets && console.log(workbook.Sheets);
  return (
    <input
      required
      type="file"
      name="file"
      id="file"
      onChange={handleInputChange}
      placeholder="Archivo XLSX"
    />
  );
};
