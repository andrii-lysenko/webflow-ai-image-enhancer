import { AIImage } from "../../../types/types";

export interface Agent {
  respond(query: string, images?: AIImage[]): Promise<any>;
}
