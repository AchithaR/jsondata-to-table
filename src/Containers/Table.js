import React, { Component } from 'react';
import './Table.css';
import * as sorticon from '../Assets/sort-icon.png';

   


class Table extends Component {
    state = {
        tableData : this.props.data,
        columnData : this.props.data.columnHeaders,
        rowData : this.props.data.rowData,
        searchedTerm : '',
        asc : true,
        id : ''
    }
    
    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    colClickHandler = (key,index) => {
       
        if(this.state.id === key){
            this.setState({
                Asc : !this.state.Asc
            
            })
        }
        
        this.setState({
          
            id : key,
            rowData : this.state.rowData.sort((a, b) => {
                const asc= this.state.Asc;
                if (a.data[index].value < b.data[index].value) {
                    return asc ? -1 : 1;
                } else if (a.data[index].value > b.data[index].value) {
                    return asc ? 1 : -1;
                } else {
                    return 0;
                }
            })  

        });
    }
    
    handleSearch = (e) => {
       
        this.filterSearch(e.target.value);
    }
    
    filterSearch = (term) => {
       this.setState({
           rowData : this.state.tableData.rowData,
           searchedTerm : ''
        });
        term = term.toString().trim().toLowerCase();
        
       if( term.length > 2){
            var filteredData = this.state.rowData.filter((rows) => {
                let flag = false;
                var tmp_columnData =this.state.columnData;
                rows.data.forEach(function (row) {
                    tmp_columnData.map((colheaderData) => {
                        if(colheaderData.id === row.id && colheaderData.filterable === "true")
                            if(row.value.toString().trim().toLowerCase().match(term)){
                                flag = true;
                            }
                        return true;
                    })
                });
                if(flag===true){
                    return true;
                }  else{
                    return false;
                }
            })
            if(filteredData.length === 0 ) {
                filteredData = this.state.rowData;
            }
            this.setState({
                rowData : filteredData,
                searchedTerm : term
            })
        }

    
    }
    
    getHeader = function(){
        return this.state.columnData.map((colheaderData,index) => {
            return (
                <th key={colheaderData.id} id={colheaderData.id} label={colheaderData.label}
                    data-sortable={colheaderData.sortable}
                    data-filterable={colheaderData.filterable}> 
                    {   colheaderData.label }
                    {   colheaderData.sortable === "true" &&
                        <button onClick = { () => { this.colClickHandler(colheaderData.id,index); } }> 
                            <img alt="" src={ sorticon} id="sorticon"/>
                        </button> 
                    }
                </th>
            )
        })

        
    }
    
    getRowsData = function(){
        return this.state.rowData.map(rowData => {
            return (
                <tr key={rowData.id} id={rowData.id}>
                    {rowData.data.map((rowDataConf) => {
                        return(
                            <td key={rowDataConf.id} label={rowDataConf.id}>
                                { this.state.searchedTerm.length > 2 &&
                                    <Highlighted text={rowDataConf.value} highlight={this.state.searchedTerm} /> 
                                }
                                { this.state.searchedTerm.length < 2 &&
                                    <Highlighted text={rowDataConf.value} highlight={this.state.searchedTerm} /> 
                                }
                            </td>
                        )
                    })} 
                </tr>
            )
        })
        
    
    }
    render() {
            return (
                <div className="container">
                    <label>Filter Text:</label>
                    <input type="text" id="searchBox" onChange={this.handleSearch} placeholder= "Search Here" />
                    <table>
                        <thead>
                            <tr>{this.getHeader()}</tr>
                        </thead>
                        <tbody>
                            {this.getRowsData()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    const Highlighted = ({text = '', highlight = ''}) => {

        var query = highlight;
        var regex = new RegExp("(" + query + ")", "gi");
        var name = text;
        var parts = name.split(regex);
        var result = text;
        if (parts) {
            
            if (parts.length === 3) {
                result = <span>{parts[0]}<strong id="highLighter">{parts[1]}</strong>{parts[2]}</span>
            } 
        }

        return <span id="rowValue">{result}</span>;
    }
    
    export default Table;
