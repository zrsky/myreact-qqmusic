import React from 'react'
import { Select } from 'antd'
const Option = Select.Option
//日期格式化
export const FormateDate = function(time) {
    let date = new Date(time);
    return (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ":" + (date.getSeconds());
}

//分页
export const Pagination = function(data) {
    return {
        pageSize: data.result['page_size'],
        total: data.result['total_count'],
        showQuickJumper: true,
        showTotal: ()=>`共${data.result['total_count']}条`,
    }
}

//获取option选项列表
export const getOptionList = function(options) {
    if(!options) {
        return [];
    }
    return options.map((item,index) => {
        return (<Option value={item.value} key={item.value}>{item.name}</Option>)
    })
}

export const updateSelectedItem = function(selectedRowKeys, selectedItem, selectedId){
    if(selectedId){
        this.setState({
            selectedRowKeys,
            selectedItem,
            selectedId
        });
    }else{
        this.setState({
            selectedRowKeys,
            selectedItem,
        });
    }
}