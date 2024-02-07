"use client";
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

export interface User {
	id: string,
	name: string,
	email: string,
	photoUrl: string,
	status: string,
};

interface ContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	isUserLoading: Boolean;
};

const GlobalContext = createContext<ContextType | undefined>(undefined);

export const useUser = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export function ContextProvider({ children }: { children: ReactNode }) {

	const [user, setUser] = useState<User | null>(null);
	const [isUserLoading, setIsLoading] = useState<Boolean>(true);
	const [Guest, setGust] = useState(false);

	// User Call all Time 
	// useEffect(() => {
	// 	const id = localStorage.getItem('id');
	// 	if (id) {
	// 		const getUser = async (id: string) => {
	// 			try {
	// 				const res = await fetch(`/api/users/${id}`);
	// 				const data = await res.json();
	// 				setUser(data);
	// 				setIsLoading(false);
	// 			} catch (error) {
	// 				setIsLoading(false);
	// 			}

	// 		};
	// 		getUser(id);
	// 	} else {
	// 		setGust(true);
	// 		// console.log("Guest Users");
	// 	}
	// }, []);


	return <GlobalContext.Provider value={{ user, setUser, isUserLoading }} >{children}</GlobalContext.Provider>
};

export default GlobalContext;
