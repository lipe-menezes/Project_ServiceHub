import { createClient } from '@supabase/supabase-js'

const key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eGRhY2dvbXVieHZyeGpqdWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3Mjg2NzMsImV4cCI6MjA0NjMwNDY3M30.RD-izZhI0GYmUNrOHtRrFYjh7lRBuabjDoQGgJZxPuk;
const url='https://juxdacgomubxvrxjjuhg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const database = createClient(url,key);

export const database_services = {
    Person: {
        constructor(nome,cpf,email,telefone,senha) {
            this.nome = nome;
            this.cpf = cpf;
            this.email = email;
            this.telefone = telefone;
            this.senha = senha;
        },
        get getData() {
            return {
                nome:this.nome,
                cpf: this.cpf,
                email: this.email,
                telefone: this.telefone,
                senha: this.senha
            }
        }
    },
    add_to_Pessoa: async (person) => {
        let res = await database.from("TB_PESSOA").insert({
            NOME: person.getData().nome,
            CPF: person.getData().cpf,
            EMAIL: person.getData().email,
            TELEFONE: person.getData().telefone,
            SENHA: person.getData().senha
        });
        if (res) {
            alert("Pessoa adicionada com sucesso!");
        } else {
            alert("Pessoa não pode ser adicionada!")
        };
    },
    Profissional: {
        constructor(carteira,especialidade,email,senha,region,links) {
            this.carteira = carteira;
            this.especialidade = especialidade;
            this.email = email;
            this.senha = senha;
            this.region = region;
            this.links = links;
        },
        get getData() {
            return {
                carteira: this.carteira,
                especialidade: this.especialidade,
                email: this.email,
                senha: this.senha,
                region: this.region,
                links: this.links
            }
        }
    },
    add_to_Profissional: async (person) => {
        let res = await database.from("TB_PROFISSIONAL").insert({
            N_CARTEIRA_CLINICA: person.getData().carteira,
            ESPECIALIDADE: person.getData().especialidade,
            EMAIL: person.getData().email,
            TELEFONE: person.getData().telefone,
            SENHA: person.getData().senha,
            TB_REGIAO: person.getData().region,
            TX_LINKS: person.getData().links
        });
    }
}