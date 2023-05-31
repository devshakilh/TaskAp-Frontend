import axios from 'axios';
import { useEffect, useState } from 'react';

const useClient = (email) => {
	const [isClient, setIsClient] = useState(false);
	const [isClientLoading, setIsClientLoading] = useState(true);
	useEffect(() => {
		if (email) {
			try {
				const checkClient = async () => {
					const response = await axios.get(
						`http://localhost:5000/users/Client/${email}`
					);
					console.log(response.data);
					setIsClient(response.data.isClient);
					setIsClientLoading(false);
				};
				checkClient();
			} catch (error) {
				console.error(error);
			}
		}
	}, [email]);
	return [isClient, isClientLoading];
};

export default useClient;
