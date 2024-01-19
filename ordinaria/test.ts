import { getTime } from "./services/getTime.ts"

const response = await getTime("Madrid")
console.log(response)
