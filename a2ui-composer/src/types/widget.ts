import type { ComponentInstance } from "@a2ui/react";

export interface DataState {
  name: string;
  data: Record<string, unknown>;
}

export interface Widget {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  root: string;
  components: ComponentInstance[];
  dataStates: DataState[];
}
