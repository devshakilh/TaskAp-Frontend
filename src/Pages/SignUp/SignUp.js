import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
const SignUp = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('')
    const navigate = useNavigate();

    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const [error, setError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    // const [token] = useToken(createdUserEmail);
    const { emailRegister, userUpdate, loading, setLoading } =
        useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    if (register) {
        navigate('/');
    }

    // const handleSignUp = async (data) => {
    //     console.log(data);

    //     try {
    //         const response = await emailRegister(data.email, data.password);
    //         const user = response.user;
    //         console.log(user);

    //         const image = data.image[0];
    //         const formData = new FormData();
    //         formData.append('image', image);

    //         const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageBB_Key}`;
    //         const imgBBResponse = await axios.post(url, formData);
    //         console.log(imgBBResponse.data);
    //         const updatedUser = {
    //             displayName: data.userName,
    //             photoURL: imgBBResponse.data.data.url,
    //         };
    //         saveUserInTheDB(
    //             data.userName,
    //             response.user.email,
    //             imgBBResponse.data.data.url,
    //             data.role
    //         );
    //         const updateHandle = await userUpdate(updatedUser);
    //         console.log(updateHandle);
    //         toast.success('User Registered Successfully.');
    //         // navigate('/home');
    //     } catch (error) {
    //         console.error(error);
    //         setError(error.message);
    //         toast.error(error.message);
    //         setLoading(false);
    //     }
    // };


    // const saveUserInTheDB = async (name, email, image, role) => {
    //     const user = { name, email, image, role };
    //     console.log(user);
    //     try {
    //         const response = await axios.post(
    //             `https://old-is-gold-server-pi.vercel.app/users`,
    //             user
    //         );
    //         console.log('saving user:', response);
    //         if (response.data.found) {
    //             setCreatedUserEmail(response.data.email);
    //         } else {
    //             setCreatedUserEmail(email);
    //         }
    //     } catch (error) {
    //         console.error(error.name, error.message, error.stack);
    //     }
    // };
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('saveuser', data);
                navigate('/');
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {error.name && <p className='text-red-500'>{error.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            {' '}
                            <span className="label-text">Picture</span>
                        </label>
                        <input
                            type="file"
                            {...register('image', {

                            })}
                            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {error.email && <p className='text-red-500'>{error.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {error.password && <p className='text-red-500'>{error.password.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="role" className="block text-gray-600">
                            Role
                        </label>
                        <select
                            {...register('role')}
                            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none cursor-pointer"
                        >
                            <option value="buyer">Buyer</option>
                            {/* <option value="seller">Seller</option> */}
                        </select>
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                {/* <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button> */}

            </div>
        </div>
    );
};

export default SignUp;