import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';


const AllSeller = () => {
	const { user } = useContext(AuthContext);
	const {
		data: allSeller,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['allSeller'],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/users/allSeller?email=${user?.email}`,
					{

					}
				);
				return response.data;
			} catch (error) {
				if (
					error.response.status === 401 ||
					error.response.status === 403
				) {
					toast.error('Unauthorized Access');
					// logOut().catch((err) => console.error(err));
				}
			}
		},
	});

	const handleDelete = async (id) => {
		console.log('Deleted', id);
		try {
			const deleteProduct = await axios.delete(
				`/users/${id}?email=${user?.email}`,
				{

				}
			);
			console.log(deleteProduct.data);
			toast.success('User Deleted Successfully.');
			refetch();
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.status === 403
			) {
				toast.error('Unauthorized Access');
				// logOut().catch((err) => console.error(err));
			}
			toast.error('Something Went wrong. Failed to Delete.');
		}
	};
	const handleVerify = async (seller) => {
		const { sellerEmail, _id } = seller;
		try {
			const verifyResponse = await axios.patch(
				`http://localhost:5000/users/verify/${_id}?email=${user?.email}`,
				{ sellerEmail: sellerEmail },
				{


				}
			);
			console.log(verifyResponse.data);
			toast.success('User verified Successfully.');
			refetch();
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.status === 403
			) {
				toast.error('Unauthorized Access');
				// logOut().catch((err) => console.error(err));
			}
			toast.error('Something Went wrong. Failed to Verify.');
		}
	};

	return (
		<div className="mt-8 bg-gray-100 pt-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				All Seller
			</h1>
			{isError ? (
				<p className="text-2xl font-medium text-red-600">
					Sorry..!!! Something went wrong.
					<span className="italic underline">{error}</span>
				</p>
			) : isLoading ? (
				<Loading />
			) : allSeller.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>email</th>
								<th>Picture</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{allSeller.map((seller, index) => (
								<tr key={seller._id}>
									<th>{index + 1}</th>
									<td>{seller.name}</td>
									<td>{seller.email}</td>
									<td>
										<img
											src={seller.image}
											alt=""
											className="h-10 w-10 rounded-full"
										/>
									</td>
									<td>
										{seller?.verified ? (
											'Verified'
										) : (
											<button
												className="px-2 py-1 rounded-md text-white font-medium bg-blue-500"
												onClick={() =>
													handleVerify(seller)
												}
											>
												Verify
											</button>
										)}
										<button
											className="px-2 py-1 rounded-md text-white font-medium bg-red-500 ml-4"
											onClick={() =>
												handleDelete(seller._id)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className="text-center font-medium text-blue-500 italic text-2xl mt-8">
					Sorry No Seller to show.
				</p>
			)}
		</div>
	);
};

export default AllSeller;
