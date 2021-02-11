import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import '../Table.style.scss';

export default function ViewOnlyTable({data=[], dataColumns=[]}) {
    const { isPortrait } = useSelector(state => state.dimensionReducer);

    return (
        <div className='table'>
            <Table dataSource={data} columns={dataColumns} scroll={isPortrait? {x: window.innerWidth * 2.5, y: window.innerHeight * 0.7} : {y: 240}} pagination={{pageSize: 10}}/>
        </div>
    );
}
