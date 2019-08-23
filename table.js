const inputData = {
  colDefs: [
    {
      label: "col1",
      width: "40%",
      type: "text"
    },
    {
      label: "col2",
      width: "20%",
      type: "input"
    },
    {
      label: "col3",
      width: "30%",
      type: "checkbox"
    },
    {
      label: "col4",
      width: "30%",
      type: "text"
    },
    {
      label: "col5",
      width: "30%",
      type: "text"
    },
    {
      label: "col6",
      width: "20px",
      type: "text"
    }
  ],
  data: [
    {
      id: 1,
      colData: [
        "i am text",
        "also text, but you can edit",
        false,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    },
    {
      id: 2,
      colData: [
        "i am text",
        "also text, but you can edit",
        false,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    },
    {
      id: 3,
      colData: [
        "i am text",
        "also text, but you can edit",
        true,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    },
    {
      id: 4,
      colData: [
        "i am text",
        "also text, but you can edit",
        false,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    }
  ]
};
class MyTable {
  constructor(tableData, containerElement) {
    this.containerElement = containerElement;
    this.colDefs = tableData.colDefs;
    this.data = tableData.data;
    this.loadTable();
  }
  loadTable() {
    const existingTable = this.containerElement.firstChild;
    console.log("table div", this.containerElement);
    const tableElement = document.createElement("table");
    tableElement.id = "tableElement";
    const tableHeader = this.createHeader();
    tableElement.appendChild(tableHeader);
    const tableBody = this.createTableBody(this.data);
    tableElement.appendChild(tableBody);
    existingTable
      ? this.containerElement.replaceChild(tableElement, existingTable)
      : this.containerElement.appendChild(tableElement);
  }
  createHeader() {
    const tableHeader = document.createElement("thead");
    if (this.colDefs.length !== 0) {
      const colLength = this.colDefs.length;
      this.colDefs.forEach(colDef => {
        const cell = document.createElement("th");
        const cellContent = document.createTextNode(colDef.label);
        cell.appendChild(cellContent);
        cell.style.width = colDef.width;
        if (colDef.type === "checkbox") {
          cell.style["text-align"] = "center";
        }
        tableHeader.appendChild(cell);
      });
    }
    return tableHeader;
  }
  createTableBody(data) {
    const tableBody = document.createElement("tbody");
    this.addToTableBody(tableBody, data);
    return tableBody;
  }
  addToTableBody(tableBody, data) {
    if (data.length !== 0) {
      data.forEach(dataRow => {
        tableBody.appendChild(this.creatRow(dataRow));
      });
    }
  }
  creatRow(dataRow) {
    const tableRow = document.createElement("tr");
    if (dataRow.colData.length !== 0) {
      dataRow.colData.forEach((value, i) => {
        const cell = document.createElement("td");
        const cellContent = this.creatDataCell(i, value);
        cell.appendChild(cellContent);
        tableRow.appendChild(cell);
      });
    }
    return tableRow;
  }
  creatDataCell(index, value) {
    let cell;
    if (this.colDefs[index].type === "input") {
      cell = document.createElement("input");
      cell.setAttribute("value", value);
    } else if (this.colDefs[index].type === "checkbox") {
      cell = document.createElement("input");
      cell.setAttribute("type", "checkbox");
      value && cell.setAttribute("checked", value);
    } else {
      cell = document.createElement("p");
      cell.innerText = value;
    }
    cell.style.width = "100%";
    return cell;
  }

  // data manipulation methods
  addRows(newData) {
    const currentRows = this.containerElement.firstChild.childNodes[1];
    this.data = this.data.concat(newData);
    console.log("current data is", this.data);

    this.addToTableBody(currentRows, newData);
  }
  deleteRows(rowIds) {
    if (rowIds.length !== 0) {
      const resultData = this.data.filter(
        dataRow => !rowIds.includes(dataRow.id)
      );
      this.data = resultData;
      this.loadTable();
    }
  }
  updateRows(updatedData) {
    updatedData.forEach(updatedRow => {
      const index = this.data.findIndex(
        dataRow => dataRow.id === updatedRow.id
      );
      if (index !== -1) {
        this.data.splice(index, 1, updatedRow);
      }
    });
    this.loadTable();
  }
}

window.onload = () => {
  const tableUI = document.getElementsByClassName("tableDiv")[0];
  console.log("table div is", tableUI);
  const tableComponent = new MyTable(inputData, tableUI);

  tableComponent.addRows([
    {
      id: 5,
      colData: [
        "i am text",
        "also text, but you can edit",
        true,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    },
    {
      id: 6,
      colData: [
        "i am text",
        "also text, but you can edit",
        true,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    }
  ]);
  tableComponent.updateRows([
    {
      id: 3,
      colData: [
        "i am new text",
        "also text, but you can edit",
        false,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    },
    {
      id: 4,
      colData: [
        "i am also new text",
        "also text, but you can edit",
        false,
        "i am groot",
        "i am groot",
        "Hodor"
      ]
    }
  ]);
  tableComponent.deleteRows([3, 5]);
};
