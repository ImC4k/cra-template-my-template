import { useSelector } from 'react-redux';
import { Table } from 'antd';
import '../Table.style.scss';

export default function SelectableTable({data=[], dataColumns=[], onRowSelectionChange=()=>{}, selectedRowKeys=[]}) {
    // const onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // }
    const { isPortrait } = useSelector(state => state.dimensionReducer);
    return (
        <div className='table'>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: onRowSelectionChange,
                    selectedRowKeys: selectedRowKeys,
                }}
                columns={dataColumns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={isPortrait? {x: window.innerWidth * 1.5, y: window.innerHeight * 0.7} : {y: 240}}
            />
        </div>
    );
};