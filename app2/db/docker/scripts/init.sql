create database psp;

\c psp

CREATE TABLE PSP_TRANSACTION (
	id serial not null, 
	vl_tran decimal(20,2) not null, 
	ds_tran varchar(100)  not null,
	pay_method char(1) not null, 
	card_number varchar(20)  not null,
	card_bearer varchar(100) not null,
	card_valid_thru date not null,
	card_CVV varchar(3)  not null,
	cod_PDV  varchar(30) not null
);


ALTER TABLE PSP_TRANSACTION ADD CONSTRAINT PK_PSP_TRANSACTION PRIMARY KEY (id);

-- Comentarios da tabela 
COMMENT ON TABLE PSP_TRANSACTION IS 'Tabela de transacoes';

COMMENT ON COLUMN PSP_TRANSACTION.id IS 'identificador da transacao';
COMMENT ON COLUMN PSP_TRANSACTION.vl_tran IS 'valor da transacao';
COMMENT ON COLUMN PSP_TRANSACTION.ds_tran IS 'descricao da transacao.';
COMMENT ON COLUMN PSP_TRANSACTION.pay_method IS 'metodo de pagamento (Dominio: D = debit_card ou C = credit_card)';
COMMENT ON COLUMN PSP_TRANSACTION.card_number IS 'numero do cartao';
COMMENT ON COLUMN PSP_TRANSACTION.card_bearer IS 'nome do portador do cartao';
COMMENT ON COLUMN PSP_TRANSACTION.card_valid_thru IS 'data de validade do cartão';
COMMENT ON COLUMN PSP_TRANSACTION.card_CVV IS 'codigo de verificacao do cartao (CVV)';
COMMENT ON COLUMN PSP_TRANSACTION.cod_PDV IS 'codigo da maquina que passou o cartao / PDV associado ao cliente pagar.me';


-- tabela dos pagamentos 
CREATE TABLE PSP_PAYABLE (

	id serial not null, 
	id_psp_transcation Integer not null,
	cod_PDV  varchar(30) not null,
	pay_method char(1) not null, 
	vl_payment decimal(20,2) not null,
	payment_date date not null,	
	status char(1) not null,
	vl_tran_fee decimal

);

ALTER TABLE PSP_PAYABLE ADD CONSTRAINT PK_PSP_PAYABLE PRIMARY KEY (id);

ALTER TABLE PSP_PAYABLE 
ADD CONSTRAINT FK_PSP_PAYABLE_TRANSACTION FOREIGN KEY (id_psp_transcation) REFERENCES PSP_TRANSACTION (id);



-- Comentarios da tabela 
COMMENT ON TABLE PSP_PAYABLE IS 'Tabela de pagamentos';

COMMENT ON COLUMN PSP_PAYABLE.id IS 'identificador do pagamento';
COMMENT ON COLUMN PSP_PAYABLE.id_psp_transcation IS 'identificador da transacao origem do pagamento (FK)';
COMMENT ON COLUMN PSP_PAYABLE.cod_PDV IS 'codigo da maquina que passou o cartao / PDV associado ao cliente pagar.me';
COMMENT ON COLUMN PSP_PAYABLE.pay_method IS 'metodo de pagamento (Dominio: D = debit_card ou C = credit_card)';
COMMENT ON COLUMN PSP_PAYABLE.vl_payment IS 'Valor do pagamento.';
COMMENT ON COLUMN PSP_PAYABLE.payment_date IS 'data do pagamento.';
COMMENT ON COLUMN PSP_PAYABLE.status IS 'Status do pagamento. Dominio: P = PAID, W = WAITING_FUNDS';
COMMENT ON COLUMN PSP_PAYABLE.vl_tran_fee IS 'Taxa cobrada sobre o valor da transacao.';


CREATE DATABASE psp_test 
WITH TEMPLATE psp;

