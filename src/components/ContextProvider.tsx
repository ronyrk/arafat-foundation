"use client";
import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
	useRef
} from 'react';

export interface User {
	username: string;
	email: string;
	photoUrl: string;
	status: string;
	name?: string; // Optional for donor type
}

interface ContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	isUserLoading: boolean;
	isGuest: boolean;
	refetchUser: () => Promise<void>;
	clearUser: () => void;
}

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
	const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
	const [isGuest, setIsGuest] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	// Use refs to track current values without causing re-renders
	const currentUserRef = useRef<User | null>(null);
	const isLoadingRef = useRef<boolean>(false);
	const lastFetchedUsernameRef = useRef<string | null>(null);

	// Update refs when state changes
	useEffect(() => {
		currentUserRef.current = user;
	}, [user]);

	const fetchUser = useCallback(async (username: string): Promise<User | null> => {
		// Prevent multiple simultaneous requests for the same username
		if (isLoadingRef.current && lastFetchedUsernameRef.current === username) {
			return currentUserRef.current;
		}

		// If we already have the user data for this username, return it
		if (currentUserRef.current && currentUserRef.current.username === username) {
			return currentUserRef.current;
		}

		isLoadingRef.current = true;
		lastFetchedUsernameRef.current = username;

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

			const res = await fetch(`/api/${encodeURIComponent(username)}`, {
				signal: controller.signal,
				headers: {
					'Cache-Control': 'no-cache',
				},
			});

			clearTimeout(timeoutId);

			if (!res.ok) {
				if (res.status === 404) {
					throw new Error('User not found');
				}
				throw new Error(`HTTP ${res.status}: ${res.statusText}`);
			}

			const data = await res.json();

			// Validate response data
			if (!data || !data.username || !data.email) {
				throw new Error('Invalid user data received');
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				if (error.name === 'AbortError') {
					console.error('Request timeout');
				} else {
					console.error('Fetch user error:', error.message);
				}
			}
			throw error;
		} finally {
			isLoadingRef.current = false;
		}
	}, []);

	const refetchUser = useCallback(async () => {
		if (typeof window === 'undefined') return;

		const currentUsername = localStorage.getItem('username');
		if (currentUsername) {
			setIsUserLoading(true);
			try {
				const userData = await fetchUser(currentUsername);
				setUser(userData);
				setIsGuest(false);
			} catch (error) {
				setUser(null);
				setIsGuest(true);
			} finally {
				setIsUserLoading(false);
			}
		}
	}, [fetchUser]);

	const clearUser = useCallback(() => {
		setUser(null);
		setIsGuest(true);
		setIsUserLoading(false);
		currentUserRef.current = null;
		lastFetchedUsernameRef.current = null;
		if (typeof window !== 'undefined') {
			localStorage.removeItem('username');
		}
	}, []);

	// Initialize user only once on mount
	useEffect(() => {
		if (isInitialized || typeof window === 'undefined') return;

		let isMounted = true;

		const initializeUser = async () => {
			const storedUsername = localStorage.getItem('username');

			if (storedUsername) {
				try {
					const userData = await fetchUser(storedUsername);
					if (isMounted) {
						setUser(userData);
						setIsGuest(false);
					}
				} catch (error) {
					if (isMounted) {
						setUser(null);
						setIsGuest(true);
						// Optionally clear invalid username from localStorage
						localStorage.removeItem('username');
					}
				}
			} else {
				if (isMounted) {
					setIsGuest(true);
				}
			}

			if (isMounted) {
				setIsUserLoading(false);
				setIsInitialized(true);
			}
		};

		initializeUser();

		return () => {
			isMounted = false;
		};
	}, []); // Empty dependency array - only run once on mount

	// Listen for localStorage changes (e.g., login/logout in another tab)
	useEffect(() => {
		if (typeof window === 'undefined' || !isInitialized) return;

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'username') {
				const newUsername = e.newValue;
				const currentUsername = user?.username;

				// Only refetch if username actually changed
				if (newUsername !== currentUsername) {
					if (newUsername) {
						refetchUser();
					} else {
						clearUser();
					}
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, [user?.username, refetchUser, clearUser, isInitialized]);

	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(() => ({
		user,
		setUser,
		isUserLoading,
		isGuest,
		refetchUser,
		clearUser,
	}), [user, isUserLoading, isGuest, refetchUser, clearUser]);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalContext;