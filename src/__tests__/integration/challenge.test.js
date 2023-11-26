const {
	processLoan,
	parameterValidation,
	verifyUser,
	verifyBook,
	verifyFines,
	processBookLoan,
	returnDateCalc,
	updateBookState,
	registerLoan,
} = require("../../challenge");

describe("Função principal", () => {
	it("Processo correto", () => {
		expect(processLoan("User 2", "Book 2")).toBe(
			"Empréstimo processado corretamente"
		);
	});
	it("Chamada da função principal", () => {
		const mainFunction = jest.fn(() => processLoan("User 2", "Book 2"));
		mainFunction("User 2", "Book 2");
		expect(mainFunction).toHaveBeenCalled();
		expect(mainFunction).toHaveBeenCalledTimes(1);
		expect(mainFunction).toHaveBeenCalledWith("User 2", "Book 2");
	});
});

describe("Verificações gerais", () => {
	describe("Validação de parametros", () => {
		it("Livro não informado", () => {
			expect(() => parameterValidation("User 2", "")).toThrowError(
				new Error("Necessário informar um livro")
			);
		});
		it("Usuário não informado", () => {
			expect(() => parameterValidation("", "Book 1")).toThrowError(
				new Error("Necessário informar um usuário")
			);
		});
	});
	describe("Verificação de usuário", () => {
		it("Usuário existente", () => {
			expect(verifyUser("User 2")).toBe();
		});
		it("Usuário inexistente", () => {
			expect(() => verifyUser("User 4")).toThrowError(
				new Error("Usuario não existe")
			);
		});
		it("Usuario sem multa", () => {
			expect(verifyFines("User 2")).toBe();
		});
		it("Usuário com multa", () => {
			expect(() => verifyFines("User 1")).toThrowError(
				new Error("Usuario tem multas pendentes")
			);
		});
	});
	describe("Verificação de livro", () => {
		it("Livro disponível", () => {
			expect(verifyBook("Book 1")).toBe();
		});
		it("Livro indisponível", () => {
			expect(() => verifyBook("Book 4")).toThrowError(
				new Error("Livro não está disponível")
			);
		});
	});
});

describe("Processamento de emprétimo", () => {
	it("Processo correto", () => {
		expect(processBookLoan("User 2", "Book 2")).toBe(
			"Processo de emprétimo finalizado"
		);
	});
	it("Atualização correta de estado do livro", () => {
		expect(updateBookState("Book 1", "Emprestado")).toBe(
			"O status do livro Book 1 foi atualizado para EMPRESTADO"
		);
	});
	it("Atualização incorreta de estado do livro", () => {
		expect(() => updateBookState("Book 2", "Removido")).toThrowError(
			new Error("O estado informado não é válido")
		);
	});
	it("Data de devolução", () => {
		global.Date.now = jest.fn(() => new Date().getTime());
		const loanDate = new Date("11/26/2023");
		expect(returnDateCalc(loanDate)).toBe("Data de devolução: 3/12/2023");
	});
	it("Registro correto de empréstimo do livro", () => {
		const returnDate = returnDateCalc(new Date());
		console.log(returnDate);
		expect(registerLoan("User 2", "Book 1", returnDate)).toEqual({
			user: "User 2",
			returnDate: returnDate,
			book: "Book 1",
		});
	});
});
