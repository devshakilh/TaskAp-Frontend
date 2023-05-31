import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';

import useBuyer from '../../Hooks/useBuyer';
import Loading from '../../Pages/Shared/Loading/Loading';

const BuyerRoute = ({ children }) => {
	const { user, loading, logout } = useContext(AuthContext);
	const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
	const location = useLocation();

	if (loading || isBuyerLoading) {
		return <Loading />;
	}

	if (user && isBuyer) {
		return children;
	}

	if (!user) {
		return (
			<Navigate to="/login" state={{ from: location }} replace></Navigate>
		);
	}

	return logout()
		.then(() => {
			return (
				<Navigate
					to="/login"
					state={{ from: location }}
					replace
				></Navigate>
			);
		})
		.catch((error) => console.error(error));
};

export default BuyerRoute;
