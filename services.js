const key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eGRhY2dvbXVieHZyeGpqdWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3Mjg2NzMsImV4cCI6MjA0NjMwNDY3M30.RD-izZhI0GYmUNrOHtRrFYjh7lRBuabjDoQGgJZxPuk';
// const supabaseKey = process.env.SUPABASE_KEY;
const url='https://juxdacgomubxvrxjjuhg.supabase.co';
const database = supabase.createClient(url,key);

const Database = {
    Person: class {
        constructor(nome,cpf,email,telefone,senha) {
            this.nome = nome;
            this.cpf = cpf;
            this.email = email;
            this.telefone = telefone;
            this.senha = senha;
        }
        get data() {
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
            NOME: person.data.nome,
            CPF: person.data.cpf,
            EMAIL: person.data.email,
            TELEFONE: person.data.telefone,
            SENHA: person.data.senha
        });
        if (res) {
            alert("Pessoa adicionada com sucesso!");
        } else {
            alert("Pessoa não pode ser adicionada!")
        };
    },
    getPersonByTag: async (tag,value) => {
        let res = await database.from("TB_PESSOA").select("*").eq(tag,value);
        if (res) {
            return {
                nome: res.data[0].NOME,
                cpf: res.data[0].CPF,
                email: res.data[0].EMAIL,
                telefone: res.data[0].TELEFONE,
                senha: res.data[0].SENHA
            }
        } else {
            return false;
        }
    },
    Profissional: class {
        constructor(nome,crm,especialidade,telefone,email,senha,instagram,facebook) {
            this.nome = nome;
            this.crm = crm;
            this.especialidade = especialidade;
            this.telefone = telefone;
            this.email = email;
            this.senha = senha;
            this.instagram = instagram;
            this.facebook = facebook;
        }
        get data() {
            return {
                nome: this.nome,
                carteira: this.carteira,
                especialidade: this.especialidade,
                telefone: this.telefone,
                email: this.email,
                senha: this.senha,
                instagram: this.instagram,
                facebook: this.facebook
            }
        }
    },
    add_to_Profissional: async (person) => {
        let res = await database.from("TB_PROFISSIONAL").insert({
            NOME: person.data.nome,
            CRM: person.data.crm,
            ESPECIALIDADE: person.data.especialidade,
            TELEFONE: person.data.telefone,
            EMAIL: person.data.email,
            SENHA: person.data.senha,
            FACEBOOK: person.data.facebook,
            INSTAGRAM: person.data.instagram
        });
    },
    getProfByTag: async (tag,value) => {
        const res = await database.from("TB_PROFISSIONAL").select("*").eq(tag,value);
        if (res) {
            return {
                nome: res.data[0].NOME,
                cpf: res.data[0].CPF,
                carteira: res.data[0].N_CARTEIRA_CLINICA,
                especialidade: res.data[0].ESPECIALIDADE,
                email: res.data[0].EMAIL,
                telefone: res.data[0].TELEFONE,
                senha: res.data[0].SENHA,
                regiao: res.data[0].TB_REGIAO,
                links: res.data[0].TX_LINKS
            }
        } else {
            return false;
        }
    }
}
