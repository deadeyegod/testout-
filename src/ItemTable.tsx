import React, { useState } from 'react';
import { useGetItemsQuery } from '../app/services/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable, DataTableSortEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Item {
  id: number;
  n: string;
  c: string[];
}

const ItemTable: React.FC = () => {
  const { data: items = [] } = useGetItemsQuery(undefined); 
  const [sortField, setSortField] = useState<string | undefined>(undefined); 
  const [sortOrder, setSortOrder] = useState<1 | -1 | null>(null); 
  const [editItem, setEditItem] = useState<Item | null>(null); 
  const [displayDialog, setDisplayDialog] = useState(false); 

  const onSort = (e: DataTableSortEvent) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder === undefined || e.sortOrder === 0 ? null : e.sortOrder);
  };

  const onEdit = (item: Item) => {
    setEditItem(item);
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setEditItem(null);
    setDisplayDialog(false);
  };

  const actionBodyTemplate = (rowData: Item) => (
    <div>
      <Button label="Edit" icon="pi pi-pencil" className="p-button-text p-button-plain" onClick={() => onEdit(rowData)} />
      <Button label="Delete" icon="pi pi-trash" className="p-button-text p-button-danger p-button-plain ml-2" />
    </div>
  );

  return (
    <div className="container mx-auto p-4 ">
      <DataTable
        value={items}
        scrollable
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(e) => onSort(e)}
        breakpoint="960px"
      >
        <Column field="n" header="Name" sortable headerClassName="cursor-pointer" />
        <Column field="c" header="Category" sortable body={(rowData: Item) => rowData.c.join(', ')} headerClassName="cursor-pointer" />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>

      <Dialog header="Edit Item" visible={displayDialog} onHide={hideDialog} style={{ width: '50vw' }}>
        {editItem && (
          <div className="p-4">
            <div className="field mb-4">
              <label htmlFor="name" className="block text-lg mb-2">Name</label>
              <InputText id="name" value={editItem.n} onChange={(e) => setEditItem({ ...editItem, n: e.target.value })} className="w-full p-2" />
            </div>
            <div className="field mb-4">
              <label htmlFor="category" className="block text-lg mb-2">Category</label>
              <MultiSelect
                id="category"
                value={editItem.c}
                options={[
                  { label: 'TPS', value: 'TPS' },
                  { label: 'Adventure', value: 'Adventure' },
                  { label: 'Horror', value: 'Horror' },
                  { label: 'Movie', value: 'Movie' },
                  { label: 'Thriller', value: 'Thriller' },
                  { label: 'Spy', value: 'Spy' },
                  { label: 'Batman', value: 'Batman' },
                  { label: 'Philanthropist', value: 'Philanthropist' },
                  { label: 'Orphan', value: 'Orphan' },
                ]}
                onChange={(e) => setEditItem({ ...editItem, c: e.value })}
                className="w-full p-2"
              />
            </div>
            <Button label="Save" icon="pi pi-check" onClick={hideDialog} />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ItemTable;
