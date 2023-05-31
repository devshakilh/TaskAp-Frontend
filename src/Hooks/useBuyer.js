import axios from 'axios';
import { useEffect, useState } from 'react';

const useBuyer = (email) => {
	const [isBuyer, setIsBuyer] = useState(false);
	const [isBuyerLoading, setIsBuyerLoading] = useState(true);
	useEffect(() => {
		if (email) {
			try {
				const checkBuyer = async () => {
					const response = await axios.get(
						`http://localhost:5000/users/buyer/${email}`
					);
					console.log(response.data);
					setIsBuyer(response.data.isBuyer);
					setIsBuyerLoading(false);
				};
				checkBuyer();
			} catch (error) {
				console.error(error);
			}
		}
	}, [email]);
	return [isBuyer, isBuyerLoading];
};

export default useBuyer;
