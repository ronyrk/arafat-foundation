export interface DonorIProps {
	id?: string,
	username: string,
	email: string,
	code: string,
	password: string,
	name: string,
	photoUrl: string,
	about: string,
	amount: string,
	lives: string,
	hometown: string
	status: string
};

export interface BranchIProps {
	id?: string,
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
	photoUrl: string
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
	id?: string,
	username: string,
	name: string,
	code: string,
	branch: string,
	address: string,
	about?: string,
	disbursed: string,
	recovered: string,
	balance: string,
	form1: string,
	form2: string,
	nidfont: string,
	nidback: string,
	occupation: string,
	phone: string,
	photosUrl: string,
	status: string,
};

export interface PaymentIProps {
	loanusername: string,
	phone: string,
	amount: string,
	transactionId: string
};
