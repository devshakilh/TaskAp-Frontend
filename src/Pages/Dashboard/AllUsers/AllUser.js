import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
// REACT_APP_apiKey=AIzaSyBZ0LvLD0ZbgICyOLXdlysRapyKInWl1cY
// REACT_APP_authDomain=doctors-portal-6fe98.firebaseapp.com
// REACT_APP_projectId=doctors-portal-6fe98
// REACT_APP_storageBucket=doctors-portal-6fe98.appspot.com
// REACT_APP_messagingSenderId=716877172956
// REACT_APP_appId=1:716877172956:web:b32038c93510ada3d92419

// REACT_APP_apiKey=AIzaSyCMnqIjhkGo6oAqKzNEiBj3EJzwoCD8wdk
// REACT_APP_authDomain=doctors-portal-de9c0.firebaseapp.com
// REACT_APP_projectId=doctors-portal-de9c0
// REACT_APP_storageBucket=doctors-portal-de9c0.appspot.com
// REACT_APP_messagingSenderId=780040200720
// REACT_APP_appId=1:780040200720:web:f563e9251670b05e5fa095
const AllUser = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful.')
                    refetch();
                }
            })
    }
    return (
        <div>
            <h1 className='text-3xl font-semibold mb-16' >All Users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            users?.map((user, i) => <tr key={user._id} >

                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td><button className='btn btn-xs btn-primary'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;