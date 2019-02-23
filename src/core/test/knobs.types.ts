export interface KnobsInterface {
  text: (name: string, val: string) => string,
  number: (name: string, val: number) => number,
  boolean: (name: string, val: boolean) => boolean,
  object: (name: string, val: any) => any,
}
