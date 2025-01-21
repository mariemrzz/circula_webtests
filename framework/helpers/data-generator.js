export let generateUserEmail = () => `qa-user.${rand()}@testmail.com`

export let generatePassword = () => `Password${rand()}`

export let generateCompany = () => `QA company - ${rand()}`

function rand(max = 1_000_000) {
    return Math.floor(Math.random() * max)
}
