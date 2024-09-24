/**
 * Waits a specified amount of time, then resolves.
 * @param {number} ms Time, in milliseconds, to wait.
 * @returns 
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}