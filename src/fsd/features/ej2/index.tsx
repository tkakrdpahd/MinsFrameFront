"use client";
import { useState } from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import "@syncfusion/ej2-react-calendars/styles/material.css";

export default function Ej2() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const onchange = (args: ChangedEventArgs): void => {
        /*Displays selected date in the label*/
        setSelectedValue(args.value?.toLocaleDateString() || null);
    }
  
    return (
        <div className='w-full h-full'>
            <div className='flex justify-center text-lg font-bold m-4'>Ej2 Calendar Test</div>
            <div className='w-full h-full'>
                <div className='w-full h-full' style={{ overflow: 'auto' }}>
                    <CalendarComponent change={onchange} ></CalendarComponent>
                    <label id="date_label">Selected Value: {selectedValue} </label>
                </div>
            </div>
        </div>
    )
}