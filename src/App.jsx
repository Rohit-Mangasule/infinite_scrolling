"use strict";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { StrictMode, useCallback, useMemo, useState, useRef } from "react";
import axios from 'axios';

const GridExample = () => {
  const gridRef = useRef(null);

  const columnDefs = [
    { headerName: "Title", field: "Title", sortable: true, filter: true },
    { headerName: "Year", field: "Year", sortable: true },
    { headerName: "Type", field: "Type" },
    { headerName: "IMDb ID", field: "imdbID" },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };

  const fetchMovies = async (pageNumber, pageSize) => {
    try {
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
      
      // Call successCallback with the data
      params.successCallback(movies, 1000);
    },
  };


  const onGridReady = useCallback((params) => {
    
        params.api.setGridOption("datasource", dataSource);
      
  }, []);
  
  
  const components={
    loading:(params)=>{
      if(params.value!==undefined){
        return params.value
      }else{
        return "<img src='https://www.ag-grid.com/example-assets/loading.gif'/>"
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
        components={components}
        datasource={dataSource}
      />
    </div>
  );
};

export default GridExample;