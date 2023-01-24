import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Graph} from "react-d3-graph";
import {convertMatrixToGraphData, CSVGraphAPI} from "../../apis/CSVGraphAPI/CSVGraphAPI";
import Gant, {IBETask} from "../GantChart/GanttChart";

enum FileTypesEnum {
  dates = 'dates',
  matrix = 'matrix'
}
const myConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  height: 800,
  highlightDegree: 1,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 12,
  minZoom: 0.05,
  nodeHighlightBehavior: true,
  panAndZoom: true,
  staticGraph: false,
  width: window.innerWidth,
  d3: {
    alphaTarget: 0.05,
    gravity: -100,
    linkLength: 100,
    linkStrength: 1
  },
  node: {
    color: 'lightgreen',
    size: 600,
    highlightStrokeColor: 'blue'
  },
  link: {
    color: 'lightgray',
    highlightColor: 'blue',
    renderLabel: false
  }
}


const config = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  height: 600,
  highlightDegree: 2,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  nodeHighlightBehavior: true,
  panAndZoom: true,
  staticGraph: false,
  width: 2000,
  minZoom:0.1,
  d3: {
    alphaTarget: 0.05,
    gravity: -250,
    linkLength: 120,
    linkStrength: 1
  },
  node: {
    color: 'lightgreen',
    fontColor: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    highlightColor: 'blue',
    highlightFontSize: 14,
    highlightFontWeight: 'bold',
    highlightStrokeColor: 'SAME',
    highlightStrokeWidth: 1.5,
    labelProperty: 'label',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: true,
    size: 600,
    strokeColor: 'none',
    strokeWidth: 1.5,
    svg: '',
    symbolType: 'circle'
  },
  link: {
    color: 'lightgray',
    fontColor: 'black',
    fontSize: 8,
    fontWeight: 'normal',
    highlightColor: 'blue',
    highlightFontSize: 8,
    highlightFontWeight: 'bold',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: false,
    strokeWidth: 1.5
  }
} as any

const fileInitialState = {
  [FileTypesEnum.matrix]: {name: ''},
  [FileTypesEnum.dates]: {name: ''},
}

const FileUploader: React.FC = () => {
  const [graphData, setGraphData] = useState(null)
  const [dates, setDates] = useState<IBETask[]>([])
  const [file, setFile] = useState(fileInitialState)
  const datesFileInputRef = useRef<HTMLInputElement>(null);
  const matrixFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: FileTypesEnum) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    const fileListElement = event.target.files[0];
    console.log(fileListElement);
    setFile((prevState) => {
      return {...prevState, [type]: fileListElement}
    })
  };

  const handleRemoveFile = (name: FileTypesEnum): void => {
    setFile(prevState => {
      return {...prevState, [FileTypesEnum[name]]: {name: ''}}
    })
  }


  const submit = async () => {
    const response = await CSVGraphAPI.uploadFiles(file)
    if (response.data) {
      setDates(response.data.dates)
      //@ts-ignore
      setGraphData(convertMatrixToGraphData(response.data.matrix))
    }
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Trigger your action here
      console.log('Escape button pressed');
      setFile(()=> fileInitialState)
      setGraphData(null)
      setDates([])
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);



  return (
    <div className="w-full">
      {graphData ?
        <div className="grid grid-rows-2">
          <div className="row-span-1">
            <Graph id="graph-id" data={graphData} config={myConfig}/>
          </div>
          <div className="row-span-1 bg-white">
            <Gant tasks={dates}/>
          </div>
        </div> :
        <Fragment>
          <div className="container mb-5 mx-auto flex flex-col justify-center items-center">
            <div className="flex w-full justify-center">
              <div
                onClick={() => datesFileInputRef.current && datesFileInputRef.current.click()}
                className="min-w-[15%] inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-600 rounded-l font-semibold cursor-pointer text-sm text-white tracking-widest hover:bg-gray-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition ">
                Upload dates file
              </div>
              <div className="w-4/12 lg:w-3/12 border border-gray-300 rounded-r-md flex items-center justify-between">
            <span id="multi-upload-text" className="p-2">
              {file.dates.name}
            </span>
                {file.dates.name &&
                    <button onClick={() => handleRemoveFile(FileTypesEnum.dates)} className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-red-700 w-3 h-3"
                             viewBox="0 0 320 512">
                            <path
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                        </svg>
                    </button>}
              </div>
            </div>
            <input
              onChange={(event) => handleFileUpload(event, FileTypesEnum.dates)}
              ref={datesFileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
            />
          </div>
          <div className="container mb-5 mx-auto flex flex-col justify-center items-center">
            <div className="flex w-full justify-center">
              <div
                onClick={() => matrixFileInputRef.current && matrixFileInputRef.current.click()}
                className="min-w-[15%] inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-600 rounded-l font-semibold cursor-pointer text-sm text-white tracking-widest hover:bg-gray-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition ">
                Upload matrix file
              </div>
              <div className="w-4/12 lg:w-3/12 border border-gray-300 rounded-r-md flex items-center justify-between">
            <span id="multi-upload-text" className="p-2">
              {file.matrix.name}
            </span>
                {file.matrix.name &&
                    <button onClick={() => handleRemoveFile(FileTypesEnum.matrix)} className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-red-700 w-3 h-3"
                             viewBox="0 0 320 512">
                            <path
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                        </svg>
                    </button>}
              </div>
            </div>
            <input
              onChange={(event) => handleFileUpload(event, FileTypesEnum.matrix)}
              ref={matrixFileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
            />
          </div>
          <div className="container mb-5 mx-auto flex flex-col justify-center items-center my-5">
            <button onClick={submit}
                    className="bg-gray-800 w-4/12 lg:w-3/12 text-white py-2 px-4 rounded-l hover:bg-gray-900 font-semibold ">
              Upload files
            </button>
          </div>
        </Fragment>
      }
    </div>
  );
};

export default FileUploader;
