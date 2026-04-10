import { create } from "zustand";

type SelectionType = "template" | "group" | "slot" | "assignment" | null;

type DraggedEntity = {
  id: string;
  type: "person" | "group" | "slot";
  label: string;
} | null;

type EditorSlotDraft = {
  id: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  type: "person" | "group" | "mixed";
};

type EditorStore = {
  selectedItemId: string | null;
  selectedItemType: SelectionType;
  hoveredSlotId: string | null;
  draggedEntity: DraggedEntity;
  zoom: number;
  dirty: boolean;
  showGrid: boolean;
  snapEnabled: boolean;
  localSlotsDraft: EditorSlotDraft[];
  setSelection: (id: string | null, type: SelectionType) => void;
  setHoveredSlot: (id: string | null) => void;
  setDraggedEntity: (entity: DraggedEntity) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  setSlotsDraft: (slots: EditorSlotDraft[]) => void;
  markDirty: (dirty?: boolean) => void;
  reset: () => void;
};

const initialState = {
  selectedItemId: null,
  selectedItemType: null as SelectionType,
  hoveredSlotId: null,
  draggedEntity: null,
  zoom: 1,
  dirty: false,
  showGrid: true,
  snapEnabled: true,
  localSlotsDraft: [] as EditorSlotDraft[],
};

export const useEditorStore = create<EditorStore>((set) => ({
  ...initialState,
  setSelection: (id, type) => set({ selectedItemId: id, selectedItemType: type }),
  setHoveredSlot: (id) => set({ hoveredSlotId: id }),
  setDraggedEntity: (entity) => set({ draggedEntity: entity }),
  setZoom: (zoom) => set({ zoom }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleSnap: () => set((state) => ({ snapEnabled: !state.snapEnabled })),
  setSlotsDraft: (slots) => set({ localSlotsDraft: slots }),
  markDirty: (dirty = true) => set({ dirty }),
  reset: () => set(initialState),
}));
