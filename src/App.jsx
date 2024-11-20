"use strict";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, {  useCallback , useRef } from "react";
import axios from 'axios';

import PopupImageRenderer from "./popupImage";

const App = () => {
  const gridRef = useRef(null);

  const columnDefs = [
    { headerName: "Title", field: "Title", sortable: true, filter: true , cellRenderer: "loading" },
    { headerName: "Year", field: "Year", sortable: true },
    { headerName: "Type", field: "Type" },
    { headerName: "IMDb ID", field: "imdbID" },
    { headerName: "Poster", field: "Poster",  cellRenderer : PopupImageRenderer}
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };

  const fetchMovies = async (pageNumber, pageSize) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=89558e10&s=movie&page=${pageNumber}`
      );
      if (response.data.Search) {
        return response.data.Search;
      }
      return [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };


  const dataSource = {
    getRows: async (params) => {
      const pageNumber = Math.ceil(params.startRow / 10) + 1; 
      const pageSize = params.endRow - params.startRow; 

      // Fetch movie data
      const movies = await fetchMovies(pageNumber, pageSize);
      
      params.successCallback(movies, 1000);
    },
  };


  const onGridReady = useCallback((params) => {
    
        params.api.setGridOption("datasource", dataSource);
      
  }, []);

  const component = {
    loading : (params) => {
      if (params.value != undefined){
        return params.value

      }
      else{
        return "Loading..."
      }
    }
  }

  
  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType="infinite"
        cacheBlockSize={10} // Number of rows per block
        onGridReady={onGridReady}
        animateRows
        components={component}
      />
    </div>
  );
};

export default App;