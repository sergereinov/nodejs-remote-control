/**
 * Action interface
 * @param args are array of arguments strings
 * @returns Promise with answer string or null 
 */
export type Action = (args: string[]) => Promise<string | null>;
