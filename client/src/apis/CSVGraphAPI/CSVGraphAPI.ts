import {api} from "../configs/axiosConfig";
import {defineCancelApiObject} from "../configs/axiosUtils";

export const convertMatrixToGraphData = (matrix: string[][]) => {
  const nodes: { id: string; label: string }[] = [];
  const links: { source: string; target: string }[] = [];

  matrix.forEach((row, i) => {
    nodes.push({id: i.toString(), label: `Node ${i}`});
    row.forEach((col, j) => {
      if (col === "1") {
        links.push({source: i.toString(), target: j.toString()});
      }
    });
  });

  return {
    nodes,
    links
  };
}

export const CSVGraphAPI = {
  uploadFiles: async function (files: any, cancel = false): Promise<any> {
    const formData = new FormData();
    formData.append('dates', files.dates)
    formData.append('matrix', files.matrix)
    try {
      const response = await api.post<any>('csv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        signal: cancelApiObject['uploadFiles'].handleRequestCancellation().signal,
      })
      return response
    } catch (error) {
      return []
    }
  }
}

export const cancelApiObject = defineCancelApiObject(CSVGraphAPI)
