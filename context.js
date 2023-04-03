const CTX = {
  port: 3333
}

CTX.set = (key, value) => {
  CTX[key] = value
}

export default CTX
