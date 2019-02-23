export const delay = (
  ms: number,
) => (
  val: any,
) => new Promise(
  resolve => setTimeout(() => resolve(val), ms)
)
