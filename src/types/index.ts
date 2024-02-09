export interface DonorIProps {
	email: string,
	password: string,
	name: string,
	username: string,
	phone: string,
	about: string,
	photos: string,
};

export interface BranchIProps {
	username: string,
	email: string,
	password: string,
	village: string,
	postOffice: string,
	policeStation: string,
	mosjid: string,
	name: string,
	psFatherName: string,
	address: string,
	psName: string,
	psPhone: string,
	district: string,
};
export interface UserNameIProps {
	username: string,
};
export interface ParamsIProps {
	params: UserNameIProps,
};

export interface IdProps {
	id: string,
};
export interface ParamsIdIProps {
	params: IdProps
};

export interface LoginIProps {
	email: string,
	password: string,
};

export interface LoanIProps {
	username: string,
	village: string,
	post: string,
	policeStation: string,
	district: string,
	branch: string,
	name: string,
	fatherName: string,
	motherName: string,
	occupation: string,
	phone: string,
	amount: string,
	status: string,
	photosUrl: string
};

export interface PaymentIProps {
	loanusername: string,
	phone: string,
	amount: string,
	transactionId: string
};
