import React, { Component } from 'react';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import * as Onisep from './Onisep_db.js';

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class SelectCertificate extends Component {

  state = {
    columns: [
      { title: 'Code CNIS', field: 'code_cnis' },
      { title: 'Label', field: 'libelle_formation_principal' },
      { title: 'Complementary label', field: 'libelle_formation_complementaire'},
      { title: 'Source', render: () => "onisep"}
    ],
    data: Onisep.db,
    tableRef: React.createRef(),
    selected: false,
    selectedRowId:null,
    c: this.props.theme.palette.action.selected,
    currentRow: {}
  };
  /* constructor(props) {
    super(props);
  }; */
  render () {
  return (
    <MaterialTable
      icons={tableIcons}
      title="Select a Certificate"
      columns={this.state.columns}
      data={this.state.data}
      options={{
          rowStyle: rowData => ({
            backgroundColor:
            (this.state.selected &&
              rowData.tableData.id === this.state.selectedRowId)
                ? this.state.c
                : this.props.theme.palette.default
          })}}
      onRowClick={(event, rowData) => {
          this.setState({ currentRow: rowData });
          if (rowData.tableData.id === this.state.selectedRowId) {
            this.setState({ selected: false });
            this.setState({ selectedRowId: null });
            this.props.setCertificate(null);
          } else {
            this.setState({ selected: true });
            this.setState({ selectedRowId: rowData.tableData.id });
            this.props.setCertificate({
              label:rowData.libelle_formation_principal,
              clabel:rowData.libelle_formation_complementaire})
          }
        }}
    />
  );
      }
}

export default SelectCertificate;