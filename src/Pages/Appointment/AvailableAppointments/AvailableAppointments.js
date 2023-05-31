// import { useQuery } from '@tanstack/react-query';
// import { format } from 'date-fns';
// import React, { useState } from 'react';

// import Loading from '../../Shared/Loading/Loading';
// import BookingModal from '../BookingModal/BookingModal';
// import AppointmentOption from './AppointmentOption';

// const AvailableAppointments = ({ selectedDate }) => {
//     const [treatment, setTreatment] = useState(null);
//     // const [appointmentOptions, setAppointmentOptions] = useState([]);
//     const date = format(selectedDate, 'PP');

//     // console.log(appointmentOptions);
//     const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
//         queryKey: ['appointmentOptions', date],
//         queryFn: async () => {
//             const res = await fetch(`http://doctors-portal-server-rust.vercel.app/v2/appointmentOptions?date=${date}`);
//             const data = await res.json();
//             return data
//         }
//     });

//     if (isLoading) {
//         return <Loading></Loading>
//     }

//     return (
//         <section className='my-16'>
//             <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
//             <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
//                 {
//                     appointmentOptions.map(option => <AppointmentOption
//                         key={option._id}
//                         appointmentOption={option}
//                         setTreatment={setTreatment}
//                     ></AppointmentOption>)
//                 }
//             </div>
//             {
//                 treatment &&
//                 <BookingModal
//                     selectedDate={selectedDate}
//                     treatment={treatment}
//                     setTreatment={setTreatment}
//                     refetch={refetch}
//                 ></BookingModal>
//             }
//         </section>
//     );
// };

// export default AvailableAppointments;

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');
    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/v2/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }


    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    // ;

    // useEffect(() => {
    //     fetch('http://localhost:5000/v2/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])


    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;