'use client'
import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {changePageType} from '@/store/pageTypeSlice'
function SubShell({children, title='', type=''}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changePageType({ type: type, title: title }));
      }, []);
    return (
        <>
        {children}
        </>
    )
}

export default SubShell
