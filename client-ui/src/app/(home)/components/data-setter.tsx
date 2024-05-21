'use client';

import { add } from '@/lib/features/product/productSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import React from 'react'

const DataSetter = ({ data }: { data: any }) => {
    const dispatch = useAppDispatch();
    dispatch(add(data));
    return (
        <></>
    )
}

export default DataSetter