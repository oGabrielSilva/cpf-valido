(() => {
    const article = document.querySelector('article')
    const form = article.querySelector('form')
    const result = article.querySelector('#outResult')
    let cpf = null
    
    function getCpf(evt) {
        evt.preventDefault()
        verifyCpf(form.querySelector('input').value)
    }
    
    function verifyCpf(numCpf) {
        if(numCpf.length < 11) return danger()
        if(numCpf.length > 11 && numCpf.length < 14) return danger()
        cpf = new Cpf(numCpf)
        if(cpf.num.length !== 11) return danger()
        defineResult()
    }
    
    function defineResult() {
        let num1 = 0
        let num2 = 0
        
        for(let val in cpf.work) num1 += Number(cpf.work[val]) * ((cpf.work.length + 1) - val)
        num1 = 11 - (num1 % 11)
        if(num1 > 9) num1 = 0
        cpf.work.push(num1)
        for(let val in cpf.work) num2 += Number(cpf.work[val]) * ((cpf.work.length + 1) - val)
        num2 = 11 - (num2 % 11)
        if(num2 > 9) num2 = 0
        cpf.work.push(num2)

        answer()
    }
    
    function answer() {
        const cpfTrue = `${cpf.work.join('')}`
        
        if(cpfTrue === cpf.num) {
            result.innerText = `${cpfTrue} é um CPF válido`
            result.classList.add('true')
            result.classList.remove('false')
        } else {
            result.innerText = `${cpf.num} não é um CPF válido`
            result.classList.remove('true')
            result.classList.add('false')
        }
        
    }
    
    class Cpf {
        constructor(cpf) {
            this.cpf = cpf
            this.num = cpf.replace(/\D+/g, '')
            this.work = this.num.split('').splice(0, 9)
        }
    }
    
    function danger() {
        form.querySelector('input').style.borderBottom = '2px solid red'
        form.querySelector('input').focus()
        setTimeout(() => form.querySelector('input').style.borderBottom = '2px solid var(--primary-color-dark)', 5000);
    }
    
    form.addEventListener('submit', event => getCpf(event))
    
    document.querySelector('.logo').onclick = () => window.open("https://github.com/oGabrielSilva")
})()
