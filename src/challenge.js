// Sistema de gerenciamento de biblioteca

const users = ["User 1", "User 2"];
const booksAvailable = ["Book 1", "Book 2"];
const usersWithFines = ["User 1"];

function Registration(user, book, returnDate) {
	this.user = user;
	this.book = book;
	this.returnDate = returnDate;
}

const processLoan = (user, book) => {
	try {
		parameterValidation(user, book);
		verifications(user, book);
		processBookLoan(user, book);
	} catch (error) {}

	return "Empréstimo processado corretamente";
};

const parameterValidation = (user, book) => {
	if (!user) throw new Error("Necessário informar um usuário");
	if (!book) throw new Error("Necessário informar um livro");
};

const verifications = (user, book) => {
	verifyUser(user);
	verifyFines(user);
	verifyBook(book);
};

const verifyUser = (user) => {
	if (!users.includes(user)) throw new Error("Usuario não existe");
};

const verifyFines = (user) => {
	if (usersWithFines.includes(user))
		throw new Error("Usuario tem multas pendentes");
};

const verifyBook = (book) => {
	if (!booksAvailable.includes(book))
		throw new Error("Livro não está disponível");
};

const processBookLoan = (user, book) => {
	const returnDate = returnDateCalc(new Date());
	updateBookState(book, "Emprestado");
	registerLoan(user, book, returnDate);

	return "Processo de emprétimo finalizado";
};

const returnDateCalc = (date) => {
	date.setDate(date.getDate() + 7);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `Data de devolução: ${day}/${month}/${year}`;
};

const updateBookState = (book, state) => {
	if (state !== "Emprestado") {
		throw new Error("O estado informado não é válido");
	}

	booksAvailable.splice(booksAvailable.indexOf(book), 1);
	return `O status do livro ${book} foi atualizado para EMPRESTADO`;
};

const registerLoan = (user, book, returnDate) => {
	const loanRegistration = new Registration(user, book, returnDate);
	return loanRegistration;
};

module.exports = {
	processLoan,
	parameterValidation,
	verifyUser,
	verifyBook,
	verifyFines,
	processBookLoan,
	returnDateCalc,
	updateBookState,
	registerLoan,
};

console.log(processLoan("User 2", "Book 2"));
