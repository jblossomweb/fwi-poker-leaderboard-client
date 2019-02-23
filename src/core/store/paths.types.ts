export type Path = string[]
export type GetPath = (
  ...args: any[]
) => Path

export interface Paths {
  [key: string]: GetPath,
}
