/**
 * Type definitions for component fixtures.
 */

export interface ComponentFixture {
  root: string;
  components: Array<{
    id: string;
    component: Record<string, unknown>;
  }>;
}
