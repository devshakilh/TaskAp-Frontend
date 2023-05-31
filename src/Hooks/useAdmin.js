import axios from 'axios';
import { useEffect, useState } from 'react';

const useAdmin = (email) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAdminLoading, setIsAdminLoading] = useState(true);
	useEffect(() => {
		if (email) {
			try {
				const checkAdmin = async () => {
					const response = await axios.get(
						`http://localhost:5000/users/admin/${email}`
					);
					console.log(response.data);
					setIsAdmin(response.data.isAdmin);
					setIsAdminLoading(false);
				};
				checkAdmin();
			} catch (error) {
				console.error(error);
			}
		}
	}, [email]);
	return [isAdmin, isAdminLoading];
};

export default useAdmin;
