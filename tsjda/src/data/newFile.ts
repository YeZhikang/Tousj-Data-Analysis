type C = { a: string, b?: number }
function f({ a, b }: C): string {
  return a+b.toString()
}
