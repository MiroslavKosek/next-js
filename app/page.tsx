"use client";
import dynamic from 'next/dynamic'
import { Menubar } from 'primereact/menubar';
import { PrimeReactContext } from 'primereact/api';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

interface Device {
  id: number | null;
  serial_number: string;
  product_id: string;
  scenario: string;
  new: boolean;
  created: string;
}

export default function Home() {
  let emptyDevice: Device = {
    id: null,
    serial_number: '',
    product_id: '',
    scenario: '',
    new: true,
    created: '2023-12-04T19:07:17.428Z'
  };

  const [devices, setDevices] = useState<Device[]>([{id: 1, serial_number: 'FCW2718Y5ZN', product_id: 'IR1101-K9', scenario: 'devel1', created: '2023-12-04T19:07:17.428Z', new: true}]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const dt = useRef<DataTable<Device[]>>(null);

  const { changeTheme } = useContext(PrimeReactContext);

  const [checked, setChecked] = useState(true);

  const Theme = (theme: boolean) => {
    if (theme) {
      setChecked(theme)
      changeTheme?.('lara-light-blue', 'lara-dark-blue', 'app-theme', () => {console.log('dark')})
    }
    else {
      setChecked(theme)
      changeTheme?.('lara-dark-blue', 'lara-light-blue', 'app-theme', () => {console.log('light')})
    }
  };

  const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>
  const end = <div className="flex justify-content-center align-items-center"><i className="pi pi-sun mx-2"></i><InputSwitch checked={checked} onChange={(e) => Theme(e.value)} /><i className="pi pi-moon mx-2"></i></div>
  
  const actionBodyTemplate = (rowData: Device) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDevice(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDevice(rowData)} />
        </React.Fragment>
    );
};

  return (
    <div>
      <Menubar start={start} end={end} />
      <div className="m-3">
        <div className="row">
          <div className="flex-auto w-full">
            <h1>Devices</h1>
            <div className="card">
                <DataTable ref={dt} value={devices}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} devices" globalFilter={globalFilter}>
                    <Column field="serial_number" header="Serial Number" sortable></Column>
                    <Column field="product_id" header="Product ID" sortable></Column>
                    <Column field="scenario" header="Scenario" sortable></Column>
                    <Column field="created" header="Created" sortable></Column>
                    <Column field="new" header="New" sortable></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
